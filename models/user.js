import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username:{
        
        type: String,
    required: true,
    unique: true,
    trim: true,
    },
    email: {
         type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
         type: String,
    required: true,
    minlength: 8,
    },

});

//set up pre-save middleware to create password
userSchema.pre("save", async function(next){
     //'this' refers to the document we are trying to save to the database
    if(this.isNew || this.isModified("password")){

        //no of times hash algorithms run
        const saltRounds= 10;
       // store the hashed password value into the password field
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    // take the plain text password, hash it and compare it with the saved password in our database
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;