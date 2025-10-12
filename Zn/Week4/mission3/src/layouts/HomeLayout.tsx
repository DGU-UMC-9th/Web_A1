import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav>여기에는 네비바가 있습니다.</nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};

export default HomeLayout;
