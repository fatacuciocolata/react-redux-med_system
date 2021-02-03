import React from "react"
import { Link } from "react-router-dom";
import date from "../../utils/date"
import { Eye, TrashBin } from "../_icons/icons";

export const Appointment = ( { appointment, setItemToDelete } ) => {
    const { id } = appointment;

    return (
            <tr>
                <td>{date('d-m-Y', appointment.date/1000)}</td>
                <td>{appointment.time}</td>
                {appointment.name &&
                <td>
                    <Link to={`/patients/${appointment.patientId}`}>{appointment.name}</Link>
                </td>
                }
                <td>
                    {appointment.treatments === '' && "No treatments added"}
                    {appointment.treatments !== null && appointment.treatments}
                </td>
                <td className="actions">
                    <button>Add treatments</button>
                    <button onClick={() => setItemToDelete(id)}><TrashBin /></button>
                </td>
            </tr>
    )
}