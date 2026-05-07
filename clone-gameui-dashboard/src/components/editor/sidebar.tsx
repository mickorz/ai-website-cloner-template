"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IconChevronLeft,
  IconPlus,
  IconMore,
  IconTwitter,
  IconBilibili,
} from "@/components/icons";

// 编辑器侧边栏 - 用于编辑器页面，与仪表盘侧边栏不同
// 包含: Logo头部、项目信息、添加节点按钮、GUI列表、底部社交链接

// GUI 节点数据类型
interface GuiNode {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  dotColor: string;
}

// 示例 GUI 节点数据
const guiNodes: GuiNode[] = [
  {
    id: "gui-home",
    name: "Home",
    tag: "界面",
    tagColor: "bg-blue-500/20 text-blue-300",
    dotColor: "bg-blue-400",
  },
];

export function EditorSidebar() {
  return (
    <aside className="w-72 bg-neutral-950 border-r border-neutral-800 transition-all duration-300 flex flex-col">
      {/* 1. Logo 头部 */}
      <div className="h-16 px-4 flex items-center justify-between">
        <button className="flex items-center gap-2 min-w-0 cursor-pointer">
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
        </button>
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-400 hover:text-white transition-all rounded-lg">
            <IconChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. 项目信息 */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <div className="flex items-center gap-3 min-w-0">
          <button className="relative shrink-0 w-12 h-12 rounded-xl">
            <img
              className="w-full h-full object-cover rounded-xl"
              src="/images/hero.webp"
              alt="项目缩略图"
            />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">
              Dark Myth Chibi Cartoon RPG UI
            </p>
            <div className="mt-0.5 flex items-center gap-2 min-w-0">
              <p className="text-xs text-gray-500 truncate min-w-0">卡通</p>
              <button className="shrink-0 text-[11px] px-2 py-0.5 rounded-md text-gray-400 hover:text-white hover:bg-neutral-800 transition-colors">
                更换
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 添加节点按钮 */}
      <div className="p-4 border-b border-neutral-800">
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">
          <span className="flex items-center justify-center gap-2">
            <IconPlus className="w-4 h-4" />
            添加节点
          </span>
        </button>
      </div>

      {/* 4. GUI 列表（可滚动） */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              我的 GUI ({guiNodes.length})
            </h3>
            <div className="space-y-1.5">
              {guiNodes.map((node) => (
                <div
                  key={node.id}
                  className="group relative flex items-center p-2 rounded-lg hover:bg-neutral-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${node.dotColor}`}
                    />
                    <p className="text-sm font-medium text-white truncate">
                      {node.name}
                    </p>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${node.tagColor}`}
                    >
                      {node.tag}
                    </span>
                  </div>
                  <button className="ml-2 p-1 rounded-md text-gray-400 hover:text-white">
                    <IconMore className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. 底部社交链接 */}
      <div className="border-t border-white/[0.06] p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-gray-500 font-medium">关注我们</div>
          <div className="flex items-center gap-2 justify-end flex-1">
            <Link
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-900"
            >
              <IconTwitter className="w-4 h-4" />
            </Link>
            <Link
              href="https://bilibili.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-900"
            >
              <IconBilibili className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
