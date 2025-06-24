# urls.py
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

app_name = 'api'

urlpatterns = [
    #Authentication 
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),   
    path('signup/', views.CreateUserView.as_view(), name='user-create'),  
    
    # Khatma URLs
    path('khatmas/', views.KhatmaListCreateView.as_view(), name='khatma-list-create'),
    path('khatmas/<int:pk>/', views.KhatmaDetailView.as_view(), name='khatma-detail'),
    path('khatmas/<int:khatma_id>/join/', views.join_khatma, name='join-khatma'),
    path('khatmas/<int:khatma_id>/leave/', views.leave_khatma, name='leave-khatma'),
    
    # Reading Session URLs
    path('khatmas/<int:khatma_id>/sessions/', views.ReadingSessionListCreateView.as_view(), name='reading-session-list-create'),
    path('sessions/', views.ReadingSessionListCreateView.as_view(), name='all-reading-sessions'),
    
    # Statistics URLs
    path('stats/user/', views.user_stats, name='user-stats'),
    path('stats/user/<int:user_id>/', views.user_stats, name='user-stats-detail'),
    path('stats/khatma/<int:khatma_id>/', views.khatma_stats, name='khatma-stats'),
    
    # Notification URLs
    path('notifications/', views.NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:notification_id>/read/', views.mark_notification_read, name='mark-notification-read'),
    path('notifications/mark-all-read/', views.mark_all_notifications_read, name='mark-all-notifications-read'),
    
    # Achievement URLs
    path('achievements/', views.UserAchievementListView.as_view(), name='user-achievements'),
    path('achievements/user/<int:user_id>/', views.UserAchievementListView.as_view(), name='user-achievements-detail'),
    
    # Search and Discovery URLs
    path('search/khatmas/', views.search_khatmas, name='search-khatmas'),
    
    # Dashboard URL
    path('dashboard/', views.dashboard_data, name='dashboard-data'),

    #Profile
    path('user/me/', views.user_profile, name='user-profile'),
]