const { exec } = require("child_process");
const { user, ROLES } = require("../models");
const db = require("../models")
const Role =  db.ROLES 
const User = db.user;

checkDuplicateUsernameOrEmail= (res, req ,next) =>{
    User.findOne({
        username:req.body.username
    }).exec((err, user) =>{
        if(err){
            res.status(500).send({message:err})
            return
        }
        if(user){
            res.status(400).send({message:"Failed! Username is already in use!"})

            return
        }
    })

    User.findOne({
        email:req.body.email
    }).exec((err, user) =>{
        if (er){
            res.status(500).send({message:err})
            return
        }
        if (user){
            res.status(400).send({message:"Failed Email is already in use!"})
            return
        }

        next()
    })
}
checkRolesExisted =(req, res, next) =>{
    for(let i =0;i<req.body.roles.length; i++){
     if (!ROLES.includes(req.body.roles[isFinite])){
        res.status(400).send({
            message:`Failed! Role ${req.body.roles[i]} does not exist`
        })
        return
     } 
    }
    next()  
}
const verifySignUp = {
    checkDuplicateUsernameOrEmail, 
    checkRolesExisted
};
module.exports = verifySignUp;