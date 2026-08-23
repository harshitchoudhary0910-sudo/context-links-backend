import rateLimit from 'express-rate-limit';
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    success: false,
    message: "Too many login attempts. Try again later."
  }
});

export const linkLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    limit: 10,
   keyGenerator: (req) => req.userId,
    message: { message: "Daily limit of 10 links reached, try tomorrow" }
});

