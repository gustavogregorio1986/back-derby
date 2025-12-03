import express from 'express';
import router from './routes';

const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());

// Usa as rotas definidas
app.use(router);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});