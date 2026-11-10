export const verifyAPI = async (req, res, next) => {
  const authHeader = req.headers.authentication;

  if (!authHeader) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }

  next();
};
