const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 text-white text-center px-4">
      <h1 className="text-9xl font-extrabold mb-4 drop-shadow-lg">404</h1>
      <h2 className="text-3xl font-bold mb-2">페이지를 찾을 수 없습니다</h2>
      <p className="text-lg text-blue-100 mb-8">
        요청하신 페이지가 존재하지 않거나, 주소가 잘못되었습니다.
      </p>

      <a
        href="/"
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-all duration-200 shadow-md"
      >
        홈으로 돌아가기
      </a>
    </div>
  );
};

export default NotFoundPage;