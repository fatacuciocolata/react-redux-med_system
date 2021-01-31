import React from "react"
import { Link } from "react-router-dom";
import { Eye, TrashBin } from "../_icons/icons";

export const Patient = ( { patient, setItemToDelete } ) => {
    const { id } = patient;
    return (
            <tr>
                <td className="name">
                    {patient.name}
                </td>
                <td className="email">
                    popescu@gmail.com
                </td>
                <td className="phone">
                    0372882222
                </td>
                <td className="actions">
                    <button><Link to={`/patient/${id}`}><Eye /></Link></button>
                    <button onClick={() => setItemToDelete(id)}><TrashBin /></button>
                </td>
            </tr>
    )
}