// src/components/Sidebar.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDeleteUser from "../hooks/mutations/useDeleteUser";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { mutate: deleteMutate, isPending } = useDeleteUser();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // 🔹 사이드바에서 "검색" 클릭 시:
  // 1) 홈("/")으로 이동
  // 2) 검색 인풋 포커스 이벤트 발행
  // 3) 사이드바 닫기
  const handleGoSearch = () => {
    navigate("/");

    // HomePage 쪽에서 이 이벤트를 듣고 검색 인풋에 focus 걸어줌
    setTimeout(() => {
      window.dispatchEvent(new Event("focus-search-input"));
    }, 0);

    onClose();
  };

  // '탈퇴하기' 버튼 → 확인 모달 열기
  const handleOpenConfirm = () => {
    setIsConfirmOpen(true);
  };

  // 모달에서 '예' 클릭 시 탈퇴
  const handleConfirmDelete = () => {
    deleteMutate(undefined, {
      onSuccess: () => {
        setIsConfirmOpen(false);
        onClose();
      },
      onError: () => {
        setIsConfirmOpen(false);
      },
    });
  };

  // 모달 '아니요'
  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
  };

  const sidebarContent = (
    <div className="p-4 flex flex-col justify-between h-full font-bold">
      <div className="space-y-2 mt-4">
        {/* 🔹 검색: 버튼 + onClick 으로 처리 */}
        <button
          type="button"
          onClick={handleGoSearch}
          className="block w-full text-left py-2 text-white hover:text-blue-500 cursor-pointer"
        >
          검색
        </button>

        <Link
          to="/my"
          className="block py-2 text-white hover:text-blue-500"
          onClick={onClose}
        >
          마이페이지
        </Link>
      </div>

      <div className="pb-4">
        <button
          type="button"
          onClick={handleOpenConfirm}
          disabled={isPending}
          className="block py-2 text-white hover:text-blue-500 cursor-pointer disabled:opacity-50"
        >
          탈퇴하기
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 🔹 네비바 높이(4rem) 아래부터 덮는 어두운 배경 오버레이 */}
      <div
        className={`fixed left-0 right-0 bottom-0 top-16 z-20 bg-black/50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* 🔹 실제 사이드바도 네비바 아래(top-16)에서 시작 */}
      <aside
        className={`
          fixed left-0 top-16 z-30
          h-[calc(100vh-4rem)] w-56 bg-gray-900 shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {sidebarContent}
      </aside>

      {/* 탈퇴 확인 모달 */}
      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default Sidebar;
