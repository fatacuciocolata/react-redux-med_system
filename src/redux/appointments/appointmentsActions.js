import axios from "axios"

export const FETCH_APPOINTMENTS = "FETCH_APPOINTMENTS";
export const CREATE_APPOINTMENT = "CREATE_APPOINTMENT";
export const DELETE_APPOINTMENT = "CREATE_APPOINTMENT"

export const SHOW_ERRORS = "SHOW_ERRORS"

// FETCH APPOINTMENTS 
export const fetchAppointments = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:8000/appointments`)

  dispatch({
    type: FETCH_APPOINTMENTS,
    payload: res.data
  });
};

// CREATE NEW PATIENT
export const createAppointment = (data) => async (dispatch) => {
  const res = await axios.post(`http://localhost:8000/addAppointment`, data)
  const id = res.data.id         

  dispatch({
    type: CREATE_APPOINTMENT,
      payload: {
            id: id,
            ...data,
      }  });
};

// DELETE APPOINTMENT
export const deleteAppointment = (id) => async (dispatch) => {
  console.log("deleted appointment", id);
  await axios.delete(
    `http://localhost:8000/appointments/${id}`
  );

  dispatch({
    type: DELETE_APPOINTMENT,
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

