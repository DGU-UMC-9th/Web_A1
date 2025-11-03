import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage.tsx';
import HomeLayout from './layouts/HomeLayout.ts';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage.tsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout.tsx';


// publicRoutes: 인증 없이 접근 가능한 루트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true,element: <HomePage />,},
      {path: "login", element: <LoginPage />},
      {path: "signup", element: <SignupPage/>},
    ],
  },

];



// protectedRoutes: 인증 후 접근 가능한 루트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,    
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];





const router = createBrowserRouter([...publicRoutes]);


function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;