import express from 'express';
import cors from 'cors';
import signUpRouter from './Routes/signUp';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/', signUpRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});