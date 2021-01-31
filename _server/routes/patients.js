const knex = require('../knex')

const patientsAll = async (req, res) => {
    const patients = await knex('patients');
    res.json(patients);
};

const patientsOne = async (req, res) => {
    const { patientId } = req.params;

    if (!patientId || patientId <= 0) {
        res.json({
            success: false,
            error: 'Invalid ID!'
        });
        return;
    }

    const patient = await knex('patients').where('id', patientId);

    if (!patient || patient.length === 0) {
        res.json({
            success: false,
            error: 'There is no patient with that ID!'
        });
        return;
    }

    res.json({
        success: true,
        data: patient[0]
    });
};

const patientsCreate = async (req, res) => {
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

};

const patientsDelete = async (req, res) => {
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
};

module.exports = {
    all: patientsAll,
    one: patientsOne,
    create: patientsCreate,
    delete: patientsDelete
}