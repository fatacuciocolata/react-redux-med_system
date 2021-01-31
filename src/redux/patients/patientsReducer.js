import { FETCH_PATIENTS , CREATE_PATIENT, DELETE_PATIENT, SHOW_ERRORS, SINGLE_PATIENT } from "./patientsActions"

const initialState = { 
    loading: true,
    patients: [],
    errors: ""
}

export default function patientsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PATIENTS:
            console.log("from fetch", state)
            return {
                ...state,
                loading: false,
                patients: action.payload,
            }
        case CREATE_PATIENT:
            return {
                ...state,
                loading: false,
                patients: [...state.patients, action.payload]
            }
        case DELETE_PATIENT:
            const { id } = action.payload;
            console.log("id", id)
            return { 
                ...state, 
                loading: false,
                patients: [...state.patients.filter(i => i.id !== id)]
            };
        case SHOW_ERRORS:
            return {
                ...state, 
                loading: false,
                errors: action.payload
            }
        default:
            return state;
    }
}