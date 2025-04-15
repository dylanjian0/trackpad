import os
import django
from datetime import datetime, timedelta

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'trackpad_django.settings')
django.setup()

from api.models import Instructor, Student, Lesson

def create_test_lessons():
    # Get the instructor and students
    instructor = Instructor.objects.get(name='Dylan Jian')
    students = Student.objects.all()
    
    # Create lessons for the next 7 days
    for i in range(7):
        date = datetime.now() + timedelta(days=i)
        for student in students:
            # Create a lesson for each student
            Lesson.objects.create(
                instructor=instructor,
                student=student,
                date=date.date(),
                start_time='14:00:00',
                end_time='15:00:00',
                notes=f'Lesson with {student.name}'
            )

if __name__ == '__main__':
    create_test_lessons()
    print("Test lessons created successfully!") 