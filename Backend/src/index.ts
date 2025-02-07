import express from 'express';
import cors from 'cors';
import auth from './Routes/auth';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', auth);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});