import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());

// Habilita CORS (permite requisições do frontend em outra porta)
app.use(cors());

// Usa as rotas definidas
app.use(router);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/users`);
});