from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Khatma_test_1

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    email = serializers.EmailField(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('A user with this username already exists.')
        return value

    def create(self, validated_data):
        try:
            user = User.objects.create_user(**validated_data)
            return user
        except Exception as e:
            raise serializers.ValidationError(str(e))

class Khatma_test_1Serializer(serializers.ModelSerializer):
    class Meta:
        model= Khatma_test_1
        fields = ["id","author","title","content","created_at"]
        extra_kwargs ={'author': {'read_only':True}}
        read_only_fields = ["id","author"]
