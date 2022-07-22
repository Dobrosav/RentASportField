import * as express from 'express'
import User from '../models/user';

export class UserControler {
    login=(req:express.Request, res:express.Response)=>{
        let username=req.body.korime;
        let password=req.body.lozinka;
        User.findOne({'korime': username, 'lozinka': password, 'valid':true}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    register=(req:express.Request, res:express.Response)=>{
        let user=new User(req.body)
        user.save().then(
            user=>{
                res.status(200).json({'message': 'user added'});
            }).catch(err=>{
                res.status(400).json({'message': 'error'})
            }
        )
    }
    getAllUser=(req:express.Request, res:express.Response)=>{
        User.find({},(err,users)=>{
            if(err) console.log(err)
            else res.json(users)
        })
    }   
}