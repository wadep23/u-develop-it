const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// database route
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Alkaline132!',
        database: 'election'
    },
    console.log(`Now connected to the election database!`)
);

// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// Delete candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err){
//         console.log(err);
//     }
//     console.log(result);
// });

// Create candidate, must use array since placeholders must match values of params
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//     VALUES (?, ?, ?, ?)`;
//     const params = [1, 'Ronald', 'Firbanks', 1];
    
//     db.query(sql, params, (err, result) => {
//         if(err){
//             console.log(err);
//         }
//         console.log(result);
//     });

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// Default error 404 response for undefined route
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Now connected to The Matrix via ${PORT}`);
});