import { combineReducers } from "redux";
import patientsReducer from "./patients/patientsReducer";
import appointmentsReducer from "./appointments/appointmentsReducer";

const rootReducer = combineReducers({
  patients: patientsReducer,
  appointments: appointmentsReducer
});

export default rootReducer;
