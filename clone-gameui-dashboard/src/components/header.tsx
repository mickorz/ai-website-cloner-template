"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { IconGift, IconMenu } from "@/components/icons"

/**
 * Header 组件 - 游戏UI仪表盘顶部导航栏
 *
 * 结构:
 *   Header (h-16, sticky, bg-black, z-20)
 *   ├── 左侧区域 (md:w-40)
 *   │   ├── 汉堡菜单按钮 (md:hidden)
 *   │   └── 移动端 Logo 链接 (md:hidden)
 *   ├── 中间导航区域 (flex-1, 居中)
 *   │   └── 导航标签组 (横向滚动)
 *   │       ├── "首页" (活跃态: bg-white text-black)
 *   │       ├── "风格" (非活跃态: bg-white/[0.04])
 *   │       ├── "项目"
 *   │       └── "版本"
 *   └── 右侧区域 (md:w-40)
 *       ├── 积分/礼物按钮 (琥珀色)
 *       └── 用户头像 (圆形, 首字母)
 */

type NavTab = "home" | "style" | "project" | "version"

interface NavItem {
  key: NavTab
  label: string
}

const navItems: NavItem[] = [
  { key: "home", label: "首页" },
  { key: "style", label: "风格" },
  { key: "project", label: "项目" },
  { key: "version", label: "版本" },
]

export function Header() {
  // 当前激活的导航标签，默认为"首页"
  const [activeTab, setActiveTab] = useState<NavTab>("home")

  return (
    <header
      className={cn(
        "h-16 bg-black",
        "border-b border-white/[0.06]",
        "flex items-center justify-between",
        "px-4 md:px-6",
        "sticky top-0 z-20"
      )}
    >
      {/* 左侧区域: 汉堡菜单 + 移动端Logo */}
      <div className="flex items-center gap-2 md:w-40 md:block">
        {/* 汉堡菜单按钮 - 仅移动端显示 */}
        <button className="p-2 -ml-2 text-gray-400 hover:text-white md:hidden">
          <IconMenu />
        </button>

        {/* 移动端 Logo 链接 - 仅移动端显示 */}
        <a
          href="/"
          className="flex items-center gap-2 min-w-0 md:hidden"
        >
          <Image
            src="/seo/logo.svg"
            alt="GameUI AI"
            width={24}
            height={24}
            className="shrink-0"
          />
          <span className="text-sm font-bold text-white truncate">
            GameUI AI
          </span>
        </a>
      </div>

      {/* 中间导航区域 - 居中、可横向滚动 */}
      <div className="flex flex-1 min-w-0 justify-center px-2 sm:px-4">
        <div className="w-full max-w-2xl overflow-x-auto">
          <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max">
            {navItems.map((item) => (
              <button
                key={item.key}
                className={cn(
                  "px-3 sm:px-4 py-1.5",
                  "rounded-full",
                  "text-xs sm:text-sm",
                  "border transition-colors",
                  "whitespace-nowrap",
                  activeTab === item.key
                    ? "bg-white text-black border-white"
                    : "bg-white/[0.04] border-white/10 text-gray-300 hover:text-white"
                )}
                onClick={() => setActiveTab(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧区域: 积分按钮 + 用户头像 */}
      <div className="flex justify-end items-center gap-1.5 sm:gap-2 md:gap-3 md:w-40 min-w-0">
        {/* 免费积分/礼物按钮 */}
        <button
          className={cn(
            "inline-flex items-center gap-1.5",
            "px-3 py-1.5",
            "rounded-lg",
            "text-xs font-medium",
            "bg-amber-500/20 text-amber-300",
            "border border-amber-400/30",
            "hover:bg-amber-500/30",
            "transition-colors"
          )}
        >
          <IconGift />
          <span>免费积分</span>
        </button>

        {/* 用户头像按钮 */}
        <button
          className={cn(
            "flex items-center gap-2",
            "text-sm",
            "rounded-full"
          )}
        >
          <div
            className={cn(
              "h-8 w-8 rounded-full",
              "flex items-center justify-center",
              "text-white text-sm font-bold"
            )}
          >
            C
          </div>
        </button>
      </div>
    </header>
  )
}
