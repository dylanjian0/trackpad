import React from 'react'
import Navbar from '../Navbar'

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Welcome, Dylan</h1>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Subject</th>
                <th className="text-left p-4">Meeting Time</th>
                <th className="text-left p-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">Sarah Johnson</td>
                <td className="p-4">Piano</td>
                <td className="p-4">Monday 3:00 PM</td>
                <td className="p-4">Fix Moonlight Sonata measures 45 - 48</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Michael Chen</td>
                <td className="p-4">Piano</td>
                <td className="p-4">Tuesday 4:30 PM and Wednesday 4:00 PM</td>
                <td className="p-4">Finish scales and arpeggios</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Emma Wilson</td>
                <td className="p-4">Piano</td>
                <td className="p-4">Wednesday 2:00 PM</td>
                <td className="p-4">Prepare for recital</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">David Kim</td>
                <td className="p-4">Piano</td>
                <td className="p-4">Thursday 5:00 PM</td>
                <td className="p-4">Focus on sight reading</td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Lisa Rodriguez</td>
                <td className="p-4">Rubik's Cube</td>
                <td className="p-4">Friday 3:30 PM</td>
                <td className="p-4">Work on F2L</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="mt-8 text-black px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">
          Add
        </button>
      </div>
    </>
  )
}

export default Page