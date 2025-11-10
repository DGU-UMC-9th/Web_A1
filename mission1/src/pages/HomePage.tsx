import useGetLpList from "../hooks/queries/useGetLpList";
import { useState } from "react";
import { PAGINATION_ORDER } from "../enums/common"; // ✅ enum import 추가

const HomePage = () => {
  const [search, setSearch] = useState<string>("예제");

  // ✅ 쿼리 파라미터 설정
  const cursor = 0;
  const order = PAGINATION_ORDER.desc; // ✅ enum 값으로 변경
  const limit = 10;

  // ✅ useGetLpList는 객체 하나만 인자로 받는다
  const { data, isPending, isError } = useGetLpList({
    cursor,
    search,
    order,
    limit,
  });

  if (isPending) {
    return <div className="mt-20">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20">Error...</div>;
  }

  return (
    <div className="mt-20">
      <input
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />

      {Array.isArray(data) &&
        data.map((p) => (
          <h1 key={p.id}>{p.title}</h1>
        ))}
    </div>
  );
};

export default HomePage;
