import jwt from "jsonwebtoken"
const secretKey = process.env.SECRET;

export const requireAdmin = async (req, res, next) => {
    try {
        if(req.role !== "admin"){
            res.status(403).json({message: "No tienes suficientes permisos"});
        }else{
            next();
        }
    } catch (err) {
        errorHandler(err)
    }
}

export function verifyToken(req, res, next) {
//   const header = req.header("Authorization") || "";
//   const token = header.split(" ")[1];

  const token = req.cookies.galleta;

  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.name = payload.name;
    req.role = payload.role;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

