import express, { Router } from 'express';

import {routes} from "./routes";

const app = express();

app.use(routes);

app.listen(3333, () => {
    console.log('Server iniciado na porta 3333')
});