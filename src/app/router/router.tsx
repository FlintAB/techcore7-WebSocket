import { createRootRoute, createRouter, createRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage/ProductsPage";
import { RootLayout } from "./RootLayout";

const rootRoute = createRootRoute({
   component: () => <RootLayout />
})

const indexedRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/',
   beforeLoad: () => {
      throw redirect(({
         to: '/products'
      }))
   }
})

const loginRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/login',
   component: () => <LoginPage />,
})

const productsRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/products',
   component: () => <ProductsPage />,
})

const routeTree = rootRoute.addChildren([
   indexedRoute,
   loginRoute,
   productsRoute,
])

export const router = createRouter({ routeTree })