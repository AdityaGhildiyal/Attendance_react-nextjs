import { getSession } from 'next-auth/react';
import { connectDB } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await getSession({ req });
    
    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { email } = session.user; 

    try {
      const connection = await connectDB();
      const database = connection.useDb('attendanceproject');

      const collection = database.collection('students'); 

      const studentData = await collection.findOne({ email });

      if (!studentData) {
        return res.status(404).json({ message: 'Student not found' });
      }

      const studentInfo = {
        name: studentData.name,
        email: studentData.email,
        contact: studentData.contact,
        fatherName: studentData.fatherName,
        motherName: studentData.motherName,
        dob: studentData.dob,
        campus: studentData.campus,
        course: studentData.course,
        specialization: studentData.specialization,
        yearSem: studentData.yearSem,
        branch: studentData.branch,
        section: studentData.section,
        classRollNo: studentData.classRollNo,
        universityRollNo: studentData.universityRollNo,
        highschoolPercentage: studentData.highschoolPercentage,
        intermediatePercentage: studentData.intermediatePercentage,
      };

      return res.status(200).json(studentInfo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching student info' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
