import { createRootRoute, createRouter, createRoute, redirect, Outlet } from "@tanstack/react-router";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage/ProductsPage";
import { RootLayout } from "./RootLayout";
import { useAuthStore } from "../../modules/auth/store/authStore";
import { CartPage } from "../../pages/CartPage/CartPage";
import { ProductDetailsPage } from "../../pages/ProductDetailsPage/ProductDetailsPage";

const rootRoute = createRootRoute({
   component: () => <RootLayout />
})

const indexedRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/',
   beforeLoad: () => {
      throw redirect({
         to: '/products'
      })
   }
})

const protectedRoute = createRoute({
   getParentRoute: () => rootRoute,
   component: () => <Outlet />,
   id: '_protected',

   beforeLoad: () => {
      const accessToken = useAuthStore.getState().accessToken

      if(!accessToken) {
         throw redirect({
            to: '/login'
         })
      }
   },

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

const productDetailsRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/products/$productId',
   component: () => <ProductDetailsPage />,
})

const cartRoute = createRoute({
   getParentRoute: () => protectedRoute,
   path: '/cart',
   component: () => <CartPage />,
})

const routeTree = rootRoute.addChildren([
   indexedRoute,
   loginRoute,
   productsRoute,
   productDetailsRoute,

   protectedRoute.addChildren([
      cartRoute,
   ]),
])

export const router = createRouter({ routeTree })