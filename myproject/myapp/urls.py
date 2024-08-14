from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignUpView, SignInView, HallViewSet, BookingViewSet

router = DefaultRouter()
router.register(r'halls', HallViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signin/', SignInView.as_view(), name='signin'),
    path('', include(router.urls)),
]
