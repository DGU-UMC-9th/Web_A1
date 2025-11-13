import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

// publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
];

// protectedRoutes : 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [{ path: "my", element: <MyPage /> }],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
