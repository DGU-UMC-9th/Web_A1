// src/pages/HomePage.tsx
import { useEffect, useRef, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import ToggleButton from "../components/Buttons/ToggleButton";
import PlusButton from "../components/Buttons/PlusButton";
import PlusLpModal from "../components/Modals/PlusLpModal";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";
import useThrottle from "../hooks/useThrottle";

const THROTTLE_DELAY = 3000; // 3초

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

  const [asc, setAsc] = useState(true);
  const currentOrder = !asc ? PAGINATION_ORDER.asc : PAGINATION_ORDER.desc;

  const [open, setOpen] = useState(false);
  const handlePlusLp = () => setOpen(true);
  const onClose = () => setOpen(false);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedValue, currentOrder);

  // Intersection Observer
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // inView를 3초마다 업데이트하여 "이벤트 트리거"로 사용
  const throttledInView = useThrottle(inView, THROTTLE_DELAY);

  // 이전 상태 기억
  const prevThrottledRef = useRef(throttledInView);

  useEffect(() => {
    const prev = prevThrottledRef.current;

    const becameTrue = !prev && throttledInView;

    if (becameTrue && hasNextPage && !isFetching) {
      console.log("📦 fetchNextPage 호출됨:", new Date().toLocaleTimeString());
      fetchNextPage();
    }

    // 비교 값 갱신
    prevThrottledRef.current = throttledInView;
  }, [throttledInView, hasNextPage, isFetching, fetchNextPage]);

  // ⬇️ 여기서 핵심: inView가 true -> 잠시 후 다시 false로 되게 만들어줌
  // 그래야 다음 렌더에서 다시 true로 올라오며 트리거 발생
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        prevThrottledRef.current = false;
      }, 200); // 0.2초 뒤 강제 false

      return () => clearTimeout(timer);
    }
  }, [inView]);

  // 로딩 화면
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full text-4xl">
        Loading...
      </div>
    );
  }

  // 에러 화면
  if (isError) {
    return (
      <div className="flex justify-center items-center h-full text-4xl">
        Error
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <input
          className="w-2xl p-2 border-2 border-gray-400 bg-white text-black rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ToggleButton asc={asc} setAsc={setAsc} />

        {open && <PlusLpModal onClose={onClose} />}

        {/* LP 카드 목록 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lps?.pages
            ?.map((page) => page.data.data)
            ?.flat()
            ?.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
            ))}

          {isFetching && <LpCardSkeletonList count={20} />}
        </div>

        {/* 바닥 sentinel */}
        <div ref={ref} className="h-2"></div>
      </div>

      <PlusButton handlePlus={handlePlusLp} isOpen={open} />
    </>
  );
};

export default HomePage;
