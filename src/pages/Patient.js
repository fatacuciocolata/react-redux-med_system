import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import {useSelector } from "react-redux"
import axios from "axios"

function Patient() {
    const [isLoading, setIsLoading] = useState(false);
    const [patient, setPatient] = useState("")
    const { id } = useParams()

    useEffect(() => {
        const fetchPatient = async () => {
            setIsLoading(true);
            const res = await axios.get(`http://localhost:8000/patients/${id}`)
            setPatient(res.data.data)
            setIsLoading(false);
        }
        fetchPatient()
    },[])

    return (
        <>
        {isLoading ? (
            <div>Loading ...</div>
          ) : (
            <div>
                <h3>You are viewing patient {patient.name}</h3>
                <div>Allergies: {patient.allergies}</div>
            </div>
        )}
        </>
    )
}

export default Patient