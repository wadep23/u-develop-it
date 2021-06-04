const mysql = require('mysql2');
const express = require('express');
const { result } = require('lodash');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');
const bodyParser = require('body-parser');

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

// select all from db
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success!',
            data: rows
        });
    });
});

// Select single cnadidate data
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success!',
            data: row
        });
    });
});

// Delete candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err){
            res.statusMessage(400).json({ error: res.message });
            return;
        }else if(!result.affectedRows){
            res.json({
                message: 'Candidate not found!'
            });
        }else{
            res.json({
                message: 'Deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
        
    });
});

// Create candidate, must use array since placeholders must match values of params
// uses req.body for data
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors){
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Success!',
            data: body
        });
    });
});

// Default error 404 response for undefined route
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Now connected to The Matrix via ${PORT}`);
});