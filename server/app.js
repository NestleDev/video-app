const express = require('express');
const path = require('path');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database/db.json')
const db = low(adapter)
const app = express();


app.use(express.static(path.join(__dirname, '../dist')));

app.post('/send', function (req, res) {
    res.send({ message: "сообщение отправлено" });
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