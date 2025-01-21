const jwt = require('jsonwebtoken')

// admin authAdmin
const authAdmin = async(req,res,next)=>{
    try {
        
        const {admToken} = req.headers
        if (!admToken){
            return res.json({success:false,message:'Not authorised Login Again'})

        }
        const token_decode = jwt.verify(admToken,process.env.JWT_PASSWORD)

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:'Not authorised Login Again'})
        }

        next()

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

module.exports = authAdmin;