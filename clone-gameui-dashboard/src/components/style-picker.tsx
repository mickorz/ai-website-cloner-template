"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { IconUpload, IconArrowRight } from "@/components/icons"

/**
 * StylePicker 组件 - 风格选择器主区域
 *
 * 仪表盘的核心英雄区域,包含风格标签切换、文本描述输入与创作入口
 *
 * 结构:
 *   StylePicker
 *   ├── 背景光晕效果层
 *   │   ├── 左上紫色光晕
 *   │   └── 右侧洋红光晕
 *   ├── 标题区域
 *   │   ├── 徽章标签 (紫点 + 文字)
 *   │   └── 描述段落
 *   ├── 主卡片
 *   │   ├── 风格选择标签行
 *   │   │   ├── "风格选择" 标签
 *   │   │   └── 按钮组: 自动(默认) | 卡通 | 写实 | 手绘 | 扁平 | 3D | 像素
 *   │   ├── 文本输入区域 (textarea)
 *   │   ├── 隐藏文件上传输入
 *   │   └── 底部操作区
 *   │       ├── 提示文字
 *   │       ├── 上传缩略图预览区
 *   │       └── 按钮组
 *   │           ├── 上传图片按钮
 *   │           └── 开始创作按钮 (渐变背景)
 */

const styleOptions = [
  "自动",
  "卡通",
  "写实",
  "手绘",
  "扁平",
  "3D",
  "像素",
] as const

type StyleKey = (typeof styleOptions)[number]

export function StylePicker() {
  const [activeStyle, setActiveStyle] = useState<StyleKey>("自动")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理文件上传
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...Array.from(files)])
    }
  }

  return (
    <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden bg-black">
      {/* 背景光晕效果 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[10%] w-80 h-80 rounded-full bg-purple-600/20 blur-[110px]" />
        <div className="absolute top-1/3 -right-16 w-72 h-72 rounded-full bg-fuchsia-500/15 blur-[110px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* 标题区域 */}
        <div className="mb-7 sm:mb-9 text-center">
          {/* 徽章标签 */}
          <p className="inline-flex items-center gap-2 rounded-full border border-purple-300/25 bg-purple-400/[0.06] px-3.5 py-1.5 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-purple-100/90 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-300" />
          </p>

          {/* 描述文字 */}
          <p className="text-sm sm:text-base text-slate-300/90 mt-4 max-w-2xl mx-auto leading-relaxed">
            {"详细描述你想制作的游戏类型、题材、色调、画风与目标人群，AI 将为你生成可复用的风格锁，驱动整套 UI 资产在同一美学下产出。"}
          </p>
        </div>

        {/* 主卡片 */}
        <div className="rounded-3xl border border-purple-300/25 bg-black/60 backdrop-blur-sm p-4 sm:p-5 shadow-[0_20px_70px_rgba(139,92,246,0.18),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          {/* 风格选择标签行 */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] sm:text-xs text-gray-400 mr-1">{"风格选择"}</span>
            {styleOptions.map((style) => (
              <button
                key={style}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs border transition-all duration-200",
                  activeStyle === style
                    ? "bg-white text-black border-white"
                    : "bg-white/[0.04] border-white/10 text-gray-300 hover:text-white hover:border-white/30"
                )}
                onClick={() => setActiveStyle(style)}
              >
                {style}
              </button>
            ))}
          </div>

          {/* 文本输入区域 */}
          <textarea
            className="w-full min-h-[170px] sm:min-h-[200px] bg-transparent text-gray-100 placeholder:text-gray-500 text-sm sm:text-base resize-none outline-none leading-7"
            placeholder={"详细描述你想制作的游戏风格、类型、色调、画风与目标人群。例如：面向 25-34 岁男性玩家的赛博朋克放置 RPG，暗色霓虹主基调，冷色调科技 HUD，日系厚涂卡通造型，适配移动端竖屏。"}
          />

          {/* 隐藏的文件上传输入 */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

          {/* 底部操作区 */}
          <div className="mt-3 flex flex-col gap-3 pt-3 border-t border-white/[0.06]">
            <span className="text-[11px] sm:text-xs text-gray-500">
              {"上传几张游戏截图可更精准锁定风格，或直接开始创作。"}
            </span>
            <div className="flex items-center justify-between gap-3">
              {/* 上传缩略图预览区 */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="shrink-0 w-12 h-12 rounded-lg border border-white/10 overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* 操作按钮组 */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* 上传图片按钮 */}
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-gray-300 border border-white/10 hover:text-white hover:border-white/30 transition-colors"
                  onClick={handleUploadClick}
                >
                  <IconUpload className="w-3.5 h-3.5" />
                  {"上传图片"}
                </button>

                {/* 开始创作按钮 */}
                <button className="flex items-center gap-1.5 px-7 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-400 to-purple-600 text-white hover:opacity-90 transition-opacity">
                  {"开始创作"}
                  <IconArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
