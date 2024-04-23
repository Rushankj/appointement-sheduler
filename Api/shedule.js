const express = require('express');
const app = express();
app.use(express.json());

const doctors = [
  {
    id: '1',
    name: 'Rama swamy',
    specialty: 'Cardiology',
    schedule: {
      days: ['Monday', 'Tuesday', 'Wednesday'],
      startTime: '18:00',
      endTime: '20:00',
      maxAppointments: 5
    }
  } , 
  {
    id: '2',
    name: 'Jitendra tripadhi',
    specialty: 'Dermatology',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      startTime: '18:30',
      endTime: '20:30',
      maxAppointments: 4
    }
  }
];

const appointments = [];


app.get('/doctors', (req, res) => {
  res.json({ doctors });
});


app.get('/doctors/:doctorId', (req, res) => {
  const doctorId = req.params.doctorId;
  const doctor = doctors.find(d => d.id === doctorId);

  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }

  
});


app.get('/doctors/:doctorId/availability', (req, res) => {
  const doctorId = req.params.doctorId;
  const doctor = doctors.find(d => d.id === doctorId);

  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }

  const { days, startTime, endTime, maxAppointments } = doctor.schedule;
  const availableSlots = [];



  res.json({
    doctorId: doctor.id,
    doctorName: doctor.name,
    availableSlots
  });
});


app.post('/doctors/:doctorId/appointments', (req, res) => {
  const doctorId = req.params.doctorId;
  const doctor = doctors.find(d => d.id === doctorId);

  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }

  const { patientName, dateTime } = req.body;


  const doctorAppointments = appointments.filter(appointment => appointment.doctorId === doctorId);
  if (doctorAppointments.length >= doctor.schedule.maxAppointments) {
    return res.status(400).json({ error: 'Maximum appointments reached for the doctor' });
  }

  
  const newAppointment = {
    appointmentId: generateAppointmentId(),
    doctorId,
    doctorName: doctor.name,
    patientName,
    dateTime
  };

  appointments.push(newAppointment);

  
});


function generateAppointmentId() {

  return '12345';
}


app.listen(3000, () => {
  console.log('Server started on port 3000');
});