const jwt = require('jsonwebtoken');

// JWT header,payload,firma
const generarJWT = (uid='') =>{
    return new Promise((resolve,reject)=>{
        const payload = {uid}; // payload

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        },(err,token)=>{
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })

    })
}

module.exports = {
    generarJWT
}