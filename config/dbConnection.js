
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect('mongodb://localhost:27017/mycontactbackend', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database connected', connect.connection.host);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;

    








// const mongoose = require("mongoose");


// const connectDb = async ()=>{
 
//     try{


//         const connect= await mongoose.connect(process.env.CONNECTION_STRING);
//         console.log("database connected",
//         // connect.connection.host,
//         // connect.connection.host
//         )

//     }catch(err){
//         console.log(err)

// }
// }

// database connection


module.exports=connectDb;

 