"use client"

import Link from "next/link"
import { IconGift, IconMenu } from "@/components/icons"

/**
 * EditorHeader 组件 - 编辑器页面顶部导航栏
 *
 * 结构:
 *   EditorHeader (h-16, bg-neutral-950, border-b)
 *   ├── 左侧区域 (md:hidden)
 *   │   └── 汉堡菜单按钮 (仅移动端显示)
 *   ├── 中间左侧占位 (md:w-40, 隐藏在移动端)
 *   ├── 中间区域 (flex-1, 居中)
 *   │   └── "Docs" 链接
 *   └── 右侧区域 (w-40)
 *       ├── 积分按钮 (琥珀色)
 *       └── 用户头像 (圆形, 首字母)
 */
export function EditorHeader() {
  return (
    <header className="h-16 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between px-4">
      {/* 左侧: 折叠菜单按钮 - 仅移动端显示 */}
      <button className="p-2 -ml-2 text-gray-400 hover:text-white md:hidden">
        <IconMenu />
      </button>

      {/* 中间左侧占位 - 仅桌面端显示,保持布局对称 */}
      <div className="hidden md:block w-40" />

      {/* 中间: Docs 链接 - 居中 */}
      <div className="flex-1 flex justify-center">
        <Link
          href="/docs"
          className="text-gray-300 hover:text-white font-medium text-sm px-3"
        >
          Docs
        </Link>
      </div>

      {/* 右侧: 积分按钮 + 用户头像 */}
      <div className="w-40 flex justify-end items-center gap-3">
        <div className="relative">
          <div className="flex items-center gap-2">
            {/* 免费积分按钮 */}
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-400/30 hover:bg-amber-500/30 transition-colors">
              <IconGift />
              <span>免费积分</span>
            </button>

            {/* 用户头像 */}
            <button className="flex items-center gap-2 text-sm rounded-full">
              <div className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold">
                C
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
