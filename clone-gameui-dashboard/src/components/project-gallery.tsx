"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * ProjectGallery 组件
 *
 * 公开项目展示画廊,包含标签切换和项目卡片网格
 *
 * 结构:
 *   ProjectGallery
 *   ├── 头部区域
 *   │   ├── 标题 "公开项目"
 *   │   └── 标签切换 (公开项目 / 公开风格)
 *   └── 项目卡片网格 (grid-cols-2 md:grid-cols-3 lg:grid-cols-4)
 *       └── x8 项目卡片
 *           ├── 项目封面图片 (aspect-square)
 *           ├── 渐变覆盖层 (from-black/85 via-black/35 to-transparent)
 *           └── 底部信息区
 *               ├── 项目名称
 *               ├── 作者行 (头像 + 用户名)
 *               └── "开始创作" 按钮
 */

/** 标签类型 */
type TabKey = "projects" | "styles"

/** 项目数据接口 */
interface Project {
  name: string
  user: string
  image: string
  avatar: string
}

/** 公开项目数据 */
const projects: Project[] = [
  {
    name: "糖果农场卡通UI系统",
    user: "lai lai",
    image: "/images/project-candy-farm.png",
    avatar: "/images/avatar-lai-lai.svg",
  },
  {
    name: "像素草坪瓦片精灵图集系统",
    user: "tail kink",
    image: "/images/project-pixel-turf.png",
    avatar: "/images/avatar-tail-kink.svg",
  },
  {
    name: "奇趣漂浮群岛卡通UI",
    user: "lai lai",
    image: "/images/project-floating-island.png",
    avatar: "/images/avatar-lai-lai.svg",
  },
  {
    name: "温馨像素农场管理",
    user: "lai lai",
    image: "/images/project-pixel-farm.png",
    avatar: "/images/avatar-lai-lai.svg",
  },
  {
    name: "活力圆润海盗卡通风UI",
    user: "lai lai",
    image: "/images/project-pirate-ui.png",
    avatar: "/images/avatar-lai-lai.svg",
  },
  {
    name: "梦幻咒语学院卡通UI",
    user: "lai lai",
    image: "/images/project-magic-academy.png",
    avatar: "/images/avatar-lai-lai.svg",
  },
  {
    name: "柔和森林可爱拼图UI",
    user: "yoxioo",
    image: "/images/project-forest-puzzle.png",
    avatar: "/images/avatar-yoxioo.png",
  },
  {
    name: "键入灵感的柔和怀旧视觉小说界面",
    user: "yoxioo",
    image: "/images/project-visual-novel.png",
    avatar: "/images/avatar-yoxioo.png",
  },
]

/** 标签配置 */
const tabs: { key: TabKey; label: string }[] = [
  { key: "projects", label: "公开项目" },
  { key: "styles", label: "公开风格" },
]

export function ProjectGallery() {
  const [activeTab, setActiveTab] = useState<TabKey>("projects")

  return (
    <section className="relative py-10 sm:py-14 md:py-16 bg-black overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* 头部: 标题 + 标签切换 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold">公开项目</h2>
            {/* 标签按钮 */}
            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs border transition-colors",
                    activeTab === tab.key
                      ? "bg-white text-black border-white"
                      : "bg-white/[0.04] border-white/10 text-gray-300"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 项目卡片网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group relative aspect-square rounded-xl overflow-hidden border border-white/[0.06] bg-neutral-900 cursor-pointer transition-all hover:border-white/15"
            >
              {/* 项目封面图片 */}
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* 渐变覆盖层 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              {/* 底部信息区 */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-sm font-medium truncate">{project.name}</h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Image
                    src={project.avatar}
                    alt={project.user}
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-xs text-gray-400">{project.user}</span>
                </div>
                <button className="mt-2 w-full py-1.5 rounded-lg text-xs font-medium bg-white text-black hover:bg-white/90 transition-colors">
                  开始创作
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
