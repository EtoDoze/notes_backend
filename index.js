import express from "express";
import cors from "cors";
import userRouter from "./routes/users.js";

const app = express();
const port = 3008;

app.use(cors()); // ✅ Aplicar CORS antes de todas as rotas
app.use(express.json()); // ✅ Aplicar JSON antes das rotas
app.use(userRouter);

app.get("/", (req, res) => {
    res.send("Rodando");
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
