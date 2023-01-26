import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  const JWT_SECRET = process.env.JWT_SECRET;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.userId = decoded.id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа",
    });
  }
};
