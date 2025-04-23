import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
  return (
    <main className="bg-dark text-white" style={{ minHeight: "100vh" }}>
      <Header />
      <Outlet />
    </main>
  );
}
