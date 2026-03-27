import dotenv from "dotenv"
import express from 'express'
import User from './models/user.js'

import jwt from 'jsonwebtoken'
import { authMiddleware } from "./authMiddleware.js"

dotenv.config();


import './db.js'

const app = new express();
const port = process.env.PORT || 3000

//variable for secret
const secret = process.env.JWT_SECRET


//token validity
const expiration = '2h'

app.use(express.json());

//register /signup route
app.post('/api/users/register', async (req, res) => {
try{
    const {email} = req.body;

    // Check if user exists
    const existingUser = await User.findOne({email});
    if (existingUser){
        return res.status(400).json({error: 'A user with this email already exists'});
    }
     const user = await User.create(req.body);
     console.log(user);
     res.status(201).json({
        _id: user._id,
  username: user.username,
  email: user.email
     });
     
}catch(error){
     console.log(error);
    res.status(400).json({ message: error.message });
}

});

//login
app.post("/api/users/login", async(req,res) =>{
    try{
        //find the user based off the email provided
        const user =await User.findOne({email: req.body.email});

        //check if we were not able to find the document based off the email
        if (!user){
            return res.status(400).json({message: "Incorrect email or password"})
        }
         //check the password that was entered
        const correctPassword = await user.isCorrectPassword(req.body.password);

        //check if the password is not correct (when hashed, it did not match the saved hashed password)
          if (!correctPassword) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    //orherwise create a JWT for the user using the jsonwebtoken(c reating payload token)
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email
    }

    //generate the token
    const token = jwt.sign(payload, secret, {expiresIn: expiration})
    console.log(token);
     res.status(200).json({ 
        token, 
        user: payload,
    });

    }catch(error){
        console.log(error);
    res.status(400).json({ message: "Something went wrong" });
    }
});


app.use(authMiddleware);

//access this route once the middleware verified the token
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () =>
console.log(`Listening on port: http://localhost:${port}`), 
)