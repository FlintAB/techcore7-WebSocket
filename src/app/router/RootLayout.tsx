import { Outlet } from "@tanstack/react-router";
import { Header } from "@/app/components/Header/Header";

export const RootLayout = () => (
   <>
      <Header />
      <Outlet />
   </>
)