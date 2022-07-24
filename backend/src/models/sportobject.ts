import mongoose from "mongoose";
const Schema=mongoose.Schema;

let SportObject=new Schema({
    id:{
        type:Number
    },
    naziv:{
        type:String
    },
    kategorija:{
        type:String
    },
    adresa:{
        type:String
    },
    grad:{
        type:String
    },
    telefon:{
        type:String
    },
    email:{
        type:String
    },
    korime:{
        type:String
    }
})
export default mongoose.model('SportObject',SportObject,'sportobjects')