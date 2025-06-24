# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Khatma, KhatmaParticipant, ReadingSession,
    Achievement, Notification
)

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    """User registration serializer"""
    password = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = User
        fields = [
            'fullname', 'email', 
            'password', 'gender',
            'phone'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }
        
    def create(self, validated_data):
        """Create user with encrypted password"""        
        # Create user
        user = User.objects.create_user(
            username=validated_data['email'],  # Use email as username
            email=validated_data['email'],
            password=validated_data['password'],
            fullname=validated_data.get('fullname', ''),
            gender=validated_data.get('gender', ''),
            phone=validated_data.get('phone', '')
        )   
        return user


class UserSerializer(serializers.ModelSerializer):
    """User serializer for profiles"""
    fullname = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id', 'fullname', 'email', 'gender', 'phone',
            'profile_picture', 'bio', 'total_khatmas_completed', 'current_streak',
            'date_joined'
        ]
        read_only_fields = ['id', 'date_joined', 'total_khatmas_completed']

    def get_fullname(self, obj):
        return obj.fullname


class UserBasicSerializer(serializers.ModelSerializer):
    """Basic user info for nested serialization"""
    class Meta:
        model = User
        fields = ['id', 'fullname', 'email', 'profile_picture']
        read_only_fields = fields

class KhatmaParticipantSerializer(serializers.ModelSerializer):
    """Khatma participant serializer"""
    user = UserBasicSerializer(read_only=True)
    is_chapter_completed = serializers.ReadOnlyField()
    
    class Meta:
        model = KhatmaParticipant
        fields = [
            'id', 'user', 'joined_at', 'is_active',
            'chapter_assigned', 'is_chapter_completed'
        ]

class ReadingSessionSerializer(serializers.ModelSerializer):
    """Reading session serializer"""
    user = UserBasicSerializer(read_only=True)
    
    class Meta:
        model = ReadingSession
        fields = [
            'id', 'user', 'chapter_assigned', 'is_completed', 'reading_date', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def validate_chapter_assigned(self, value):
        if not (1 <= value <= 30):
            raise serializers.ValidationError("Invalid chapter number. Must be between 1 and 30.")
        return value

    def validate(self, data):
        """Validate that user is assigned this chapter in group khatmas"""
        request = self.context.get('request')
        khatma = self.context.get('khatma')  # Will be set in view
        
        if khatma and khatma.khatma_type == 'group' and request:
            user_participant = KhatmaParticipant.objects.filter(
                khatma=khatma,
                user=request.user,
                chapter_assigned=data['chapter_assigned']
            ).first()
            
            if not user_participant:
                raise serializers.ValidationError(
                    f"You are not assigned to chapter {data['chapter_assigned']} in this group khatma."
                )
        
        return data

class KhatmaListSerializer(serializers.ModelSerializer):
    """Khatma list serializer (for listing khatmas)"""
    creator = UserBasicSerializer(read_only=True)
    participants_count = serializers.SerializerMethodField()
    completion_percentage = serializers.ReadOnlyField()
    days_remaining = serializers.ReadOnlyField()
    
    class Meta:
        model = Khatma
        fields = [
            'id', 'name', 'description', 'khatma_type', 'status',
            'creator', 'participants_count', 'target_days', 'start_date',
            'completion_percentage', 'days_remaining', 'is_public', 'created_at'
        ]

    def get_participants_count(self, obj):
        return obj.participants.count()

class KhatmaDetailSerializer(serializers.ModelSerializer):
    """Detailed Khatma serializer"""
    creator = UserBasicSerializer(read_only=True)
    participants = KhatmaParticipantSerializer(source='khatmaparticipant_set', many=True, read_only=True)
    recent_sessions = serializers.SerializerMethodField()
    completion_percentage = serializers.ReadOnlyField()
    days_remaining = serializers.ReadOnlyField()
    is_participant = serializers.SerializerMethodField()
    can_join = serializers.SerializerMethodField()
    available_chapters = serializers.SerializerMethodField()
    
    class Meta:
        model = Khatma
        fields = [
            'id', 'name', 'description', 'khatma_type', 'status',
            'creator', 'participants', 'target_days', 'start_date', 'end_date',
            'completion_percentage', 'days_remaining', 'is_public',
            'recent_sessions', 'is_participant', 'can_join', 'available_chapters',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'creator', 'created_at', 'updated_at']

    def get_recent_sessions(self, obj):
        recent_sessions = obj.reading_sessions.all()[:10]
        return ReadingSessionSerializer(recent_sessions, many=True).data

    def get_is_participant(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.participants.filter(id=request.user.id).exists()
        return False

    def get_can_join(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        
        if obj.status != 'active':
            return False
        
        if obj.participants.filter(id=request.user.id).exists():
            return False
        
        # For group khatmas, check if there are available chapters
        if obj.khatma_type == 'group':
            assigned_chapters = obj.khatmaparticipant_set.values_list('chapter_assigned', flat=True)
            available_chapters = [i for i in range(1, 31) if i not in assigned_chapters]
            return len(available_chapters) > 0
            
        return True

    def get_available_chapters(self, obj):
        """Get list of available chapters for group khatmas"""
        if obj.khatma_type == 'group':
            assigned_chapters = obj.khatmaparticipant_set.values_list('chapter_assigned', flat=True)
            return [i for i in range(1, 31) if i not in assigned_chapters]
        return list(range(1, 31))  # All chapters available for private khatmas

class KhatmaCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating/updating Khatmas"""
    class Meta:
        model = Khatma
        fields = [
            'name', 'description', 'khatma_type', 'target_days', 'is_public'
        ]

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return super().create(validated_data)

class AchievementSerializer(serializers.ModelSerializer):
    """Achievement serializer"""
    user = UserBasicSerializer(read_only=True)
    khatma_name = serializers.CharField(source='khatma.name', read_only=True)
    achievement_display = serializers.CharField(source='get_achievement_type_display', read_only=True)
    
    class Meta:
        model = Achievement
        fields = [
            'id', 'user', 'achievement_type', 'achievement_display',
            'earned_at', 'khatma', 'khatma_name'
        ]
        read_only_fields = fields

class NotificationSerializer(serializers.ModelSerializer):
    """Notification serializer"""
    related_khatma_name = serializers.CharField(source='related_khatma.name', read_only=True)
    notification_display = serializers.CharField(source='get_notification_type_display', read_only=True)
    
    class Meta:
        model = Notification
        fields = [
            'id', 'notification_type', 'notification_display', 'title', 'message',
            'is_read', 'related_khatma', 'related_khatma_name', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

# Statistics Serializers
class UserStatsSerializer(serializers.Serializer):
    """User statistics serializer"""
    total_khatmas = serializers.IntegerField()
    completed_khatmas = serializers.IntegerField()
    total_chapters_read = serializers.IntegerField()
    current_streak = serializers.IntegerField()
    total_reading_time = serializers.IntegerField()  # in minutes
    achievements_count = serializers.IntegerField()
    average_daily_chapters = serializers.FloatField()
    completion_rate = serializers.FloatField()  # percentage of started khatmas completed

class KhatmaStatsSerializer(serializers.Serializer):
    """Khatma statistics serializer"""
    total_participants = serializers.IntegerField()
    total_chapters_read = serializers.IntegerField()
    completion_percentage = serializers.FloatField()
    average_daily_progress = serializers.FloatField()
    most_active_reader = UserBasicSerializer()
    daily_progress = serializers.ListField(
        child=serializers.DictField()
    )  # List of {date, chapters_read, participants_active}
    chapter_completion_status = serializers.ListField(
        child=serializers.DictField()
    )  # List of {chapter, is_completed, assigned_user}