const express = require('express');
const app = express();
const cors = require('cors');
const Invoice = require('./model/Invoice')

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/invoiceDetails', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log('db connected');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}


app.use(cors());
app.use(bodyParser.json());


const invoiceRoutes = require('./routes/invoice');
app.use('/api', invoiceRoutes);

app.listen(5001, function () {
    console.log("Express App running at http://127.0.0.1:5001/");
});