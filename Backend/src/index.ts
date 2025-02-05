import { Request, Response } from 'express';
const express = require('express');
const cors = require('cors');
const app = express();
const routes = './Routes/signUp.ts'
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/', routes)

app.listen(port, () => {
    console.log(port);
});