import passport from "passport";

export const authRoutes = (app: any) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req: any, res: any) => {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req: any, res: any) => {
    req.logout((err: any) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).send("Logout failed");
      }
      res.send(req.user);
    });
    res.redirect("/");
  });

  app.get("/api/current_user", (req: any, res: any) => {
    res.send(req.user);
  });
};
