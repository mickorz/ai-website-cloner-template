import Image from "next/image"

/**
 * WorkflowSection 组件
 *
 * 工作流展示区域,展示三步流程卡片
 *
 * 结构:
 *   WorkflowSection
 *   ├── 背景紫色光晕 (purple glow blur)
 *   ├── 标题区
 *   │   ├── 徽章胶囊 (badge pill)
 *   │   ├── h2 "工作流"
 *   │   └── 副标题描述
 *   └── 三列卡片网格 (grid-cols-1 md:grid-cols-3 gap-6)
 *       ├── 卡片1: "01 描述游戏，锁定专属风格" + flow1.webp
 *       ├── 卡片2: "02 排版页面，一键出效果图" + flow2.webp
 *       └── 卡片3: "03 精细切图，一键导出素材" + flow3.webp
 */

interface WorkflowStep {
  number: string
  title: string
  description: string
  image: string
  imageAlt: string
}

const workflowSteps: WorkflowStep[] = [
  {
    number: "01",
    title: "描述游戏，锁定专属风格",
    description: "输入游戏类型、题材、色调与人群，AI 生成可复用的风格锁。",
    image: "/images/flow1.webp",
    imageAlt: "描述游戏 锁定专属风格",
  },
  {
    number: "02",
    title: "排版页面，一键出效果图",
    description: "拖拽或上传布局草图，AI 自动生成高质量 UI 效果图。",
    image: "/images/flow2.webp",
    imageAlt: "排版页面 一键生成效果图",
  },
  {
    number: "03",
    title: "精细切图，一键导出素材",
    description: "AI 精确识别 UI 元素边界，一键导出多分辨率切图资源。",
    image: "/images/flow3.webp",
    imageAlt: "精细切图 一键导出素材",
  },
]

export function WorkflowSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-black overflow-hidden">
      {/* 背景紫色光晕 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] rounded-full bg-purple-600/[0.06] blur-[140px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* 标题区 */}
        <div className="text-center mb-10 sm:mb-12">
          {/* 徽章胶囊 */}
          <p className="inline-flex items-center gap-2 rounded-full border border-purple-300/25 bg-purple-400/[0.06] px-3.5 py-1.5 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-purple-100/90 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-300" />
            WORKFLOW
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            工作流
          </h2>
          <p className="text-sm text-slate-300/90 mt-4 max-w-2xl mx-auto leading-relaxed">
            锁定统一风格之后，排版、出图、切图一路贯通，无需反复调教提示词。
          </p>
        </div>

        {/* 三列卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workflowSteps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-white/[0.06] overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 group"
            >
              {/* 图片区域 */}
              <div className="relative overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={640}
                  height={480}
                  className="w-full aspect-[4/3] object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* 步骤编号徽章 */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-xs text-gray-300 px-2 py-1 rounded-md">
                  {step.number}
                </div>
              </div>

              {/* 文字内容 */}
              <div className="p-4">
                <h3 className="text-base font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
