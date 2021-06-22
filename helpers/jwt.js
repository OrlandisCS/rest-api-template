const jwt = require('jsonwebtoken')
const generarJWT = (uid = '')=>{
return new Promise((resolve, reject)=>{
    const payload = {uid}
     jwt.sign(payload, process.env.FIRMA,{
         expiresIn: '10H',
     }, (err,token)=>{
         if(err){
             console.log(err)
             reject('Error al generar el token')
         }else{
             resolve(token)
         }
     })
} )
}
module.exports = {
    generarJWT
}