import express from "express"
import userRouter from "./routes/users.js"

const app = express()
const port = 3008

app.use(userRouter);
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Rodando")
})

app.listen(port, () =>{
    console.log(`Porta ${port} ligada`)
})