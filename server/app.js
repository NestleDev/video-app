const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, '../dist')));

app.post('/send', function (req, res) {
    res.send({ message: "сообщение отправлено" });
});

app.get('/reviews/:id', function (req, res) {
    const id = req.params.id;

    res.send({ id });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});