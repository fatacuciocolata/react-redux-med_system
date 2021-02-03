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
    await knex.raw('PRAGMA foreign_keys = ON');

    if (!patientsExists) {
        await knex.schema.createTable('patients', function (table) {
            table.increments('id').primary();
            table.string('name', 255);
            table.integer('birthday');
            table.string('email', 255);
            table.string('phone', 255);
            table.text('allergies');
        });
    }

    if (!appointmentsExists) {
        await knex.schema.createTable('appointments', function (table) {
            table.increments('id').primary();
            table.integer('date');
            table.text('time');
            table.text('treatments').nullable();
            table.integer('patientId');
            table.integer('patientId').unsigned() // Add a foreign key (FK)...
            .references('patients.id') // ...which references Article PK.
            .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
            .onDelete('CASCADE') // If Article is deleted, delete Comment as well.
        });
    }
};

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// # PATIENTS ROUTES
app.get('/patients', patients.all);
app.get('/patients/:id', patients.one);
app.post('/addPatient', patients.create);
app.delete('/patients/:id', patients.delete);

// # APPOINTMENTS ROUTES
app.get('/appointments', appointments.all);
app.get('/appointmentsByPatientId/:id', appointments.allByPatientId);
app.get('/appointments/:id', appointments.one);
app.post('/addAppointment', appointments.create);
app.delete('/appointments/:id', appointments.delete);

app.listen(port, () => {
    initDefaultTables();
    console.log(`Example app listening at http://localhost:${port}`)
});
