import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import entityRoutes from './routes/entityRoutes.js';
import userEntityRoutes from './routes/userEntityRoutes.js';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.get("/", (req,res)=>{
    res.send("Hello World!");
});

//Routes
app.use('/entities', entityRoutes);
app.use('/users', userRoutes);
app.use('/user-entities', userEntityRoutes);

//LE PORT
const PORT = process.env.PORT || 8787;
app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});