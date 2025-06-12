from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer,Khatma_test_1Serializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Khatma_test_1

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            except Exception as e:
                return Response(
                    {"detail": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class khatma_testCreate(generics.ListCreateAPIView):
    serializer_class = Khatma_test_1Serializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Khatma_test_1.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class khatma_testDelete(generics.DestroyAPIView):
    serializer_class = Khatma_test_1Serializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Khatma_test_1.objects.filter(author=user)
