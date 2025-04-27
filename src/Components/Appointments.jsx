import React, { useState, useEffect } from 'react';
import '../css/Appointments.css'; // Import the CSS file

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(savedAppointments);
  }, []);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (doctorName && appointmentDate) {
      const newAppointments = [...appointments, { doctorName, appointmentDate }];
      setAppointments(newAppointments);
      localStorage.setItem('appointments', JSON.stringify(newAppointments));
      setDoctorName('');
      setAppointmentDate('');
    }
  };

  return (
    <div className="appointments-container">
      <div className="form-container">
        <h1>Appointments</h1>
        <form onSubmit={handleAddAppointment}>
          <div>
            <label htmlFor="doctorName">Doctor's Name:</label>
            <input
              id="doctorName"
              name="doctorName"
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="appointmentDate">Appointment Date:</label>
            <input
              id="appointmentDate"
              name="appointmentDate"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Appointment</button>
        </form>
      </div>
      <div className="appointments-list">
        <h2>Your Appointments</h2>
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <strong>Doctor:</strong> {appointment.doctorName} <br />
              <strong>Date:</strong> {appointment.appointmentDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Appointments;
