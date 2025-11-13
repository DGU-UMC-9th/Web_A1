import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [asc, setAsc] = useState(true);
  const currentOrder = asc ? PAGINATION_ORDER.asc : PAGINATION_ORDER.desc;
  const navigate = useNavigate();

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList({
    limit: 10,
    search,
    order: currentOrder,
  });

  const { ref, inView } = useInView({ threshold: 0 });

  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isFetching) setShowSkeleton(true);
    else timer = setTimeout(() => setShowSkeleton(false), 1000);
    return () => clearTimeout(timer);
  }, [isFetching]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-full text-4xl">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-full text-4xl">
        Error
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6 relative">
      {/* ✅ 정렬 버튼 */}
      <div className="flex justify-end items-center mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors duration-200 ${
              !asc
                ? "bg-white text-black"
                : "bg-black text-white border hover:bg-gray-600"
            }`}
            onClick={() => setAsc(false)}
          >
            오래된 순
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors duration-200 ${
              asc
                ? "bg-white text-black"
                : "bg-black text-white border hover:bg-gray-600"
            }`}
            onClick={() => setAsc(true)}
          >
            최신 순
          </button>
        </div>
      </div>

      {/* ✅ LP 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}

        {/* ✅ 스켈레톤 */}
        {showSkeleton && <LpCardSkeletonList count={20} />}
      </div>

      {/* ✅ 트리거 */}
      <div ref={ref} className="h-2"></div>

      {/* ✅ 플로팅 버튼 (복구됨) */}
      <button
        onClick={() => navigate("/new-lp")}
        className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition"
      >
        <Plus size={28} />
      </button>
    </div>
  );
};

export default HomePage;