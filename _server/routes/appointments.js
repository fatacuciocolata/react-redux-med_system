const knex = require('../knex')

const appointmentsAll = async (req, res) => {
    const appointments = await knex('appointments');
    res.json(appointments);
}

const appointmentsOne = async (req, res) => {
    const { appointmentId } = req.params;

    if (!appointmentId || appointmentId <= 0) {
        res.json({
            success: false,
            error: 'Invalid ID!'
        });
        return;
    }

    const appointment = await knex('appointments').where('id', appointmentId);

    if (!appointment || appointment.length === 0) {
        res.json({
            success: false,
            error: 'There is no appointment with that ID!'
        });
        return;
    }

    res.json({
        success: true,
        data: appointment[0]
    });
};

const appointmentsCreate = async (req, res) => {
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

}

const appointmentsDelete = async (req, res) => {
    const { appointmentId } = req.params;

    if (!appointmentId || appointmentId <= 0) {
        res.json({
            success: false,
            error: 'Invalid ID!'
        });
        return;
    }

    const appointment = await knex('appointments').where('id', appointmentId);

    if (!appointment || appointment.length === 0) {
        res.json({
            success: false,
            error: 'There is no appointment with that ID!'
        });
        return;
    }

    await knex('appointments').where('id', appointmentId).delete()

    res.json({
        success: true,
        id: appointmentId
    });
};


module.exports = {
    all: appointmentsAll,
    one: appointmentsOne,
    create: appointmentsCreate,
    delete: appointmentsDelete
}