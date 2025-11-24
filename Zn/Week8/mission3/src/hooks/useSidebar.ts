// src/hooks/useSidebar.ts
import { useCallback, useEffect, useState } from "react";

const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 열기
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  // 닫기
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 토글
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  // 사이드바 열려 있을 때 뒷배경 스크롤 막기
  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  return { isOpen, open, close, toggle };
};

export default useSidebar;
