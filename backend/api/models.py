# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

class User(AbstractUser):
    """Extended User model"""
    fullname=models.CharField(max_length=100,blank=True)
    gender=models.CharField(max_length=10,blank=True)
    phone=models.CharField(max_length=15,blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    total_khatmas_completed = models.IntegerField(default=0)
    current_streak = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

class Khatma(models.Model):
    """Main Khatma (Quran completion) model"""
    KHATMA_TYPES = [
        ('private', 'خاتمة خاصة'),
        ('group', 'خاتمة جماعية'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'نشطة'),
        ('completed', 'مكتملة'),
        ('paused', 'متوقفة'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    khatma_type = models.CharField(max_length=10, choices=KHATMA_TYPES, default='private')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_khatmas')
    participants = models.ManyToManyField(User, through='KhatmaParticipant', related_name='joined_khatmas')
    target_days = models.IntegerField(validators=[MinValueValidator(1)], help_text="Target days to complete")
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True, blank=True)
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.creator.username}"

    @property
    def completion_percentage(self):
        """Calculate overall completion percentage based on chapters"""
        if self.khatma_type == 'group':
            # For group khatmas, each participant should complete their assigned chapter
            total_assignments = self.participants.count()
            if total_assignments == 0:
                return 0
            completed_assignments = self.reading_sessions.filter(is_completed=True).values('user').distinct().count()
            return min((completed_assignments / total_assignments) * 100, 100)
        else:
            # For private khatmas, all 30 chapters should be completed
            total_chapters = 30
            completed_chapters = self.reading_sessions.filter(is_completed=True).values('chapter_assigned').distinct().count()
            return min((completed_chapters / total_chapters) * 100, 100)

    @property
    def days_remaining(self):
        """Calculate remaining days"""
        if self.end_date:
            return max((self.end_date.date() - timezone.now().date()).days, 0)
        return None

class KhatmaParticipant(models.Model):
    """Through model for Khatma participants"""
    khatma = models.ForeignKey(Khatma, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    chapter_assigned = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(30)])

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'khatma'], name='unique_user_khatma'),
            models.UniqueConstraint(fields=['khatma', 'chapter_assigned'], name='unique_chapter_assignment')
        ]

    def __str__(self):
        return f"{self.user.username} in {self.khatma.name} - Chapter {self.chapter_assigned}"

    @property
    def is_chapter_completed(self):
        """Check if the assigned chapter is completed"""
        return self.khatma.reading_sessions.filter(
            user=self.user,
            chapter_assigned=self.chapter_assigned,
            is_completed=True
        ).exists()

class ReadingSession(models.Model):
    """Individual reading sessions"""
    khatma = models.ForeignKey(Khatma, on_delete=models.CASCADE, related_name='reading_sessions')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chapter_assigned = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(30)])
    is_completed = models.BooleanField(default=True)
    reading_date = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-reading_date']
        constraints = [
            models.UniqueConstraint(
                fields=['khatma', 'user', 'chapter_assigned'], 
                condition=models.Q(is_completed=True),
                name='unique_completed_chapter_per_user'
            )
        ]

    def __str__(self):
        return f"{self.user.username} - Chapter {self.chapter_assigned} - {'Completed' if self.is_completed else 'In Progress'}"

class Achievement(models.Model):
    """User achievements"""
    ACHIEVEMENT_TYPES = [
        ('first_khatma', 'First Khatma'),
        ('streak_7', '7 Day Streak'),
        ('streak_30', '30 Day Streak'),
        ('fast_reader', 'Fast Reader'),
        ('consistent_reader', 'Consistent Reader'),
        ('chapter_master', 'Chapter Master'),  # Complete all 30 chapters
        ('group_leader', 'Group Leader'),      # Lead 5 group khatmas
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    achievement_type = models.CharField(max_length=20, choices=ACHIEVEMENT_TYPES)
    earned_at = models.DateTimeField(auto_now_add=True)
    khatma = models.ForeignKey(Khatma, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'achievement_type'], name="unique_user_achievement")
        ]

    def __str__(self):
        return f"{self.user.username} - {self.get_achievement_type_display()}"

class Notification(models.Model):
    """User notifications"""
    NOTIFICATION_TYPES = [
        ('khatma_invitation', 'Khatma Invitation'),
        ('khatma_completed', 'Khatma Completed'),
        ('daily_reminder', 'Daily Reminder'),
        ('achievement_earned', 'Achievement Earned'),
        ('chapter_assigned', 'Chapter Assigned'),
        ('chapter_completed', 'Chapter Completed'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    related_khatma = models.ForeignKey(Khatma, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Notification for {self.user.username}: {self.title}"