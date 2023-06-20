const mongoose=require("mongoose")
const userSchema= mongoose.Schema({
   
        username: {
            type: String,
            require:[true,"please add the user name"]
        },
        email: {
            type: String,
            require:[true,"please add the user Email address"],
            unique:[true,"email address already taken"]
        },
        password: {
            type: String,
            require:[true,"please add the user password"]
        },
    }, 
    {
        timestamps: true,


})
module.exports=mongoose.model("User",userSchema);