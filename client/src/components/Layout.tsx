import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container py-5" style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
    </>
  );
}
