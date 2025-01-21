const mongoose = require('mongoose')

const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(res=>{
    console.log("Mongodb connected successfully with the server");
    
}).catch(err=>{
    console.log("database connction failed...");
    console.log(err);
    
    
})