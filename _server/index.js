const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

var knex = require('knex')({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: "./db.sqlite"
    }
});

const initDefaultTables = async () => {

    const patientsExists = await knex.schema.hasTable('patients');
    const apptsExists = await knex.schema.hasTable('appointments');

    if (!patientsExists) {
        await knex.schema.createTable('patients', function (table) {
            table.increments('id').primary();
            table.string('name', 255);
            table.text('allergies');
            // table.integer('author_id');
        });
    }

    if (!apptsExists) {
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

app.get('/patients', async (req, res) => {
    const patients = await knex('patients');
    // console.log(patients);
    res.json(patients);
});

// GET patient by id

app.get('/patients/:patientId', async (req, res) => {
    const { patientId } = req.params;

    if (!patientId || patientId <= 0) {
        res.json({
            success: false,
            error: 'ID invalid'
        });
        return;
    }

    const patient = await knex('patients').where('id', patientId);

    if (!patient || patient.length === 0) {
        res.json({
            success: false,
            error: 'Nu exista pacient cu id-ul respectiv'
        });
        return;
    }

    res.json({
        success: true,
        data: patient[0]
    });
});


// CREATE patient

app.post('/addPatient', async (req, res) => {
    const { name, allergies } = req.body;

    try {
        await knex('patients').insert({
            name,
            allergies
        })
        const results = await knex("patients").select("id").orderBy("id", "desc").limit(1)
        const id = results[0].id;
        
        res.json({
            success: true,
            id: id
        })
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            trace: err
        });
    }

});

// DELETE patient

app.delete('/patients/:patientId', async (req, res) => {
    const { patientId } = req.params;

    if (!patientId || patientId <= 0) {
        res.json({
            success: false,
            error: 'mesaju..'
        });
        return;
    }

    const patient = await knex('patients').where('id', patientId);


    if (!patient || patient.length === 0) {
        res.json({
            success: false,
            error: 'mesaju2..'
        });
        return;
    }

    await knex('patients').where('id', patientId).delete()

    res.json({
        success: true,
        id: patientId
    });
});

// # APPOINTMENTS ROUTES

app.get('/appointments', async (req, res) => {
    const appointments = await knex('appointments');
    // console.log(patients);
    res.json(appointments);
});


// CREATE appointment

app.post('/addAppointment', async (req, res) => {
    const { date, treatments, patientId } = req.body;

    try {
        await knex('appointments').insert({
            date,
            treatments,
            patientId
        })
        const results = await knex("appointments").select("id").orderBy("id", "desc").limit(1)
        const id = results[0].id;
        
        res.json({
            success: true,
            id: id
        })
    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            trace: err
        });
    }

});


app.listen(port, () => {
    initDefaultTables();
    console.log(`Example app listening at http://localhost:${port}`)
});
