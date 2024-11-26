'use client'

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

const ClassCard = ({ subject, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-green-500'
      case 'Upcoming':
        return 'bg-yellow-500'
      case 'Completed':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-shadow ${
        subject.status === 'Ongoing' ? 'border-green-500' : ''
      }`}
      onClick={() => onClick('academic', subject)}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
          <Badge className={`${getStatusColor(subject.status)} text-white`}>
            {subject.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Code: {subject.code}</p>
          <p className="text-sm text-gray-600">Faculty: {subject.faculty}</p>
          <p className="text-sm text-gray-600">
            Attendance: {subject.attended}/{subject.total} ({subject.percentage}%)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ClassCard
