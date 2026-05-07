"use client";

import { IconZoomIn, IconZoomOut, IconTrash, IconEdit, IconMore } from "@/components/icons";

export function EditorCanvas() {
  return (
    <main className="flex-1 relative overflow-hidden bg-neutral-950 select-none">
      {/* 画布区域 */}
      <div className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing">
        {/* 网格背景 */}
        <div className="absolute inset-0 pointer-events-none" />

        {/* 画布内容 */}
        <div className="absolute top-0 left-0 origin-top-left will-change-transform">
          {/* 项目卡片 */}
          <div className="absolute" style={{ left: 80, top: 60 }}>
            <div className="rounded-2xl border-4 border-cyan-300/80 bg-neutral-900/95 w-72 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-bold text-sm text-white truncate">项目 1</span>
                <button className="shrink-0 p-1 rounded-md text-gray-300 hover:text-white">
                  <IconEdit />
                </button>
              </div>
              <div className="relative w-full rounded-lg border-2 border-neutral-700 aspect-video bg-neutral-800">
                {/* 项目预览占位 */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-lg" />
              </div>
            </div>
          </div>

          {/* 编辑面板 */}
          <div className="absolute" style={{ left: 380, top: 40 }}>
            <div className="rounded-xl shadow-xl flex flex-col border border-neutral-700 bg-neutral-900 w-[380px]">
              {/* 面板头部 */}
              <div className="p-3 border-b border-neutral-700 flex justify-between items-center">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                  <span className="font-bold text-sm text-white truncate">Home</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300">
                    界面
                  </span>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="group relative text-gray-400 hover:text-white p-1">
                    <IconMore />
                  </button>
                  <button className="group relative text-gray-400 hover:text-red-400 p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 面板内容 - 布局和结果预览 */}
              <div className="p-3 relative">
                <div className="flex gap-3 justify-center items-center flex-row">
                  {/* 布局预览 */}
                  <div className="shrink-0">
                    <div className="text-[10px] text-gray-500 font-bold mb-1.5 text-center">布局</div>
                    <div className="relative rounded-lg bg-neutral-950 w-40 h-28 border border-neutral-800">
                      <div className="w-full h-full object-contain bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg" />
                      <button className="absolute top-1/2 -translate-y-1/2 right-2 z-50 bg-blue-600 hover:bg-blue-500 text-white text-[10px] px-2 py-1 rounded-md">
                        编辑布局
                      </button>
                    </div>
                  </div>

                  {/* 箭头 */}
                  <svg className="w-5 h-5 text-gray-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>

                  {/* 结果预览 */}
                  <div className="shrink-0">
                    <div className="text-[10px] text-gray-500 font-bold mb-1.5 text-center">结果图</div>
                    <div className="relative rounded-lg bg-neutral-950 w-40 h-28 border border-neutral-800">
                      <div className="w-full h-full object-contain bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                        <button className="flex w-full items-center justify-center gap-1 px-3 py-1.5 rounded-md bg-white/10 text-white text-[10px] hover:bg-white/20">
                          微调结果
                        </button>
                        <button className="flex w-full items-center justify-center gap-1 px-3 py-1.5 rounded-md bg-white/10 text-white text-[10px] hover:bg-white/20">
                          编辑资源
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 版本和重新生成 */}
                <div className="mt-3 flex items-center gap-2">
                  <button className="shrink-0 px-2.5 py-1 rounded-md text-xs text-gray-300 bg-neutral-800 hover:bg-neutral-700">
                    v1
                  </button>
                  <button className="relative overflow-hidden w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-2 text-xs font-medium hover:opacity-90">
                    <span className="pointer-events-none absolute top-0 right-0 w-8 h-full bg-white/10" />
                    <span className="flex items-center justify-center gap-1">
                      10 重新生成
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 缩放控件 */}
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
        <button className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-700 text-gray-400 hover:text-white hover:border-neutral-600">
          <IconZoomIn />
        </button>
        <button className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-700 text-gray-400 hover:text-white hover:border-neutral-600">
          <IconZoomOut />
        </button>
      </div>

      {/* 回收站 */}
      <div className="absolute bottom-8 right-8 z-40">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-neutral-600 cursor-pointer transition-colors">
            <IconTrash />
          </div>
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-medium whitespace-nowrap">
            回收站
          </span>
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            2
          </div>
        </div>
      </div>
    </main>
  );
}
