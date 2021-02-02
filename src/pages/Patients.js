import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import { fetchPatients, deletePatient, showErrors } from "../redux/patients/patientsActions"
import { Patient } from "../components/Patients/patient"
import { AddPatient } from "../components/Patients/addPatient"
import { AddAppointment } from "../components/Appointments/addApointment"
import { Modal } from "../components/_modal/modal"
import { Search } from "../components/search"
import { AddPlus } from "../components/_icons/icons"

const EmptyTrMessage = ({ message }) => {
    return <tr><td colSpan="4">{message}</td></tr>
};

function Patients() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.patients)
    const {loading, errors, patients} = state

    const [isAddingPatient, setIsAddingPatient] = useState(false)
    const [isAddingAppointment, setIsAddingAppointment] = useState(false)
    const [patientToAppt, setPatientToAppt] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)

    useEffect(() => {
        try {
            dispatch(fetchPatients())
        } catch(error) {
            dispatch(showErrors(error))
        }
    },[dispatch])

    console.log(isAddingAppointment)
    // if user accepts the modal answer
    const onAcceptDelete = () => {
        setIsDeleting(false);

        try {
            dispatch(deletePatient(itemToDelete))
            setItemToDelete(null)
        } catch (error) {
            dispatch(showErrors(error))
        }
    }

    return (
        <div className="wrapper">
            <div className="top-headline">
                <h3>Patients</h3>
                <button onClick={ () => { setIsAddingPatient(true) } }><AddPlus />New Patient</button>
            </div>
            
            <Search />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Phone</th>
                        <th>Actions</th>
                        <th>Appointments</th>
                    </tr>
                </thead>
                <tbody>
                    {(loading === false && typeof errors.message !== "undefined") && <EmptyTrMessage message={<p style={{color: "#cc0000"}}>{errors.message}</p>} />}                        
                    {loading && <EmptyTrMessage message="Loading..." />}
                    {patients.length === 0 && <EmptyTrMessage message={<p style={{fontStyle: "italic"}}>No patients found!</p>} />}
                    {
                        patients.length > 0
                        &&
                        patients.map(patient => 
                            <Patient 
                                key={patient.id} 
                                patient={patient} 
                                setItemToDelete={setItemToDelete} 
                                setIsAddingAppointment={setIsAddingAppointment}
                                setPatientToAppt={setPatientToAppt}
                            />
                        )
                    }
                </tbody>
            </table>
            {isAddingPatient && 
                <AddPatient 
                    onSubmit={() => setIsAddingPatient(false)}
                />
            }
            {isAddingAppointment &&
                <AddAppointment 
                    patientToAppt={patientToAppt}
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
            }
        </div>
    )
}

export default Patients