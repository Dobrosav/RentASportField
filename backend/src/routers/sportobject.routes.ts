import expreess from 'express'
import { SportObjectController } from '../controllers/sportobject.controller'
const sportObjectRouter=expreess.Router()
sportObjectRouter.route("/getAllObjects").get(
    (req,res)=>new  SportObjectController().getAllObjects(req,res)
)
sportObjectRouter.route("/newObject").post(
    (req,res)=>new SportObjectController().insertNewObject(req,res)
)
sportObjectRouter.route("/getAllObjectsOfOwner").post(
    (req,res)=>new SportObjectController().getAllObjectOfOwner(req,res)
)
export default sportObjectRouter