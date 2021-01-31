var knex = require('knex')({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: "./db.sqlite"
    }
});

module.exports = knex