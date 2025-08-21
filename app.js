const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// === Routes: ===
// ===============
// app.use(require('./routes/contact-form-routes.js'));

// === Frontend: ===
// =================

app.use(express.static(path.join(__dirname, 'public', 'browser')));
// app.use((req, res, next) => {
//     res.status(404).send({ message: 'API route not found' }); // Or a custom 404 message
// });
app.get('*angular', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'browser', 'index.html'))
});

// === Server: ===
// ===============

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});