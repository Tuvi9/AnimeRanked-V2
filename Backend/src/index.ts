const express = require('express');
import { Request, Response } from 'express';
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/create', (req: Request, res: Response) => {
    console.log('Received form data:', req.body);
    res.json({ message: 'Form submitted successfully' });
});

app.listen(port, () => {
    console.log(port);
});