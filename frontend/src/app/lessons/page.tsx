'use client'

import React, { useState, useMemo } from 'react'
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

// Helper function to create a Date object for the current week
// const getDateForDay = (dayName: string, timeStr: string) => {
//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
//   const today = new Date()
//   const dayIndex = days.indexOf(dayName)
//   const currentDayIndex = today.getDay()
//   const diff = dayIndex - currentDayIndex
  
//   const date = new Date(today)
//   date.setDate(today.getDate() + diff)
  
//   const [time, meridiem] = timeStr.split(' ')
//   const [hours, minutes] = time.split(':').map(Number)
//   let adjustedHours = hours
//   if (meridiem === 'PM' && hours !== 12) adjustedHours += 12
//   if (meridiem === 'AM' && hours === 12) adjustedHours = 0
  
//   date.setHours(adjustedHours, minutes, 0, 0)
//   return date
// }

const lessons = [
  { name: 'Sarah Johnson', subject: 'Piano', day: 'Mon', start: '3:00 PM', end: '4:00 PM' },
  { name: 'Michael Chen', subject: 'Piano', day: 'Tue', start: '4:30 PM', end: '5:30 PM' },
  { name: 'Emma Wilson', subject: 'Piano', day: 'Wed', start: '2:00 PM', end: '3:00 PM' },
  { name: 'Michael Chen', subject: 'Piano', day: 'Wed', start: '4:00 PM', end: '5:00 PM' },
  { name: 'David Kim', subject: 'Piano', day: 'Thu', start: '5:00 PM', end: '6:00 PM' },
  { name: 'Lisa Rodriguez', subject: 'Rubik\'s Cube', day: 'Fri', start: '3:30 PM', end: '4:30 PM' },
]

const ListView = () => {
  // Group lessons by day
  const lessonsByDay = lessons.reduce<Record<string, typeof lessons>>((acc, lesson) => {
    if (!acc[lesson.day]) {
      acc[lesson.day] = []
    }
    acc[lesson.day].push(lesson)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      {Object.entries(lessonsByDay).map(([day, dayLessons]) => (
        <div key={day}>
          <h2 className="text-xl font-bold mb-4">{day}</h2>
          <hr className="border-gray-700 mb-4" />
          <div className="space-y-4">
            {dayLessons.map((lesson, index) => (
              <div key={index} className="flex">
                <span className="w-48">{lesson.start.toLowerCase().replace(' ', '')}-{lesson.end.toLowerCase().replace(' ', '')}</span>
                <span className="w-48">{lesson.name}</span>
                <span>{lesson.subject}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const events = useMemo(() => {
    const weekStart = startOfWeek(currentDate)
    return lessons.map(lesson => {
      const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(lesson.day)
      const date = addDays(weekStart, dayIndex)
      
      const [startTime, startMeridiem] = lesson.start.split(' ')
      const [startHours, startMinutes] = startTime.split(':').map(Number)
      let adjustedStartHours = startHours
      if (startMeridiem === 'PM' && startHours !== 12) adjustedStartHours += 12
      if (startMeridiem === 'AM' && startHours === 12) adjustedStartHours = 0
      
      const [endTime, endMeridiem] = lesson.end.split(' ')
      const [endHours, endMinutes] = endTime.split(':').map(Number)
      let adjustedEndHours = endHours
      if (endMeridiem === 'PM' && endHours !== 12) adjustedEndHours += 12
      if (endMeridiem === 'AM' && endHours === 12) adjustedEndHours = 0
      
      const start = new Date(date)
      start.setHours(adjustedStartHours, startMinutes, 0, 0)
      
      const end = new Date(date)
      end.setHours(adjustedEndHours, endMinutes, 0, 0)
      
      return {
        title: `${lesson.name}, ${lesson.subject}`,
        start,
        end,
      }
    })
  }, [currentDate])

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
        min={new Date(0, 0, 0, 0, 0, 0)} // 9:00 AM
        max={new Date(0, 0, 0, 23.9999, 0, 0)} // 9:00 PM
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
            <button className="px-4 py-1 border border-gray-600 rounded">Edit</button>
          </div>
        </div>

        {activeView === 'list' ? <ListView /> : <CalendarView />}
      </div>
    </div>
  )
}

export default Page