import jwt from 'jsonwebtoken'

async function verify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}

function validate(req,res,next){
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(400).send('Token is required');
    }
    const token = authHeader.split(' ')[1];
    verify(token)
        .then(decoded => {
            req.user = decoded;
            next();
        })
        .catch(err => {
            res.status(401).send('Invalid token: ' + err.message);
        });
}

export default validate;