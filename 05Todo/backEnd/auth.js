const jwt = require('jsonwebtoken');
const JWT_SECRET = 'askdfoilau1ehbeiub1323akjhdgf32kiahgbkicuehbi3534cuahbeoifg56oicuabgwoeiucgobweutifwqauygekcauyhekifugankw985693847triuybctvoiuyobw8e';

const auth = (req, res, next)=> {
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(error){
        console.log(error)
        return res.status(401).json({message: "Unauthorized"})
    }
}



module.exports = {
    JWT_SECRET, auth
}

