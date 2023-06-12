const express = require('express') ;
const mongoose = require('mongoose') ;
const dotenv = require('dotenv').config() ;
const UserItem = require('./Model/User') ;

// DataBase connect 
const app = express();

// use express.json() to get data into json  format
app.use(express.json());

// port 
 const PORT  = process.env.PORT || 4000 ;

 // Mongo db connect 
 mongoose.connect(process.env.DATABASE_URL)
 .then(()=> console.log(("database connect with successful")))
 .catch(err => console.log(err))

//GET :  RETURN ALL USERS 
// http://localhost:4000/all user
 app.get('/all', async(req, res)=>{
    try {
        const user = await UserItem.find()
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({message: 'no user'})
        
    }

 })

 //POST :  ADD A NEW USER TO THE DATABASE 
 //  http://localhost:4000/new
 app.post('/new' , async(req, res)=>{
    try {
        const newUser = new UserItem({
            name:req.body.name,
            email:req.body.email , 
            age:req.body.age
        })
        // save this user
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json(error)
        
    }
   
 })

 //PUT : EDIT A USER BY ID 
 //  http://localhost:4000/put/:id
 app.put('/put/:id', async(req, res)=>{
    try {
        const updateUser = await UserItem.updateOne({
            _id:req.params.id,
        },
        {name:req.body.name})
        .then(res.send('user updated with  successfuly'))
    } catch (error) {
        res.status(500).json(error) 
    }}
    
    );

// DELETE : REMOVE A USER BY ID 
// http://localhost:4000/delete/:id
app.delete('/delete/:id' , async(req, res)=>{
    try {
        await UserItem.deleteOne({_id:req.params.id})
        res.status(200).json({message: 'user deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
}

)

// add port and connect to server
app.listen(PORT , ()=>console.log('server started'))