import React from "react"
import { Link } from "react-router-dom";
import { Eye, TrashBin } from "../_icons/icons";

export const Patient = ( { patient, setItemToDelete, setIsAddingAppointment, setPatientToAppt } ) => {
    const { id } = patient;
    return (
            <tr>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td className="actions">
                    <button><Link to={`/patients/${id}`}><Eye /></Link></button>
                    <button onClick={() => setItemToDelete(id)}><TrashBin /></button>
                </td>
                <td>
                    <button 
                        onClick={() => {
                            setPatientToAppt(id);
                            setIsAddingAppointment(true)}}
                        >Add apointment
                    </button>
                </td>
            </tr>
    )
}