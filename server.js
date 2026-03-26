import express from 'express'
import User from './models/user';


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
     res.status(201).json(user);


}catch(error){

}

})





app.listen(port, () =>
console.log(`Listening on port: http://localhost:${port}`), 
)