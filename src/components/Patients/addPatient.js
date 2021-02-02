import React, { useState } from "react"
import { createPatient, showErrors } from "../../redux/patients/patientsActions"
import { useDispatch } from "react-redux";

export const AddPatient = ( {onSubmit} ) => {
    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [allergies, setAllergies] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        const dateAsMiliseconds = new Date(birthday).getTime();

        const data = {
            name,
            birthday: dateAsMiliseconds,
            email,
            phone,
            allergies
        }

        try {
            console.log(data)
            dispatch(createPatient(data))
            onSubmit()
        } catch(error) {
            dispatch(showErrors(error))
        }

        setName("")
        setBirthday("")
        setEmail("")
        setPhone("")
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
                    <label htmlFor="birthday">Birthday</label>
                    <input 
                        id="birthday"
                        type="date" 
                        value={birthday}
                        onChange={ e => setBirthday(e.target.value) }
                    />
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input 
                        id="email"
                        type="email" 
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input 
                        id="text"
                        type="phone" 
                        value={phone}
                        onChange={ e => setPhone(e.target.value) }
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