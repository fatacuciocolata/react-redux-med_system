import React from "react"
import { Link } from "react-router-dom";
import { Eye, TrashBin } from "../_icons/icons";

export const Appointment = ( { appointment } ) => {
    const { id } = appointment;
    const miliseconds = appointment.date;
    const dateObject = new Date(miliseconds);
    const humanDateFormat = dateObject.toLocaleDateString()

    return (
            <tr>
                <td>{humanDateFormat}</td>
                <td>{appointment.time}</td>
                {appointment.name &&
                <td>
                    <Link to={`/patients/${appointment.patientId}`}>{appointment.name}</Link>
                    
                </td>
                }
                <td>{appointment.treatments}</td>
                <td className="actions">
                    <button>Add treatments</button>
                    <button><TrashBin /></button>
                    {/* <button onClick={() => setItemToDelete(id)}><TrashBin /></button> */}
                </td>
            </tr>
    )
}