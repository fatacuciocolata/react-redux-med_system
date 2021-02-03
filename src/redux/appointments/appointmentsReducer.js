import { FETCH_APPOINTMENTS , CREATE_APPOINTMENT, DELETE_APPOINTMENT, SHOW_ERRORS } from "./appointmentsActions.js"

const initialState = { 
    loading: true,
    appointments: [],
    errors: ""
}

export default function appointmentsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_APPOINTMENTS:
            console.log("from fetch", state)
            return {
                ...state,
                loading: false,
                appointments: action.payload,
            }
        case CREATE_APPOINTMENT:
            return {
                ...state,
                loading: false,
                appointments: [...state.appointments, action.payload]
            }
        case DELETE_APPOINTMENT:
            const { id } = action.payload;
            console.log("in reducer")
            return { 
                ...state, 
                loading: false,
                appointments: [...state.appointments.filter(i => i.id !== id)]
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