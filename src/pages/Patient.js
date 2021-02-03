import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from "axios"
import date from "../utils/date"
import { Appointment } from "../components/Appointments/appointment";
import { EmptyTr } from "../utils/date"

function Patient() {
    const [isLoading, setIsLoading] = useState(false);
    const [patient, setPatient] = useState("")
    const [appointments, setAppointments] = useState([])
    const { id } = useParams()
    
    useEffect(() => {
        const fetchPatient = async () => {
            setIsLoading(true);
            const res = await axios.get(`http://localhost:8000/patients/${id}`)
            setPatient(res.data.data)
            setIsLoading(false);
        }
   
        fetchPatient()
    },[])

    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true);
            const res = await axios.get(`http://localhost:8000/appointmentsByPatientId/${id}`)
            setAppointments(res.data)
            setIsLoading(false);
        }
        fetchAppointments()
    },[])

    return (
        <>
        {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
                <h3>You are viewing patient {patient.name}</h3>
                <div>
                    <h4>Details</h4>
                    <p>Name: {patient.name}</p>
                    <p>Birthday: {date('d-m-Y', patient.birthday/1000)}</p>
                    <p>Phone: {patient.phone}</p>
                    <p>Email: {patient.email}</p>
                    <p>Allergies: {patient.allergies}</p>
                </div>
                <div>
                    <h4>Appointments</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Treatments</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                        {/* {(loading === false && typeof errors.message !== "undefined") && <EmptyTrMessage message={<p style={{color: "#cc0000"}}>{errors.message}</p>} />}                        
                        {loading && <EmptyTrMessage message="Loading..." />} */}
                        {appointments.error && <EmptyTr nrCols="4" message={<p style={{fontStyle: "italic"}}>No appointments found!</p>} />}
                  
                        {
                            appointments.length > 0
                            &&
                            appointments.map(appointment => 
                                <Appointment
                                    key={appointment.id} 
                                    appointment={appointment} 
                                />
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </>
        )}
        </>
    )
}

export default Patient