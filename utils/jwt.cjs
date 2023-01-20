const jwt = require("jsonwebtoken")

const {sign,verify} = jwt
const secret = "arnab"
function createJWT(payload){
    return sign(payload,secret)
}

function checkJWT(token){
    return verify(token,secret)
}
console.log(checkJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2EyY2Y3ZjNkYmMxNThjMTE0NTMxYSIsImlhdCI6MTY3NDE5NDE2OH0.L95bWfSHP4_npDCRLWp7mo_E4dPsTv6I-17WZNb_z-4"));
module.exports={checkJWT,createJWT}