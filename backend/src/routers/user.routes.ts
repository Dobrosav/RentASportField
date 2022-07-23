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
userRouter.route("/getInvalidUser").get(
    (req,res)=>new UserControler().getInvalidUsers(req,res)
)
userRouter.route("/confirm").post(
    (req,res)=>new UserControler().confirm(req,res)
)
userRouter.route("/delete").post(
    (req,res)=>new UserControler().delete(req,res)
)
userRouter.route("/changePasword").post(
    (req,res)=>new UserControler().changePassword(req,res)
)
userRouter.route("/getUsePerUsername").post(
    (req,res)=>new UserControler().getUserPerUsername(req,res)
)
export default userRouter;