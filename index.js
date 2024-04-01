const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://tienhtvn:Tien2000@cluster0.tcyamxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let collection;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Cat');
        // console.log(collection);
    } catch (ex) {
        console.error(ex);
    }
}

runDBConnection();

let PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log("Listening on " + PORT);
})


app.use(express.static(__dirname + '/public/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// const cardList = [
//     { title: 'Kitten 1', image: 'images/kitten.jpeg', link: '#', description: 'Description for kitten 1' },
//     { title: 'Kitten 2', image: 'images/kitten2.jpeg', link: '#', description: 'Description for kitten 2' },
//     { title: 'Kitten 3', image: 'images/kitten3.jpeg', link: '#', description: 'Description for kitten 3' }
// ];
async function getCards() {
    try {
        const cards = await collection.find().toArray();
        return cards;
    } catch (ex) {
        console.error("Error fetching cards:", ex);
        return [];
    }
}
app.get('/api/cards', async (req, res) => {
    let cardList = await getCards();
    res.json({ statusCode: 200, cards: cardList, message: "Success" })
})

app.post('/api/submitForm', async (req, res) => {
    try {
        const { title, image, description } = req.body; // Assuming the form sends these fields

        // Insert the form data into the MongoDB collection
        await collection.insertOne({ title, image, description });

        res.json({ statusCode: 200, message: "Form submitted successfully" });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
});