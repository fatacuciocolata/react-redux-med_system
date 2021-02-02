import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { fetchAppointments, showErrors } from "../redux/appointments/appointmentsActions.js"
import { Appointment } from "../components/Appointments/appointment"
import { Search } from "../components/search"

function Appointments() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.appointments)
    const {loading, errors, appointments} = state

    useEffect(() => {
        try {
            dispatch(fetchAppointments())
        } catch(error) {
            dispatch(showErrors(error))
        }
    },[dispatch])

    return (
        <div className="wrapper">
            <div className="top-headline">
                <h3>Appointments</h3>
                {/* <button onClick={ () => { setIsAddingPatient(true) } }><AddPlus />New Appointment</button> */}
            </div>
            
            <Search />
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Patient</th>
                        <th>Treatments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {(loading === false && typeof errors.message !== "undefined") && <EmptyTrMessage message={<p style={{color: "#cc0000"}}>{errors.message}</p>} />}                        
                    {loading && <EmptyTrMessage message="Loading..." />}
                    {patients.length === 0 && <EmptyTrMessage message={<p style={{fontStyle: "italic"}}>No patients found!</p>} />} */}
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
            {/* {isAddingPatient && 
                <AddPatient 
                    onSubmit={() => setIsAddingPatient(false)}
                />
            }
            {isAddingAppointment &&
                <AddAppointment 
                    onSubmit={() => setIsAddingAppointment(false)} 
                />
            }
            {itemToDelete && 
                <Modal 
                    message={`Do you want to delete ${ patients.find(x => x.id === itemToDelete).name }? It cannot be undone.`} 
                    onAccept={onAcceptDelete} 
                    onCancel={() => {
                        setItemToDelete(null)
                        setIsDeleting(false)
                    }} 
                />
            } */}
        </div>    
    )
}

export default Appointments