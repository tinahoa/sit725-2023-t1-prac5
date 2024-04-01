const express = require('express');
const app = express();
let PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log("Listening on " + PORT);
})


app.use(express.static(__dirname + '/public/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cardList = [
    { title: 'Kitten 1', image: 'images/kitten.jpeg', link: '#', description: 'Description for kitten 1' },
    { title: 'Kitten 2', image: 'images/kitten2.jpeg', link: '#', description: 'Description for kitten 2' },
    { title: 'Kitten 3', image: 'images/kitten3.jpeg', link: '#', description: 'Description for kitten 3' }
];
app.get('/api/cards', (req, res) => {
    res.json({ statusCode: 200, cards: cardList, message: "Success" })
})