import { checkJWT } from "../utils/jwt.cjs";
export default function checkToken(req, res, next) {
  const { token } = req.headers;
  if (!token) return res.status(403).json({ status: "No token found" });
  try {
    const id = checkJWT(token);
    req["access-token"] = id;
    next();
  } catch (error) {
    res.status(403).json({ status: error.message });
  }
}