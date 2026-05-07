import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { StylePicker } from "@/components/style-picker";
import { WorkflowSection } from "@/components/workflow-section";
import { ProjectGallery } from "@/components/project-gallery";

export default function DashboardPage() {
  return (
    <div className="flex h-screen min-h-0 overflow-x-hidden bg-black text-white">
      <Sidebar />
      <div className="flex-1 min-w-0 w-full flex flex-col min-h-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 w-full p-0">
          <p className="sr-only">
            基于顶尖多模态大模型的游戏 UI 平台：从游戏截图到可商用 UI 素材包，一站式完成。
          </p>
          <div>
            <StylePicker />
            <WorkflowSection />
            <ProjectGallery />
          </div>
        </main>
      </div>
    </div>
  );
}
