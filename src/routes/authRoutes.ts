import express, { type Request, type Response } from "express";
import passport from "passport";

const router = express.Router();

router;
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    res.redirect("/");
  }
);

router.get("/api/logout", (req: Request, res: Response) => {
  req.logout((err: any) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Logout failed");
    }
  });
  res.redirect("/");
});

router.get("/api/current_user", (req: Request, res: Response) => {
  res.send(req.user);
});

export default router;
