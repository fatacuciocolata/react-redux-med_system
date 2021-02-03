import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { deleteAppointment, fetchAppointments, showErrors } from "../redux/appointments/appointmentsActions.js"
import { Appointment } from "../components/Appointments/appointment"
import { Search } from "../components/search"
import { Modal } from "../components/_modal/modal"
import { EmptyTr } from "../utils/emptyTr"

function Appointments() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.appointments)
    const {loading, errors, appointments} = state
    const [isDeleting, setIsDeleting] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)

    useEffect(() => {
        try {
            dispatch(fetchAppointments())
        } catch(error) {
            dispatch(showErrors(error))
        }
    },[dispatch])

    const onAcceptDelete = () => {
        setIsDeleting(false);

        try {
            dispatch(deleteAppointment(itemToDelete))
            setItemToDelete(null)
        } catch (error) {
            dispatch(showErrors(error))
        }
    }
    
    return (
        <div className="wrapper">
            <div className="top-headline">
                <h3>Appointments</h3>
                {/* <button onClick={ () => { setIsAddingPatient(true) } }><AddPlus />New Appointment</button> */}
            </div>
            
            <Search placeholder="appointments"/>
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
                    {loading && <EmptyTrMessage message="Loading..." /> } */}
                    { appointments.length === 0 && 
                        <EmptyTr nrCols="5" message={<p style={{fontStyle: "italic"}}>No appointments found!</p>} />}
                    {
                        appointments.length > 0
                        &&
                        appointments.map(appointment => 
                            <Appointment
                                key={appointment.id} 
                                appointment={appointment} 
                                setItemToDelete={setItemToDelete} 
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
            */}
            {itemToDelete && 
                <Modal 
                    message={`Are you sure you want to delete this appointment? It cannot be undone.`} 
                    onAccept={onAcceptDelete} 
                    onCancel={() => {
                        setItemToDelete(null)
                        setIsDeleting(false)
                    }} 
                />
            }
        </div>    
    )
}

export default Appointments