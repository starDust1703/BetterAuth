"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className={"p-2 rounded-lg border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"}
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? (
        <Sun className={"h-5 w-5"} />
      ) : (
        <Moon className={"h-5 w-5"} />
      )}
    </button>
  )
}
