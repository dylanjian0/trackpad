import React, { useState } from 'react'

interface StudentDetailsProps {
  student: {
    id: number
    student_name: string
    day_of_week: string
    start_time: string
    end_time: string
  }
  onDelete: (id: number) => Promise<void>
  onClose: () => void
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student, onDelete, onClose }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${period}`
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(student.id)
      onClose()
    } catch (error) {
      console.error('Error deleting student:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{student.student_name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Meeting Details</h3>
          <p className="text-gray-600">
            {student.day_of_week} {formatTime(student.start_time)} - {formatTime(student.end_time)}
          </p>
        </div>

        {showDeleteConfirm ? (
          <div className="border-t pt-4">
            <p className="text-red-500 mb-4">Are you sure you want to delete this student?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
            >
              Delete Student
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentDetails 