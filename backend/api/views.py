from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Instructor, Student, Subject, InstructorStudentRelation, InstructorSubjectRelation, Lesson
from .serializers import (
    InstructorSerializer, StudentSerializer, SubjectSerializer,
    InstructorStudentRelationSerializer, InstructorSubjectRelationSerializer,
    LessonSerializer
)

# Create your views here.

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

    @action(detail=True, methods=['get'])
    def students(self, request, pk=None):
        instructor = self.get_object()
        relations = InstructorStudentRelation.objects.filter(instructor=instructor)
        data = []
        for relation in relations:
            data.append({
                'student_id': relation.student.id,
                'student_name': relation.student.name,
                'day_of_week': relation.day_of_week,
                'start_time': relation.start_time,
                'end_time': relation.end_time
            })
        return Response(data)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class InstructorStudentRelationViewSet(viewsets.ModelViewSet):
    queryset = InstructorStudentRelation.objects.all()
    serializer_class = InstructorStudentRelationSerializer

    def get_queryset(self):
        instructor_id = self.request.query_params.get('instructor_id', None)
        if instructor_id:
            return InstructorStudentRelation.objects.filter(instructor_id=instructor_id)
        return super().get_queryset()

class InstructorSubjectRelationViewSet(viewsets.ModelViewSet):
    queryset = InstructorSubjectRelation.objects.all()
    serializer_class = InstructorSubjectRelationSerializer

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
