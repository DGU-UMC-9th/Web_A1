import { Link } from "react-router-dom";
import { Search, User, LogOut } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* ✅ 배경 오버레이 */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
        />
      )}

      {/* ✅ 사이드바 */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-[#111111] text-white transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ✅ 로고 영역 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-[#ff4cc4] tracking-wide">
            DOLIGO
          </h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            aria-label="close menu"
          >
            ✕
          </button>
        </div>

        {/* ✅ 메뉴 리스트 */}
        <nav className="flex flex-col mt-6 px-5 gap-4 text-[15px]">
          <Link
            to="/search"
            onClick={onClose}
            className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition"
          >
            <Search size={18} />
            찾기
          </Link>

          <Link
            to="/my"
            onClick={onClose}
            className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition"
          >
            <User size={18} />
            마이페이지
          </Link>
        </nav>

        {/* ✅ 하단 영역 */}
        <div className="absolute bottom-5 left-0 w-full px-5">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition text-sm"
          >
            <LogOut size={16} />
            탈퇴하기
          </button>
        </div>
      </aside>
    </>
  );
}