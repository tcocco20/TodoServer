import type { Express, Request, Response } from "express";
import passport from "passport";

export const authRoutes = (app: Express) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req: Request, res: Response) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req: Request, res: Response) => {
    req.logout((err: any) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).send("Logout failed");
      }
    });
    res.redirect("/");
  });

  app.get("/api/current_user", (req: Request, res: Response) => {
    res.send(req.user);
  });
};
