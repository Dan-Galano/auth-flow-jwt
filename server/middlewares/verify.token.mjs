import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let accessToken = req.cookies.accessToken;

  if (!accessToken) {
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer ')){
      accessToken = authHeader.split(' ')[1];
    }
  }

  if (!accessToken) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    (error, decodedToken) => {
      if (error) {
        console.log("Token error:", error);
        return res
          .status(403)
          .json({ message: "Access denied. Invalid token." });
      }

      req.user = decodedToken; // attach user info to request
      next();
    }
  );
};

export default verifyToken;
