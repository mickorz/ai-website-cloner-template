import { EditorSidebar } from "@/components/editor/sidebar";
import { EditorHeader } from "@/components/editor/header";
import { EditorCanvas } from "@/components/editor/canvas";

export default function ProjectEditorPage() {
  return (
    <div className="flex h-screen min-h-0 overflow-hidden bg-neutral-950 text-white">
      <EditorSidebar />
      <div className="flex-1 min-w-0 min-h-0 flex flex-col">
        <EditorHeader />
        <EditorCanvas />
      </div>
    </div>
  );
}
