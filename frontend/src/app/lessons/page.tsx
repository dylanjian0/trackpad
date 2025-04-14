'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Navbar from '../Navbar'
import { Calendar, dateFnsLocalizer, View, NavigateAction } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, addDays } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'

const locales = {
  'en-US': require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface Lesson {
  id: number
  instructor: number
  student: number
  date: string
  start_time: string
  end_time: string
  notes: string
  student_name: string
  instructor_name: string
}

const ListView = ({ lessons }: { lessons: Lesson[] }) => {
  // Group lessons by date
  const lessonsByDate = lessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
    const date = new Date(lesson.date).toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(lesson)
    return acc
  }, {})

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${period}`
  }

  return (
    <div className="space-y-8">
      {Object.entries(lessonsByDate).map(([date, dayLessons]) => (
        <div key={date}>
          <h2 className="text-xl font-bold mb-4">{date}</h2>
          <hr className="border-gray-700 mb-4" />
          <div className="space-y-4">
            {dayLessons.map((lesson) => (
              <div key={lesson.id} className="flex">
                <span className="w-48">{formatTime(lesson.start_time)} - {formatTime(lesson.end_time)}</span>
                <span className="w-48">{lesson.student_name}</span>
                <span>{lesson.notes || 'No notes'}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const CalendarView = ({ lessons }: { lessons: Lesson[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const calculateEvents = () => {
    return lessons.map(lesson => {
      const date = new Date(lesson.date)
      const [startHours, startMinutes] = lesson.start_time.split(':').map(Number)
      const [endHours, endMinutes] = lesson.end_time.split(':').map(Number)
      
      const start = new Date(date)
      start.setHours(startHours, startMinutes, 0, 0)
      
      const end = new Date(date)
      end.setHours(endHours, endMinutes, 0, 0)
      
      return {
        title: `${lesson.student_name}${lesson.notes ? ` - ${lesson.notes}` : ''}`,
        start,
        end,
      }
    })
  }

  const events = useMemo(calculateEvents, [lessons])

  const handleNavigate = (newDate: Date, view: View, action: NavigateAction) => {
    setCurrentDate(newDate)
  }

  return (
    <div className="h-[600px] bg-[#1c1c24] text-white">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week']}
        min={new Date(0, 0, 0, 0, 0, 0)}
        max={new Date(0, 0, 0, 23.9999, 0, 0)}
        date={currentDate}
        onNavigate={handleNavigate}
        formats={{
          timeGutterFormat: (date: Date) => format(date, 'h:mm a'),
          eventTimeRangeFormat: ({ start, end }: any) =>
            `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`,
        }}
        className="bg-[#1c1c24]"
      />
    </div>
  )
}

const Page = () => {
  const [activeView, setActiveView] = useState<'list' | 'calendar'>('list')
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/lessons/?instructor_id=1')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setLessons(data)
        setError(null)
      } catch (error) {
        console.error('Error fetching lessons:', error)
        setError(`Failed to load data: ${error instanceof Error ? error.message : 'Unknown error'}`)
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [])

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl">Lessons</h1>
          <div className="space-x-4">
            <button 
              onClick={() => setActiveView('list')}
              className={`${activeView === 'list' ? 'text-white' : 'text-gray-400'} hover:text-white transition-colors`}
            >
              List View
            </button>
            <button 
              onClick={() => setActiveView('calendar')}
              className={`${activeView === 'calendar' ? 'text-white' : 'text-gray-400'} hover:text-white transition-colors`}
            >
              Calendar View
            </button>
            <button className="px-4 py-1 border border-gray-600 rounded">Add Lesson</button>
          </div>
        </div>

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
          activeView === 'list' ? <ListView lessons={lessons} /> : <CalendarView lessons={lessons} />
        )}
      </div>
    </div>
  )
}

export default Page