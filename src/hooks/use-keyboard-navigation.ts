import { useEffect, useState } from "react";

export function useKeyboardNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Get all focusable elements in the current view
      const items = document.querySelectorAll<HTMLElement>(".nav-item");
      if (items.length === 0) return;

      let nextIndex = activeIndex;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        nextIndex = (activeIndex + 1) % items.length;
        e.preventDefault();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        nextIndex = (activeIndex - 1 + items.length) % items.length;
        e.preventDefault();
      } else if (e.key === "Enter") {
        items[activeIndex].click();
      }

      if (nextIndex !== activeIndex) {
        setActiveIndex(nextIndex);
        items[nextIndex].focus(); // Physically move the browser focus
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return { activeIndex };
}