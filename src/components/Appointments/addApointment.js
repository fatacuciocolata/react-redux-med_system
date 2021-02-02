import React, { useState } from "react"
import { createAppointment, showErrors } from "../../redux/appointments/appointmentsActions.js"
import { useDispatch } from "react-redux";

export const AddAppointment = ( {onSubmit, patientToAppt} ) => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [treatments, setTreatments] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        const dateAsMiliseconds = new Date(date).getTime();

        const data = {
            date: dateAsMiliseconds,
            time,
            treatments,
            patientId: patientToAppt
        }
        
        try {
            dispatch(createAppointment(data))
            onSubmit()
        } catch(error) {
            dispatch(showErrors(error))
        }

        setDate("")
        setTime("")
        setTreatments("")
    }
    return(
        <div className="add_patient">
            <h3>Add appointment</h3>

            <form>
                <div>
                    <label htmlFor="date">Date</label>
                    <input 
                        id="date"
                        type="date" 
                        value={date}
                        onChange={ e => setDate(e.target.value) }
                    />
                </div>
                <div>
                    <label htmlFor="time">Time</label>
                    <input 
                        id="time"
                        type="time" 
                        value={time}
                        onChange={ e => setTime(e.target.value) }
                    />
                </div>
                <div>
                    <label htmlFor="treatments">Treatments</label>
                    <input 
                        id="allergies"
                        type="text" 
                        value={treatments}
                        onChange={ e => setTreatments(e.target.value) }
                    />
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}