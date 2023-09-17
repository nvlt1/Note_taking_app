const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile("index.html", {root: __dirname})
});

app.use(express.static(__dirname));

app.listen(3000, () => {
    console.log("Server on 3000");
})