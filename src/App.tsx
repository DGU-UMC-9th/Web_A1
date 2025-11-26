import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeLayout from "./layouts/HomeLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage.tsx";
import LpDetailPage from "./pages/LpDetailPage.tsx";
import "./App.css";

export const queryClient = new QueryClient();

// ✅ 로그인 필요 없는 공개 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];

// ✅ 로그인 필요한 보호 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "my", element: <MyPage /> },
      { path: "lp/:lpId", element: <LpDetailPage /> }, // ✅ LP 상세 보호 페이지
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;