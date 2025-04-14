from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'instructors', views.InstructorViewSet)
router.register(r'students', views.StudentViewSet)
router.register(r'subjects', views.SubjectViewSet)
router.register(r'instructor-student-relations', views.InstructorStudentRelationViewSet)
router.register(r'instructor-subject-relations', views.InstructorSubjectRelationViewSet)
router.register(r'lessons', views.LessonViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 