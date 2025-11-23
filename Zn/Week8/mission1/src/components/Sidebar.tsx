import { useState } from "react";
import { Link } from "react-router-dom";
import useDeleteUser from "../hooks/mutations/useDeleteUser";
import ConfirmDeleteModal from "../components/Modals/ConfirmDeleteModal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { mutate: deleteMutate, isPending } = useDeleteUser();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // '탈퇴하기' 버튼 클릭 -> 모달 열기
  const handleOpenConfirm = () => {
    setIsConfirmOpen(true);
  };

  // 모달에서 '예' 클릭 -> 탈퇴 mutation 호출
  const handleConfirmDelete = () => {
    deleteMutate(undefined, {
      onSuccess: () => {
        setIsConfirmOpen(false);
        onClose(); // 사이드바 닫기
        // 로그인 페이지 이동은 useDeleteUser 안 onSuccess에서 nav("/login")으로 처리됨
      },
      onError: () => {
        setIsConfirmOpen(false);
      },
    });
  };

  // 모달에서 '아니요' 클릭
  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
  };

  const sidebarContent = (
    <div className="p-4 flex flex-col justify-between h-full font-bold">
      <div>
        <Link
          to="/search"
          className="block py-2 text-white hover:text-blue-500"
          onClick={onClose}
        >
          검색
        </Link>
        <Link
          to="/my"
          className="block py-2 text-white hover:text-blue-500"
          onClick={onClose}
        >
          마이페이지
        </Link>
      </div>
      <div>
        <button
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
      {/* 모바일용 사이드바 */}
      <div
        className={`fixed top-25 h-full z-20 md:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 w-dvh bg-opacity-50"
          onClick={onClose}
        ></div>
        <div
          className={`relative bg-gray-900 w-56 h-full shadow-xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </div>
      </div>

      {/* 데스크톱용 사이드바 */}
      <div className="hidden md:block w-56 bg-gray-900 h-full overflow-y-auto shadow">
        {sidebarContent}
      </div>

      {/* 🔹 탈퇴 확인 모달 */}
      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default Sidebar;
