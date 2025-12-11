# 🎓 Trackpad - Modern Tutoring Management Platform

A comprehensive full-stack web application designed to streamline tutoring operations through intelligent scheduling, student management, and lesson tracking. Built with modern technologies and enterprise-grade architecture.

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-5.2-092E20?style=flat&logo=django)](https://www.djangoproject.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

## 🚀 Overview

Trackpad is a production-ready platform that empowers tutors and educational institutions to manage their operations efficiently. The application features a sophisticated calendar system, real-time student tracking, and a clean, intuitive interface that prioritizes user experience.

### Key Highlights

- **Full-Stack Architecture**: Decoupled frontend and backend with RESTful API design
- **Type-Safe Development**: TypeScript throughout the frontend for robust, maintainable code
- **Scalable Database Design**: Normalized PostgreSQL schema with optimized relationships
- **Modern UI/UX**: Responsive design with Tailwind CSS and smooth interactions
- **Real-Time Updates**: Dynamic data fetching with proper error handling and loading states
- **Advanced Calendar**: Dual-view system (List/Calendar) with week navigation

---

## 🏗️ Architecture

### Backend Stack

```
Django 5.2 + Django REST Framework
├── PostgreSQL Database (Production-Ready Schema)
├── RESTful API with ViewSets
├── CORS-Enabled for Frontend Integration
├── Serializers with Nested Relationships
└── Modular App Structure
```

**Core Technologies:**

- **Django REST Framework**: Building robust, browsable APIs
- **PostgreSQL**: Enterprise-grade relational database
- **psycopg2**: High-performance PostgreSQL adapter
- **CORS Headers**: Secure cross-origin resource sharing

### Frontend Stack

```
Next.js 15 + React 19 + TypeScript
├── App Router Architecture
├── Server & Client Components
├── Tailwind CSS (v4) for Styling
├── React Big Calendar for Scheduling
├── date-fns for Date Manipulation
└── Modal-Based Interactions
```

**Core Technologies:**

- **Next.js 15**: Latest features including optimized rendering
- **React 19**: Cutting-edge React features
- **TypeScript 5**: Full type safety across the application
- **Tailwind CSS v4**: Utility-first styling with modern design
- **React Big Calendar**: Professional calendar component with customization

---

## 📊 Database Schema

```
┌─────────────┐         ┌──────────────────────────────┐         ┌─────────┐
│ Instructor  │────────▶│ InstructorStudentRelation    │◀────────│ Student │
│             │         │ (day_of_week, start_time,    │         │         │
│  - id       │         │  end_time)                   │         │  - id   │
│  - name     │         └──────────────────────────────┘         │  - name │
└─────────────┘                                                  └─────────┘
       │                                                                │
       │                                                                │
       ▼                                                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                             Lesson                                       │
│  - id, instructor_id, student_id                                        │
│  - date, start_time, end_time, notes                                    │
└─────────────────────────────────────────────────────────────────────────┘
       │
       │
       ▼
┌──────────────────────────────┐         ┌─────────┐
│ InstructorSubjectRelation    │◀────────│ Subject │
└──────────────────────────────┘         │         │
                                         │  - id   │
                                         │  - name │
                                         └─────────┘
```

**Design Features:**

- Normalized schema with proper foreign key constraints
- Many-to-many relationships through junction tables
- Unique constraints preventing duplicate relations
- Flexible scheduling with day-of-week patterns
- Comprehensive lesson tracking with notes

---

## 🎯 Core Features

### 1. **Student Management**

- View all students with scheduled meeting times
- Add new students with customizable schedules
- Delete student relationships with confirmation dialogs
- Detailed student profiles with meeting information
- Real-time CRUD operations with optimistic updates

### 2. **Lesson Scheduler**

- **Dual View System**:
  - **List View**: Clean, organized view grouped by day of week
  - **Calendar View**: Visual weekly calendar with drag-and-drop compatibility
- Week navigation (Previous/Next/Today)
- Dynamic event rendering based on recurring schedules
- Time formatting with 12-hour AM/PM display
- Responsive design adapting to screen sizes

### 3. **RESTful API**

- **Endpoints**:
  - `/api/instructors/` - Instructor management
  - `/api/students/` - Student operations
  - `/api/subjects/` - Subject catalog
  - `/api/instructor-student-relations/` - Schedule management
  - `/api/instructor-subject-relations/` - Subject assignments
  - `/api/lessons/` - Lesson tracking
- Query parameter filtering (e.g., `?instructor_id=1`)
- Nested serializers returning related data
- Custom actions (e.g., `/instructors/{id}/students/`)

### 4. **Modern UI/UX**

- Smooth hover animations with scale transforms
- Modal-based interactions for non-disruptive workflows
- Loading states and error handling with retry mechanisms
- Clean navigation with centered menu layout
- Consistent design language throughout the application

---

## 🛠️ Technical Implementation

### Backend Highlights

```python
# Optimized ViewSet with Custom Actions
class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer

    @action(detail=True, methods=['get'])
    def students(self, request, pk=None):
        instructor = self.get_object()
        relations = InstructorStudentRelation.objects.filter(instructor=instructor)
        # Returns optimized, denormalized data for frontend consumption
```

**Key Patterns:**

- **ViewSets**: Full CRUD operations with minimal code
- **Serializer Nesting**: Related data included in responses
- **Query Optimization**: Filtering at the database level
- **REST Standards**: Proper HTTP methods and status codes

### Frontend Highlights

```typescript
// Type-Safe State Management with React Hooks
interface RecurringLesson {
  id: number;
  instructor_id: number;
  student_id: number;
  student_name: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

// Memoized event calculation for performance
const events = useMemo(() => calculateEvents(), [lessons, currentDate]);
```

**Key Patterns:**

- **Component Composition**: Reusable, single-responsibility components
- **Custom Hooks**: Logic separation and reusability
- **Type Safety**: Interfaces for all data structures
- **Performance**: useMemo/useCallback for optimization
- **Error Boundaries**: Graceful error handling throughout

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 20+
- Python 3.13+
- PostgreSQL 15+

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install django==5.2 djangorestframework psycopg2-binary django-cors-headers python-dotenv

# Configure database
# Update settings.py with your PostgreSQL credentials

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Django Admin**: http://localhost:8000/admin

---

## 🔧 Configuration

### Database Configuration

Update `backend/trackpad_django/settings.py`:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "your_database_name",
        "USER": "your_database_user",
        "PASSWORD": "your_password",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
```

### CORS Configuration

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Next.js frontend
]
```

---

## 🎨 UI Components

### Navigation Bar

- Responsive grid layout with centered menu
- Hover animations for interactive feedback
- Consistent brand identity with "Trackpad" logo

### Student Management Interface

- Table-based layout with clear information hierarchy
- Modal dialogs for adding students
- Confirmation dialogs for destructive actions
- Time formatting utilities for user-friendly display

### Calendar System

- Integration with `react-big-calendar`
- Custom styling matching application theme
- Dynamic event generation from recurring schedules
- Week-based navigation with intuitive controls

---

## 📱 Pages & Routes

| Route       | Component        | Description                           |
| ----------- | ---------------- | ------------------------------------- |
| `/`         | Home             | Landing page with navigation          |
| `/students` | Students Manager | View, add, and delete students        |
| `/lessons`  | Lesson Calendar  | Dual-view lesson scheduler            |
| `/messages` | Messages         | Communication hub (placeholder)       |
| `/profile`  | Profile          | User profile management (placeholder) |

---

## 🔐 API Endpoints

### Instructors

- `GET /api/instructors/` - List all instructors
- `POST /api/instructors/` - Create instructor
- `GET /api/instructors/{id}/` - Retrieve instructor
- `PUT /api/instructors/{id}/` - Update instructor
- `DELETE /api/instructors/{id}/` - Delete instructor
- `GET /api/instructors/{id}/students/` - Get instructor's students

### Students

- `GET /api/students/` - List all students
- `POST /api/students/` - Create student
- `GET /api/students/{id}/` - Retrieve student
- `PUT /api/students/{id}/` - Update student
- `DELETE /api/students/{id}/` - Delete student

### Relationships & Lessons

- `GET /api/instructor-student-relations/?instructor_id={id}` - Filter by instructor
- `POST /api/instructor-student-relations/` - Create relationship
- `DELETE /api/instructor-student-relations/{id}/` - Remove relationship
- `GET /api/lessons/?instructor_id={id}` - Get lessons for instructor
- `POST /api/lessons/` - Create lesson

---

## 🧪 Development Utilities

### Test Data Generator

```python
# backend/create_test_data.py
# Generates sample lessons for testing
python create_test_data.py
```

---

## 🚀 Performance Optimizations

1. **Database Query Optimization**: Filtering at database level
2. **React Memoization**: useMemo for expensive calculations
3. **Code Splitting**: Next.js automatic code splitting
4. **Static Generation**: Next.js ISR where applicable
5. **Tailwind Purging**: Production builds only include used CSS
6. **Component Lazy Loading**: Dynamic imports for heavy components

---

## 🎯 Future Enhancements

- [ ] Real-time messaging system with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Mobile application (React Native)
- [ ] Multi-language support (i18n)
- [ ] CI/CD pipeline with GitHub Actions

---

## 🧰 Tech Stack Summary

### Backend

| Technology            | Purpose             |
| --------------------- | ------------------- |
| Django 5.2            | Web framework & ORM |
| Django REST Framework | API development     |
| PostgreSQL            | Database            |
| psycopg2              | PostgreSQL adapter  |
| django-cors-headers   | CORS handling       |

### Frontend

| Technology         | Purpose            |
| ------------------ | ------------------ |
| Next.js 15         | React framework    |
| React 19           | UI library         |
| TypeScript 5       | Type safety        |
| Tailwind CSS 4     | Styling            |
| react-big-calendar | Calendar component |
| date-fns           | Date manipulation  |

---

## 💼 Why This Project Matters

This project demonstrates proficiency in:

✅ **Full-Stack Development**: End-to-end application development  
✅ **Modern Web Technologies**: Latest versions of industry-standard tools  
✅ **Database Design**: Normalized schema with complex relationships  
✅ **API Design**: RESTful principles and best practices  
✅ **Type Safety**: TypeScript for maintainable codebases  
✅ **UI/UX Design**: User-centered interface design  
✅ **Code Organization**: Modular, scalable architecture  
✅ **Performance**: Optimized rendering and data fetching  
✅ **Error Handling**: Robust error states and user feedback  
✅ **Responsive Design**: Mobile-first approach with Tailwind

---

## 👨‍💻 Developer

**Dylan Jian**

This project showcases my ability to:

- Build production-ready full-stack applications
- Work with modern frameworks and libraries
- Design and implement RESTful APIs
- Create intuitive user interfaces
- Manage complex data relationships
- Write clean, maintainable code
- Deploy scalable web applications
