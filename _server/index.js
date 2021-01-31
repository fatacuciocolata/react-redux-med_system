const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const knex = require('./knex')

// import routes
const patients = require('./routes/patients')
const appointments = require('./routes/appointments')

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

const initDefaultTables = async () => {

    const patientsExists = await knex.schema.hasTable('patients');
    const appointmentsExists = await knex.schema.hasTable('appointments');

    if (!patientsExists) {
        await knex.schema.createTable('patients', function (table) {
            table.increments('id').primary();
            table.string('name', 255);
            table.text('allergies');
        });
    }

    if (!appointmentsExists) {
        await knex.schema.createTable('appointments', function (table) {
            table.increments('id').primary();
            table.integer('date');
            table.text('treatments');
            table.integer('patientId');

            table.foreign('patientId').references('id').inTable('patients');
        });
    }
};

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// # PATIENTS ROUTES
app.get('/patients', patients.all);
app.get('/patients/:patientId', patients.one);
app.post('/addPatient', patients.create);
app.delete('/patients/:patientId', patients.delete);

// # APPOINTMENTS ROUTES
app.get('/appointments', appointments.all);
app.get('/appointments/:appointmentId', appointments.one);
app.post('/addAppointment', appointments.create);
app.delete('/appointments/:appointmentId', appointments.delete);

app.listen(port, () => {
    initDefaultTables();
    console.log(`Example app listening at http://localhost:${port}`)
});
