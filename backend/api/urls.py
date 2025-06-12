from django.urls import path
from .views import khatma_testCreate,khatma_testDelete


urlpatterns =[
    path('khatma/',khatma_testCreate.as_view(), name="khatma_list"),
    path('khatma/delete/<int:pk>/',khatma_testDelete.as_view(), name="khatma_Delete"),
]