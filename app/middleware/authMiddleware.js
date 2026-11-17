import { createRemoteJWKSet, jwtVerify } from "jose";

// Create once, not per request, so the keys are cached
const JWKS = createRemoteJWKSet(new URL("http://localhost:3000/api/auth/jwks"));

const authVerify = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ status: "error", message: "Access denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: process.env.BETTER_AUTH_URL,
      audience: process.env.BETTER_AUTH_URL,
    });

    req.user = { id: payload.id ?? payload.sub, ...payload };
    next();
  } catch (error) {
    console.error("Token validation failed:", error);
    return res.status(401).json({ status: "error", message: "Invalid token" });
  }
};

export default authVerify;
