const express = require('express');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const multer = require('multer');
const mailTo = require('./libs/mail');
const config = require('./config.json');
const upload = multer();
const adapter = new FileSync('database/db.json');
const db = low(adapter);
const app = express();


app.use(express.static(path.join(__dirname, '../dist')));

app.post('/send', upload.none(), function (req, res) {
    mailTo(config.mail, req.body, (error, message) => {
        if (error) {
            return res.send({ message: error.message });
        }

        res.send({ message });
    });
});

app.get('/reviews/:id', function (req, res) {
    const id = req.params.id;
    const user = db.get('reviews')
        .find({ id: Number(id) })
        .value();

    res.send({
        name: user.name,
        content: user.text
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});