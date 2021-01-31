import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import { fetchPatients, deletePatient, showErrors } from "../redux/patients/patientsActions"
import { Patient } from "../components/Patients/patient"
import { AddPatient } from "../components/Patients/addPatient"
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

    const [isAdding, setIsAdding] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)

    useEffect(() => {
        try {
            dispatch(fetchPatients())
        } catch(error) {
            dispatch(showErrors(error))
        }
    },[dispatch])

    
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
                <button onClick={ () => { setIsAdding(true) } }><AddPlus />New Patient</button>
            </div>
            
            <Search />
            <table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {(loading === false && typeof errors.message !== "undefined") && <EmptyTrMessage message={<p style={{color: "#cc0000"}}>{errors.message}</p>} />}                        
                    {loading && <EmptyTrMessage message="Loading..." />}
                    {patients.length === 0 && <EmptyTrMessage message={<p style={{fontStyle: "italic"}}>No patients found!</p>} />}
                    {
                        patients.length > 0
                        &&
                        patients.map(patient => <Patient key={patient.id} patient={patient} setItemToDelete={setItemToDelete} />)
                    }
                </tbody>
            </table>
            {isAdding && 
                <AddPatient 
                    onSubmit={() => setIsAdding(false)}
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