import React, { useState, useEffect } from "react";

// 페이지 컴포넌트들
function Home() {
  return <h2>Home Page</h2>;
}
function Page1() {
  return <h2>Page1</h2>;
}
function Page2() {
  return <h2>Page2</h2>;
}

// 라우터 컴포넌트
function App() {
  const [path, setPath] = useState(window.location.pathname);

  // 뒤로가기/앞으로가기(popstate) 이벤트 처리
  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // SPA 네비게이션 함수
  const navigate = (to) => {
    window.history.pushState({}, "", to); // URL 변경
    setPath(to); // 상태 업데이트 → 리렌더링
  };

  // path에 따라 렌더링할 컴포넌트 결정
  let Component;
  if (path === "/page1") Component = Page1;
  else if (path === "/page2") Component = Page2;
  else Component = Home;

  return (
    <div>
      <nav style={{ marginBottom: "1rem" }}>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/page1")}>Page1</button>
        <button onClick={() => navigate("/page2")}>Page2</button>
        {" | "}
        <button onClick={() => window.history.back()}>◀ 뒤로가기</button>
        <button onClick={() => window.history.forward()}>앞으로가기 ▶</button>
      </nav>
      <hr />
      <Component />
    </div>
  );
}

export default App;
