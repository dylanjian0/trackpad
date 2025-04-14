from rest_framework import serializers
from .models import Instructor, Student, Subject, InstructorStudentRelation, InstructorSubjectRelation, Lesson

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['id', 'name']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name']

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name']

class InstructorStudentRelationSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='instructor.name', read_only=True)
    student_name = serializers.CharField(source='student.name', read_only=True)

    class Meta:
        model = InstructorStudentRelation
        fields = ['id', 'instructor', 'student', 'day_of_week', 'start_time', 'end_time',
                 'instructor_name', 'student_name']

class InstructorSubjectRelationSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='instructor.name', read_only=True)
    subject_name = serializers.CharField(source='subject.name', read_only=True)

    class Meta:
        model = InstructorSubjectRelation
        fields = ['id', 'instructor', 'subject', 'instructor_name', 'subject_name']

class LessonSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='instructor.name', read_only=True)
    student_name = serializers.CharField(source='student.name', read_only=True)

    class Meta:
        model = Lesson
        fields = ['id', 'instructor', 'student', 'date', 'start_time', 'end_time', 'notes', 
                 'instructor_name', 'student_name'] 