import { getSession } from 'next-auth/react';
import { connectDB } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await getSession({ req });
    console.log('Session:', session);

    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { email } = session.user;

    try {
      const connection = await connectDB();
      console.log('Connected to database:', connection.name);

      const database = connection.useDb('attendanceproject'); // Fixed db access
      const Tcollection = database.collection('teacher');

      console.log('Querying for email:', email);
      const teacherData = await Tcollection.findOne({ email });

      if (!teacherData) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      const teacherInfo = {
        name: teacherData.name || 'N/A', // Handle null or undefined fields
        email: teacherData.email || 'N/A',
        department: teacherData.department || 'N/A',
        employeeId: 'T12345',
        joinDate: teacherData.joiningDate || 'N/A',
        specialization: 'CSE', // Hardcoded for now
        course: teacherData.subject || 'N/A',
      };

      return res.status(200).json(teacherInfo);
    } catch (error) {
      console.error('Error fetching teacher info:', error);
      return res.status(500).json({ message: 'Error fetching teacher info' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
