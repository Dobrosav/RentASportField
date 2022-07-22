import expreess from 'express'
import { UserControler } from '../controllers/user.controller';
const userRouter = expreess.Router();

userRouter.route('/login').post(
    (req,res)=>new UserControler().login(req,res)
)
userRouter.route('/register').post(
    (req,res)=>new UserControler().register(req,res)
)
userRouter.route("/kime").get(
    (req,res)=>new UserControler().getAllUser(req,res)
)
export default userRouter;