const express = require('express');
const port = 3000;
const app = express();
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'my_app'
}

const mysql = require('mysql');
const connection = mysql.createConnection(config);

app.get("/", (req, res) => {
    let name = req.query.name;
    let sql = "INSERT INTO people(name) values(?)";

    connection.query(sql, [name ?? 'FullCycle']);

    connection.query("SELECT name FROM people", function (error, results, fields) {
        let listItems = []
        for (let result of results) {
            listItems.push(`<li>${result.name}</li>`);
        }
        const list = `
            <ul>
                ${listItems.join('')}
            </ul>
        `
        const output = `
            <h1>Full Cycle Rocks!</h1>
            ${list}
        `
        res.send(output);
    });

});

app.listen(port, () => {
    console.log(`Listen on port: ${port}`)
})