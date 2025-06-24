# views.py
from rest_framework import generics, permissions, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q, Sum, Count, Avg
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import get_user_model

from .models import (
    Khatma, KhatmaParticipant, ReadingSession,
    Achievement, Notification
)
from .serializers import (
    KhatmaListSerializer, KhatmaDetailSerializer, KhatmaCreateUpdateSerializer,
    ReadingSessionSerializer,
    UserSerializer, UserRegistrationSerializer, AchievementSerializer, NotificationSerializer,
    UserStatsSerializer, KhatmaStatsSerializer
)

User = get_user_model()

class CreateUserView(generics.CreateAPIView):
    """Create a new user account"""
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

# Khatma Views
class KhatmaListCreateView(generics.ListCreateAPIView):
    """List all khatmas or create a new one"""
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['khatma_type', 'status', 'is_public']
    search_fields = ['name', 'description']
    ordering_fields = ['created_at', 'start_date', 'name']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Khatma.objects.select_related('creator').prefetch_related('participants')
        
        # Filter based on query parameters
        filter_type = self.request.query_params.get('filter', 'all')
        
        if filter_type == 'my_khatmas':
            queryset = queryset.filter(
                Q(creator=self.request.user) | Q(participants=self.request.user)
            ).distinct()
        elif filter_type == 'public':
            queryset = queryset.filter(is_public=True)
        elif filter_type == 'joinable':
            queryset = queryset.filter(
                is_public=True,
                status='active'
            ).exclude(participants=self.request.user)
        
        return queryset

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return KhatmaCreateUpdateSerializer
        return KhatmaListSerializer

class KhatmaDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a khatma"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Khatma.objects.select_related('creator').prefetch_related(
            'participants', 'reading_sessions__user'
        )

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return KhatmaCreateUpdateSerializer
        return KhatmaDetailSerializer

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), pk=self.kwargs['pk'])
        
        # Check permissions
        if not obj.is_public and obj.creator != self.request.user:
            if not obj.participants.filter(id=self.request.user.id).exists():
                raise PermissionDenied("You don't have permission to view this khatma")
        
        return obj

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def join_khatma(request, khatma_id):
    """Join a khatma"""
    khatma = get_object_or_404(Khatma, id=khatma_id)
    
    # Check if user can join
    if khatma.status != 'active':
        return Response({'error': 'Khatma is not active'}, status=status.HTTP_400_BAD_REQUEST)
    
    if khatma.participants.filter(id=request.user.id).exists():
        return Response({'error': 'Already a participant'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Calculate chapter assignment for group khatmas
    if khatma.khatma_type == 'group':
        total_chapters = 30  # Quran has 30 chapters (Juz/Para)
        
        # Get already assigned chapters
        assigned_chapters = KhatmaParticipant.objects.filter(khatma=khatma).values_list('chapter_assigned', flat=True)
        
        # Find first unassigned chapter
        chapter_assigned = None
        for chapter in range(1, total_chapters + 1):
            if chapter not in assigned_chapters:
                chapter_assigned = chapter
                break
        
        if chapter_assigned is None:
            return Response({'error': 'All chapters are already assigned'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # For private khatmas, user can read any chapter (assign chapter 1 as default)
        chapter_assigned = 1
    
    # Create participant
    KhatmaParticipant.objects.create(
        khatma=khatma,
        user=request.user,
        chapter_assigned=chapter_assigned
    )
    
    return Response({
        'message': 'Successfully joined khatma',
        'chapter_assigned': chapter_assigned
    }, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def leave_khatma(request, khatma_id):
    """Leave a khatma"""
    khatma = get_object_or_404(Khatma, id=khatma_id)
    participant = get_object_or_404(KhatmaParticipant, khatma=khatma, user=request.user)
    participant.delete()
    
    return Response({'message': 'Successfully left khatma'}, status=status.HTTP_200_OK)

# Reading Session Views
class ReadingSessionListCreateView(generics.ListCreateAPIView):
    """List reading sessions or create a new one"""
    serializer_class = ReadingSessionSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        khatma_id = self.kwargs.get('khatma_id')
        queryset = ReadingSession.objects.select_related('user')
        
        if khatma_id:
            queryset = queryset.filter(khatma_id=khatma_id)
        
        # Filter by user if requested
        user_filter = self.request.query_params.get('user')
        if user_filter == 'me':
            queryset = queryset.filter(user=self.request.user)
        
        return queryset.order_by('-reading_date')

    def perform_create(self, serializer):
        khatma_id = self.kwargs.get('khatma_id')
        khatma = get_object_or_404(Khatma, id=khatma_id)
        
        # Check if user is participant
        if not khatma.participants.filter(id=self.request.user.id).exists():
            raise PermissionDenied("You must be a participant to add reading sessions")
        
        # Pass khatma to serializer context for validation
        serializer.context['khatma'] = khatma
        serializer.save(khatma=khatma)

# User Stats Views
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_stats(request, user_id=None):
    """Get user statistics"""
    if user_id:
        user = get_object_or_404(User, id=user_id)
    else:
        user = request.user
    
    # Calculate stats
    total_khatmas = user.joined_khatmas.count()
    completed_khatmas = user.joined_khatmas.filter(status='completed').count()
    
    # Count completed chapters
    total_chapters_read = ReadingSession.objects.filter(
        user=user, 
        is_completed=True
    ).count()
    
    # Calculate average daily chapters (last 30 days)
    thirty_days_ago = timezone.now() - timezone.timedelta(days=30)
    recent_chapters = ReadingSession.objects.filter(
        user=user,
        reading_date__gte=thirty_days_ago,
        is_completed=True
    ).count()
    average_daily_chapters = recent_chapters / 30
    
    achievements_count = user.achievements.count()
    

    total_participants = KhatmaParticipant.objects.filter(khatma__creator=user).count()

    stats_data = {
        'total_khatmas': total_khatmas,
        'completed_khatmas': completed_khatmas,
        'total_chapters_read': total_chapters_read,
        'current_streak': user.current_streak,
        'total_reading_time': 0,  # You can calculate this based on reading sessions
        'achievements_count': achievements_count,
        'average_daily_chapters': round(average_daily_chapters, 2),
        'completion_rate': round((completed_khatmas / max(total_khatmas, 1)) * 100, 2),
        'total_participants': total_participants,
    }
    
    serializer = UserStatsSerializer(stats_data)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def khatma_stats(request, khatma_id):
    """Get khatma statistics"""
    khatma = get_object_or_404(Khatma, id=khatma_id)
    
    # Check permission to view stats
    if not khatma.is_public and khatma.creator != request.user:
        if not khatma.participants.filter(id=request.user.id).exists():
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
    
    # Calculate stats
    total_participants = khatma.participants.count()
    
    # Count completed chapters in this khatma
    total_chapters_read = khatma.reading_sessions.filter(is_completed=True).count()
    
    completion_percentage = khatma.completion_percentage
    
    # Get most active reader (by completed chapters)
    most_active_reader_data = khatma.reading_sessions.filter(is_completed=True).values('user').annotate(
        total_chapters=Count('id')
    ).order_by('-total_chapters').first()
    
    most_active_reader = None
    if most_active_reader_data:
        most_active_reader = User.objects.get(id=most_active_reader_data['user'])
    
    # Calculate daily progress for last 30 days
    thirty_days_ago = timezone.now() - timezone.timedelta(days=30)
    daily_progress = []
    
    for i in range(30):
        date = (timezone.now() - timezone.timedelta(days=i)).date()
        day_sessions = khatma.reading_sessions.filter(
            reading_date__date=date, 
            is_completed=True
        )
        chapters_read = day_sessions.count()
        participants_active = day_sessions.values('user').distinct().count()
        
        daily_progress.append({
            'date': date.isoformat(),
            'chapters_read': chapters_read,
            'participants_active': participants_active
        })
    
    daily_progress.reverse()  # Show oldest to newest
    
    # Get chapter completion status for group khatmas
    chapter_completion_status = []
    if khatma.khatma_type == 'group':
        for participant in khatma.khatmaparticipant_set.all():
            chapter_completion_status.append({
                'chapter': participant.chapter_assigned,
                'is_completed': participant.is_chapter_completed,
                'assigned_user': participant.user.username
            })
    
    # Calculate average daily progress
    days_active = max((timezone.now().date() - khatma.start_date.date()).days, 1)
    average_daily_progress = total_chapters_read / days_active
    
    stats_data = {
        'total_participants': total_participants,
        'total_chapters_read': total_chapters_read,
        'completion_percentage': round(completion_percentage, 2),
        'average_daily_progress': round(average_daily_progress, 2),
        'most_active_reader': most_active_reader,
        'daily_progress': daily_progress,
        'chapter_completion_status': chapter_completion_status
    }
    
    serializer = KhatmaStatsSerializer(stats_data)
    return Response(serializer.data)

# Notification Views
class NotificationListView(generics.ListAPIView):
    """List user notifications"""
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return self.request.user.notifications.order_by('-created_at')

@api_view(['PATCH'])
@permission_classes([permissions.IsAuthenticated])
def mark_notification_read(request, notification_id):
    """Mark notification as read"""
    notification = get_object_or_404(Notification, id=notification_id, user=request.user)
    notification.is_read = True
    notification.save()
    return Response({'message': 'Notification marked as read'})

@api_view(['PATCH'])
@permission_classes([permissions.IsAuthenticated])
def mark_all_notifications_read(request):
    """Mark all notifications as read"""
    request.user.notifications.update(is_read=True)
    return Response({'message': 'All notifications marked as read'})

# Achievement Views
class UserAchievementListView(generics.ListAPIView):
    """List user achievements"""
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        if user_id:
            return Achievement.objects.filter(user_id=user_id).order_by('-earned_at')
        return self.request.user.achievements.order_by('-earned_at')

# Search and Discovery
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def search_khatmas(request):
    """Search for khatmas"""
    query = request.query_params.get('q', '')
    khatma_type = request.query_params.get('type', '')
    
    queryset = Khatma.objects.filter(is_public=True, status='active')
    
    if query:
        queryset = queryset.filter(
            Q(name__icontains=query) | 
            Q(description__icontains=query) |
            Q(creator__username__icontains=query)
        )
    
    if khatma_type:
        queryset = queryset.filter(khatma_type=khatma_type)
    
    # Exclude khatmas user already joined
    queryset = queryset.exclude(participants=request.user)
    
    serializer = KhatmaListSerializer(queryset[:20], many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_data(request):
    """Get dashboard data for the user"""
    user = request.user
    
    # Active khatmas
    active_khatmas = user.joined_khatmas.filter(status='active')[:5]
    
    # Recent reading sessions
    recent_sessions = ReadingSession.objects.filter(user=user).order_by('-reading_date')[:10]
    
    # Unread notifications
    unread_notifications = user.notifications.filter(is_read=False)[:5]
    
    # Today's progress (completed chapters)
    today = timezone.now().date()
    today_sessions = ReadingSession.objects.filter(
        user=user, 
        reading_date__date=today, 
        is_completed=True
    )
    today_chapters = today_sessions.count()
    
    # Weekly progress (completed chapters)
    week_ago = timezone.now() - timezone.timedelta(days=7)
    weekly_sessions = ReadingSession.objects.filter(
        user=user, 
        reading_date__gte=week_ago, 
        is_completed=True
    )
    weekly_chapters = weekly_sessions.count()
    
    data = {
        'active_khatmas': KhatmaListSerializer(active_khatmas, many=True, context={'request': request}).data,
        'recent_sessions': ReadingSessionSerializer(recent_sessions, many=True).data,
        'unread_notifications': NotificationSerializer(unread_notifications, many=True).data,
        'today_pages': today_chapters,  # Keep field name for frontend compatibility
        'weekly_pages': weekly_chapters,  # Keep field name for frontend compatibility
        'total_khatmas': user.joined_khatmas.count(),
        'current_streak': user.current_streak
    }
    
    return Response(data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_profile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)