import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import sportObjectRouter from './routers/sportobject.routes';;

const app = express();
app.use(cors());
app.use(bodyParser.json());;

mongoose.connect('mongodb://localhost:27017/diplomski');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connection ok')
})
const router = express.Router();
router.use('/user',userRouter)
router.use('/sportObject',sportObjectRouter)
//router.use('/ads',adsRouter)
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));