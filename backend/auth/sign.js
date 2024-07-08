import jwt from 'jsonwebtoken'

async function signer(data){
    return jwt.sign(data,process.env.secret,{"expiresIn":"1h"});
}

export default signer;