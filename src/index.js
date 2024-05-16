import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8080);

import rootRouter from './routes/rootRouter.js'
app.use(rootRouter);



