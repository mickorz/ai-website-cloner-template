# Layout Architecture

> Extracted by open-playwright (enhanced)

## DOM Tree (annotated with layout info)

```
<body> (3 children)
  <div#__nuxt> (2 children)
    <div.bg-black.min-h-screen.text-white.font-sans> (1 children)
      <div.flex.h-screen.min-h-0.overflow-hidden> (2 children) [flex, jc:normal, ai:normal]
        <aside.w-72.bg-neutral-950.border-r.border-neutral-800> (5 children) [flex, dir:column, jc:normal, ai:normal, pos:relative]
          <div.h-16.px-4.flex.items-center> (2 children) [flex, jc:space-between, ai:center]
            <button.flex.items-center.gap-2.min-w-0> (2 children) [flex, jc:normal, ai:center, gap:8px]
              <img.h-8.w-8.rounded-lg>
              <span.text-lg.font-bold.text-white.truncate> "GameUI AI"
            <div.flex.items-center.gap-1> (1 children) [flex, jc:normal, ai:center, gap:4px]
              <button.p-2.text-gray-400.hover:text-white.transition-all> (1 children) [flex, jc:center, ai:center]
                <svg> (1 children)
          <div.px-4.py-3.border-b.border-neutral-800> (1 children)
            <div.flex.items-center.gap-3.min-w-0> (2 children) [flex, jc:normal, ai:center, gap:12px]
              <button.relative.shrink-0.w-12.h-12> (1 children) [pos:relative]
                <img.w-full.h-full.object-cover>
              <div.min-w-0.flex-1> (2 children)
                <p.text-sm.font-medium.text-white.truncate> "Dark Myth Chibi Cartoon RPG UI"
                <div.mt-0.5.flex.items-center.gap-2> (2 children) [flex, jc:normal, ai:center, gap:8px]
          <div.p-4.border-b.border-neutral-800> (1 children)
            <button.w-full.bg-gradient-to-r.from-blue-600.to-purple-600> (1 children) [inline-block]
              <span.flex.items-center.justify-center> (2 children) [flex, jc:center, ai:center]
                <svg> (2 children)
                <span> "添加节点"
          <div.flex-1.min-h-0.overflow-y-auto.overscroll-contain> (1 children)
            <div.p-4.space-y-4> (1 children)
              <div> (2 children)
                <h3.text-xs.font-bold.text-gray-500.uppercase> "我的 GUI (1)"
                <div.space-y-1.5> (1 children)
          <div.border-t.border-white/[0.06].p-3> (1 children)
            <div.flex.items-center.justify-between.gap-3> (2 children) [flex, jc:space-between, ai:center, gap:12px]
              <div.text-xs.text-gray-500.font-medium> "关注我们"
              <div.flex.items-center.gap-2.justify-end> (2 children) [flex, jc:flex-end, ai:center, gap:8px]
                <a.p-2.rounded-lg.text-gray-400.hover:text-white> (1 children)
                <a.p-2.rounded-lg.text-gray-400.hover:text-white> (1 children)
        <div.flex-1.min-w-0.min-h-0.flex> (2 children) [flex, dir:column, jc:normal, ai:normal]
          <header.h-16.bg-neutral-950.border-b.border-neutral-800> (4 children) [flex, jc:space-between, ai:center, pos:sticky]
            <button.p-2.-ml-2.text-gray-400.hover:text-white> (1 children) [none]
              <svg> (1 children)
                <path>
            <div.hidden.md:block.w-40>
            <div.flex-1.flex.justify-center> (1 children) [flex, jc:center, ai:normal]
              <a.text-gray-300.hover:text-white.font-medium.text-sm> "Docs"
            <div.w-40.flex.justify-end.items-center> (1 children) [flex, jc:flex-end, ai:center, gap:12px]
              <div.relative> (1 children) [pos:relative]
                <div.flex.items-center.gap-2> (2 children) [flex, jc:normal, ai:center, gap:8px]
          <main.flex-1.relative.overflow-hidden.bg-neutral-950> (3 children) [pos:relative]
            <div.absolute.inset-0.overflow-hidden.cursor-grab> (2 children) [pos:absolute]
              <div.absolute.inset-0.pointer-events-none> [pos:absolute]
              <div.absolute.top-0.left-0.origin-top-left> (3 children) [pos:absolute]
                <div.absolute> (1 children) [pos:absolute]
                <div.absolute> [pos:absolute]
                <div.absolute> (1 children) [pos:absolute]
            <div.absolute.top-4.right-4.z-40> (2 children) [flex, dir:column, jc:normal, ai:normal, gap:8px, pos:absolute]
              <button.p-2.5.rounded-xl.bg-neutral-900/90.border> (1 children)
                <svg> (2 children)
              <button.p-2.5.rounded-xl.bg-neutral-900/90.border> (1 children)
                <svg> (2 children)
            <div.absolute.bottom-8.right-8.z-40> (1 children) [pos:absolute]
              <div.w-14.h-14.rounded-full.bg-neutral-900> (3 children) [flex, jc:center, ai:center, pos:relative]
                <svg> (5 children)
                <span.absolute.-bottom-8.text-xs.text-gray-500> "回收站" [pos:absolute]
                <div.absolute.top-0.right-0.w-5> "2" [flex, jc:center, ai:center, pos:absolute]
    <div.hidden> [none]
  <div#teleports>
  <div.fixed.top-4.left-1/2.-translate-x-1/2> [flex, dir:column, jc:normal, ai:normal, gap:8px, pos:fixed]
```

## Layout Observations

- Layout info annotated per node: display, flexDirection, justifyContent, alignItems, gap, gridTemplateColumns, position
- Nodes with semantic tags or section-related classes include rect dimensions
- See computed-styles.json for complete CSS values
- See sections-visual.json for bounding box coordinates
