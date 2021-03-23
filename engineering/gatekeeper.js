// const fs = require('fs');
// const jwt = require('jsonwebtoken');
// const publicKey = fs.readFileSync('public.key', 'utf8');
// const expiresIn = require('../config').TOKEN_EXPIRE;
// const algorithm = require('../config').TOKEN_ALGORITHM;

const response = (res, code, message) => {
  return res.status(code).send(message);
};

// const verifyToken = (token) => {

//     return new Promise((resolve, reject) => {

//         var verifyOptions = {
//             expiresIn: expiresIn,
//             algorithm: algorithm
//         }
//         jwt.verify(token, publicKey, verifyOptions, (err, data) => {
//             if (err) {
//                 console.log("error gate keeper=>", err)
//                 resolve(false);
//             } else {
//                 // console.log("Entered gate keeper")
//                 resolve(true);
//             }
//         })

// })
// }

module.exports.response = response;
// module.exports.verifyToken = verifyToken;
