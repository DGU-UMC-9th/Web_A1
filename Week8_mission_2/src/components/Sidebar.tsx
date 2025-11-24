import { useEffect } from "react";

interface SidebarProps {
  open: boolean;
  onClose?: () => void;      // ESC 등으로 닫기
  onWithdraw?: () => void;
}

export default function Sidebar({ open, onClose, onWithdraw }: SidebarProps) {
  
  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // 사이드바 열림 시 스크롤 방지
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // cleanup
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <aside
      className={[
        "mt-11 h-[calc(100vh-56px)]",
        "bg-zinc-900 text-white",
        "shrink-0 overflow-hidden",
        "transition-[width] duration-200",
        "relative z-[1200]",
        open ? "w-64" : "w-0",
      ].join(" ")}
      aria-label="사이드바"
    >
      <div className="flex flex-col h-full">
        <nav className="p-3 space-y-1">
          <a href="/search" className="block px-3 py-2 rounded hover:bg-white/10">
            🔍 찾기
          </a>
          <a href="/my" className="block px-3 py-2 rounded hover:bg-white/10">
            👤 마이페이지
          </a>
        </nav>

        <div className="mt-auto p-3">
          <button
            type="button"
            onClick={onWithdraw}
            className="flex justify-center mb-5 w-full text-left px-3 py-2 rounded hover:bg-white/10 text-red-300"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </aside>
  );
}