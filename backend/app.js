const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

const username = 'roaljhn369';
const password = '1QGTZR5HjqgOzNBa';

const dbURI = `mongodb+srv://${username}:${password}@cluster0.hruwk.mongodb.net/HarmonyHub?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:4000', 
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));

const userRoute = require('./routes/userRoute');

app.use('/users', userRoute);

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected...');

        app.listen(5000, () => {
            console.log('app is working properly...');
        })
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

connectDB();

