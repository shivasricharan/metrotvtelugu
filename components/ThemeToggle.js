"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined"
      ? (localStorage.getItem("metrotv-theme") || "dark")
      : "dark",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("metrotv-theme", next);
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle inline-flex items-center gap-2 text-sm font-semibold"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
