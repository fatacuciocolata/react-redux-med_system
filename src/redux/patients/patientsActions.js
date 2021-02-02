import axios from "axios"

export const FETCH_PATIENTS = "FETCH_PATIENTS";
export const CREATE_PATIENT = "CREATE_PATIENT";
export const DELETE_PATIENT = "DELETE_PATIENT"

export const SHOW_ERRORS = "SHOW_ERRORS"

// FETCH PATIENTS 
export const fetchPatients = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/patients`)

  dispatch({
    type: FETCH_PATIENTS,
    payload: res.data
  });
};

// CREATE NEW PATIENT
export const createPatient = (data) => async (dispatch) => {
  const res = await axios.post(`http://localhost:8000/addPatient`, data)
  const id = res.data.id         

  dispatch({
    type: CREATE_PATIENT,
      payload: {
            id: id,
            ...data,
      }  });
};

// DELETE PATIENT
export const deletePatient = (id) => async (dispatch) => {
  console.log("deleted patient", id);
  await axios.delete(
    `http://localhost:8000/patients/${id}`
  );

  dispatch({
    type: DELETE_PATIENT,
    payload: {
      id: id
    }
  });
};

// SHOW ERRORS IF ANY
export const showErrors = (error) => {
    return {
      type: SHOW_ERRORS,
      payload: error
    }
  };

