'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import AddStudentModal from './AddStudentModal'
import StudentDetails from './StudentDetails'

interface StudentData {
  id: number
  instructor: number
  student: number
  day_of_week: string
  start_time: string
  end_time: string
  instructor_name: string
  student_name: string
}

const Page = () => {
  const [students, setStudents] = useState<StudentData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null)

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/instructor-student-relations/?instructor_id=1')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setStudents(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching students:', error)
      setError(`Failed to load data: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleAddStudent = async (studentId: number, dayOfWeek: string, startTime: string, endTime: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/instructor-student-relations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instructor: 1,
          student: studentId,
          day_of_week: dayOfWeek,
          start_time: startTime,
          end_time: endTime,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error response:', errorData)
        throw new Error(errorData.detail || 'Failed to add student')
      }

      await fetchStudents()
    } catch (error) {
      console.error('Error adding student:', error)
      throw error
    }
  }

  const handleDeleteStudent = async (relationId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/instructor-student-relations/${relationId}/`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete student')
      }

      await fetchStudents()
    } catch (error) {
      console.error('Error deleting student:', error)
      setError(`Failed to delete student: ${error instanceof Error ? error.message : 'Unknown error'}`)
      throw error
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${period}`
  }

  const formatMeetingTime = (student: StudentData) => {
    return `${student.day_of_week} ${formatTime(student.start_time)} - ${formatTime(student.end_time)}`
  }

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Welcome, Dylan</h1>
        
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">
            {error}
            <button 
              onClick={() => window.location.reload()} 
              className="ml-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Meeting Time</th>
                  <th className="text-left p-4"></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-4">{student.student_name}</td>
                    <td className="p-4">{formatMeetingTime(student)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-8 text-black px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Add
        </button>

        <AddStudentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddStudent}
        />

        {selectedStudent && (
          <StudentDetails
            student={selectedStudent}
            onDelete={handleDeleteStudent}
            onClose={() => setSelectedStudent(null)}
          />
        )}
      </div>
    </>
  )
}

export default Page