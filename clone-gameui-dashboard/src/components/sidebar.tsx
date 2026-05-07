"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  IconChevronLeft,
  IconGrid,
  IconSwap,
  IconBook,
  IconChat,
  IconTwitter,
  IconBilibili,
} from "@/components/icons"

/**
 * Sidebar 组件
 *
 * GameUI AI 仪表盘左侧边栏（zh-CN 版本）
 *
 * 结构:
 *   Sidebar
 *   ├── Logo 区域 (h-16)
 *   │   ├── Logo 图标 + 文字链接
 *   │   └── 收起按钮（仅桌面端可见）
 *   ├── Tab 切换栏
 *   │   ├── "我的项目"（活跃状态）
 *   │   └── "我的画风"
 *   ├── 可滚动项目列表
 *   │   ├── 项目卡片（缩略图 + 名称 + 时间）
 *   │   └── 空状态占位
 *   └── 底部固定区域
 *       ├── 便捷功能（2x2 网格按钮）
 *       └── 关注我们（社交链接）
 */

type TabKey = "projects" | "styles"

interface UtilityItem {
  label: string
  icon: React.ElementType
}

const utilityItems: UtilityItem[] = [
  { label: "切图", icon: IconGrid },
  { label: "换皮", icon: IconSwap },
  { label: "使用文档", icon: IconBook },
  { label: "意见反馈", icon: IconChat },
]

// 模拟项目数据
const mockProjects = [
  {
    id: "1",
    name: "项目 1",
    thumbnail: "/images/project-thumb-1.png",
    updatedAt: "22 小时前",
  },
]

export function Sidebar() {
  const [activeTab, setActiveTab] = useState<TabKey>("projects")

  return (
    <aside
      className={cn(
        "fixed md:relative inset-y-0 left-0 z-40",
        "w-72 bg-black",
        "border-r border-white/[0.06]",
        "transition-all duration-300",
        "flex flex-col min-h-0"
      )}
    >
      {/* 区域1: Logo 头部 */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-white/[0.06] shrink-0">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <Image
            src="/images/gameui_logo.svg"
            alt="GameUI AI"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-lg font-bold text-white truncate">
            GameUI AI
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {/* 收起侧边栏按钮 - 仅桌面端可见 */}
          <button
            className={cn(
              "p-2 text-gray-400 hover:text-white",
              "transition-all rounded-lg",
              "border border-transparent hover:border-gray-600 hover:bg-neutral-900",
              "hidden md:flex items-center justify-center"
            )}
            aria-label="收起侧边栏"
          >
            <IconChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 区域2: Tab 切换栏 */}
      <div className="px-4 pt-4">
        <div className="flex rounded-lg bg-neutral-900/50 p-1">
          <button
            className={cn(
              "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
              activeTab === "projects"
                ? "bg-neutral-800 text-white shadow-sm"
                : "text-gray-400 hover:text-gray-300"
            )}
            onClick={() => setActiveTab("projects")}
          >
            我的项目
          </button>
          <button
            className={cn(
              "flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all",
              activeTab === "styles"
                ? "bg-neutral-800 text-white shadow-sm"
                : "text-gray-400 hover:text-gray-300"
            )}
            onClick={() => setActiveTab("styles")}
          >
            我的画风
          </button>
        </div>
      </div>

      {/* 区域3: 可滚动项目列表 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {activeTab === "projects" ? (
            <div className="space-y-2">
              {mockProjects.map((project) => (
                <div
                  key={project.id}
                  className={cn(
                    "flex items-center p-2 rounded-lg",
                    "hover:bg-neutral-900 cursor-pointer",
                    "transition-colors group relative"
                  )}
                >
                  <button
                    className="relative w-8 h-8 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900 mr-3 shrink-0"
                    aria-label={project.name}
                  >
                    <Image
                      src={project.thumbnail}
                      alt={project.name}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {project.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {project.updatedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* "我的画风" tab 暂无内容 */
            <div className="py-2 text-center text-xs text-gray-600">
              -
            </div>
          )}
        </div>
      </div>

      {/* 区域4: 底部固定区域 */}
      <div className="border-t border-white/[0.06] p-3 mt-auto shrink-0">
        <div className="flex flex-col gap-3">
          {/* 便捷功能 */}
          <div className="flex flex-col gap-2">
            <div className="text-[11px] text-gray-500 font-medium px-2 tracking-wide uppercase">
              便捷功能
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {utilityItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className={cn(
                      "group flex items-center rounded-md text-xs text-gray-400",
                      "px-2.5 py-2 gap-1.5",
                      "hover:text-white hover:bg-white/[0.04]",
                      "transition-colors"
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 关注我们 */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-white/[0.06]">
            <div className="text-[11px] text-gray-500 font-medium px-2">
              关注我们
            </div>
            <div className="flex items-center gap-1.5 px-1">
              {/* X/Twitter 链接 */}
              <a
                href="https://x.com/gameui_ai"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center",
                  "w-9 h-9 rounded-md",
                  "border border-white/[0.06] bg-white/[0.02]",
                  "text-gray-400 hover:text-white",
                  "hover:bg-white/[0.06] hover:border-white/[0.12]",
                  "transition-colors"
                )}
                aria-label="关注 X/Twitter"
              >
                <IconTwitter className="w-4 h-4" />
              </a>
              {/* Bilibili 链接 */}
              <a
                href="https://space.bilibili.com/gameui"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center",
                  "w-9 h-9 rounded-md",
                  "border border-white/[0.06] bg-white/[0.02]",
                  "text-gray-400 hover:text-white",
                  "hover:bg-white/[0.06] hover:border-white/[0.12]",
                  "transition-colors"
                )}
                aria-label="关注 Bilibili"
              >
                <IconBilibili className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
