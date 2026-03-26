import express from 'express'


const app = new express();
const port = process.env.PORT || 3000

//variable for secret
const secret = process.env.JWT_SECRET


//token validity
const expiration = '2h'

app.use(express.json());

//register /signup route
app.post('/api/users/register', async(req, res) => {
try{
   
}catch(error){

}

})





app.listen(port, () =>
console.log(`Listening on port: http://localhost:${port}`), 
)