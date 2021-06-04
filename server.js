const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Default error 404 response for undefined route
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Now connected to The Matrix via ${PORT}`);
});