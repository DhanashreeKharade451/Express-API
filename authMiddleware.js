import jwt from "jsonwebtoken"

const secret =process.env.JWT_SECRET;

export  function authMiddleware(req,res,next){
    try{
        let token = req.header.authorization;
        //console.log(token);

        // Remove the 'Bearer' at the front (ex: "Bearer ourtoken" --> "ourtoken")
        if (token){
            token = token.split(" ").pop().trim();
        }

       //check if user didn't send the token

    if (!token) {
      return res.status(401).json({ message: "No token found!" });
    }

    //verify the token and give us the payload
    const {data} = jwt.verify(token,secret);

    //create new property on our request object (req.user) with our payload value
req.user =data;


    }catch(err){
 return res.status(401).json({ message: "Invalid token!" });s
    }
}