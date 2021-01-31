import React, { useState } from "react"
import { createPatient, showErrors } from "../../redux/patients/patientsActions"
import { useDispatch } from "react-redux";

export const AddPatient = ( {onSubmit} ) => {
    const [name, setName] = useState("")
    const [allergies, setAllergies] = useState("")

    const dispatch = useDispatch()

    const data = {
        name,
        allergies
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        try {
            console.log(data)
            dispatch(createPatient(data))
            onSubmit()
        } catch(error) {
            dispatch(showErrors(error))
        }

        setName("")
        setAllergies("")
    }
    return(
        <div className="add_patient">
            <h3>Add patient</h3>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name"
                        type="text" 
                        value={name}
                        onChange={ e => setName(e.target.value) }
                    />
                </div>
                <div>
                    <label htmlFor="allergies">Allergies</label>
                    <input 
                        id="allergies"
                        type="text" 
                        value={allergies}
                        onChange={ e => setAllergies(e.target.value) }
                    />
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}