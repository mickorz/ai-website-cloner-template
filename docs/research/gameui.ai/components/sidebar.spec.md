# Sidebar Specification

> Source: https://gameui.ai/project/8578c2a6-88a0-431a-aad1-5a8c67ef8a19

## Overview
- **Target file:** `src/components/Sidebar.tsx`
- **Screenshot:** `docs/design-references/` (see captured screenshots)
- **Children:** 48 descendants

## DOM Structure

```
<aside.w-72.bg-neutral-950.border-r.border-neutral-800.transition-all>
  <div.h-16.px-4.flex.items-center.justify-between>
    <button.flex.items-center.gap-2.min-w-0.cursor-pointer>
      <img.h-8.w-8.rounded-lg>
      <span.text-lg.font-bold.text-white.truncate> "GameUI AI"
    <div.flex.items-center.gap-1>
      <button.p-2.text-gray-400.hover:text-white.transition-all.rounded-lg>
        <svg>
          <path>
  <div.px-4.py-3.border-b.border-neutral-800>
    <div.flex.items-center.gap-3.min-w-0>
      <button.relative.shrink-0.w-12.h-12.rounded-xl>
        <img.w-full.h-full.object-cover>
      <div.min-w-0.flex-1>
        <p.text-sm.font-medium.text-white.truncate> "Dark Myth Chibi Cartoon RPG UI"
        <div.mt-0.5.flex.items-center.gap-2.min-w-0>
          <p.text-xs.text-gray-500.truncate.min-w-0>
          <button.shrink-0.text-[11px].px-2.py-0.5.rounded-md> "更换"
  <div.p-4.border-b.border-neutral-800>
    <button.w-full.bg-gradient-to-r.from-blue-600.to-purple-600.text-white>
      <span.flex.items-center.justify-center>
        <svg>
          <path>
          <path>
        <span> "添加节点"
  <div.flex-1.min-h-0.overflow-y-auto.overscroll-contain>
    <div.p-4.space-y-4>
      <div>
        <h3.text-xs.font-bold.text-gray-500.uppercase.tracking-wider> "我的 GUI (1)"
        <div.space-y-1.5>
          <div.group.relative.flex.items-center.p-2>
            <div.flex.items-center.gap-2.flex-1.min-w-0>
              <div.w-2.h-2.rounded-full.flex-shrink-0.bg-blue-400>
              <p.text-sm.font-medium.text-white.truncate> "Home"
              <span.px-1.5.py-0.5.rounded.text-[10px].font-semibold> "界面"
            <button.ml-2.p-1.rounded-md.text-gray-400.hover:text-white>
              <svg>
                <circle>
                <circle>
                <circle>
  <div.border-t.border-white/[0.06].p-3>
    <div.flex.items-center.justify-between.gap-3>
      <div.text-xs.text-gray-500.font-medium> "关注我们"
      <div.flex.items-center.gap-2.justify-end.flex-1>
        <a.p-2.rounded-lg.text-gray-400.hover:text-white.hover:bg-neutral-900>
          <svg>
            <path>
        <a.p-2.rounded-lg.text-gray-400.hover:text-white.hover:bg-neutral-900>
          <span.inline-flex.h-5.w-5.items-center.justify-center> "B"
```

## Computed Styles

### <div>
Text: "GameUI AIDark Myth Chibi Cartoon RPG UI卡通更换添加节点我的 GUI (1)Home界面关注我们B Docs  免费积分 "
Rect: x=0, y=0, w=1440, h=900

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(243, 244, 247)` |
| backgroundColor | `rgb(17, 24, 39)` |
| background | `rgb(17, 24, 39) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `1440px` |
| height | `900px` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `hidden` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .flex.h-screen.min-h-0
Text: "GameUI AIDark Myth Chibi Cartoon RPG UI卡通更换添加节点我的 GUI (1)Home界面关注我们B Docs  免费积分 "
Rect: x=0, y=0, w=1440, h=900

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `1440px` |
| height | `900px` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `flex` |
| flexDirection | `row` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `hidden` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <aside> .w-72.bg-neutral-950.border-r
Text: "GameUI AIDark Myth Chibi Cartoon RPG UI卡通更换添加节点我的 GUI (1)Home界面关注我们B"
Rect: x=0, y=0, w=288, h=900

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgb(10, 10, 10)` |
| background | `rgb(10, 10, 10) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `288px` |
| height | `900px` |
| minWidth | `auto` |
| minHeight | `0px` |
| display | `flex` |
| flexDirection | `column` |
| borderRadius | `0px` |
| overflow | `visible` |
| position | `relative` |
| top | `0px` |
| right | `0px` |
| bottom | `0px` |
| left | `0px` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .h-16.px-4.flex
Text: "GameUI AI"
Rect: x=0, y=0, w=287, h=64

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px 16px` |
| paddingTop | `0px` |
| paddingRight | `16px` |
| paddingBottom | `0px` |
| paddingLeft | `16px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `287px` |
| height | `64px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `flex` |
| flexDirection | `row` |
| justifyContent | `space-between` |
| alignItems | `center` |
| borderRadius | `0px` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <button> .flex.items-center.gap-2
Text: "GameUI AI"
Rect: x=16, y=16, w=137, h=32

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `137.281px` |
| height | `32px` |
| minWidth | `0px` |
| minHeight | `auto` |
| display | `flex` |
| flexDirection | `row` |
| alignItems | `center` |
| gap | `8px` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <img> .h-8.w-8.rounded-lg
Rect: x=16, y=16, w=32, h=32

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `32px` |
| height | `32px` |
| maxWidth | `100%` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `8px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `clip` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .flex.items-center.gap-1
Rect: x=229, y=11, w=42, h=42

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `42px` |
| height | `42px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `flex` |
| flexDirection | `row` |
| alignItems | `center` |
| gap | `4px` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <button> .p-2.text-gray-400.hover:text-white
Rect: x=229, y=11, w=42, h=42

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(156, 163, 175)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `8px` |
| paddingTop | `8px` |
| paddingRight | `8px` |
| paddingBottom | `8px` |
| paddingLeft | `8px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `42px` |
| height | `42px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `flex` |
| flexDirection | `row` |
| justifyContent | `center` |
| alignItems | `center` |
| borderRadius | `8px` |
| border | `1px solid rgba(0, 0, 0, 0)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `0.15s cubic-bezier(0.4, 0, 0.2, 1)` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <svg>
Rect: x=238, y=20, w=24, h=24

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(156, 163, 175)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `24px` |
| height | `24px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `hidden` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .flex.items-center.gap-3
Text: "Dark Myth Chibi Cartoon RPG UI卡通更换"
Rect: x=16, y=76, w=255, h=48

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `255px` |
| height | `48px` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `flex` |
| flexDirection | `row` |
| alignItems | `center` |
| gap | `12px` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <button> .relative.shrink-0.w-12
Rect: x=16, y=76, w=48, h=48

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgb(23, 23, 23)` |
| background | `rgb(23, 23, 23) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `48px` |
| height | `48px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `12px` |
| border | `1px solid rgb(64, 64, 64)` |
| overflow | `hidden` |
| position | `relative` |
| top | `0px` |
| right | `0px` |
| bottom | `0px` |
| left | `0px` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <img> .w-full.h-full.object-cover
Rect: x=17, y=77, w=46, h=46

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `46px` |
| height | `46px` |
| maxWidth | `100%` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `clip` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `pointer` |
| objectFit | `cover` |
| visibility | `visible` |

### <div> .min-w-0.flex-1
Text: "Dark Myth Chibi Cartoon RPG UI卡通更换"
Rect: x=76, y=78, w=195, h=45

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `195px` |
| height | `44.5px` |
| minWidth | `0px` |
| minHeight | `auto` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .mt-0.5.flex.items-center
Text: "卡通更换"
Rect: x=76, y=100, w=195, h=23

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `2px 0px 0px` |
| marginTop | `2px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `195px` |
| height | `22.5px` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `flex` |
| flexDirection | `row` |
| alignItems | `center` |
| gap | `8px` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <button> .shrink-0.text-[11px].px-2
Text: "更换"
Rect: x=108, y=100, w=40, h=23

| Property | Value |
|----------|-------|
| fontSize | `11px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `16.5px` |
| color | `rgb(209, 213, 219)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `2px 8px` |
| paddingTop | `2px` |
| paddingRight | `8px` |
| paddingBottom | `2px` |
| paddingLeft | `8px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `40px` |
| height | `22.5px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `6px` |
| border | `1px solid rgb(75, 85, 99)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <button> .w-full.bg-gradient-to-r.from-blue-600
Text: "添加节点"
Rect: x=16, y=153, w=255, h=40

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `500` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234)) repeat scroll 0% 0% / auto padding-box b` |
| backgroundImage | `linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234))` |
| padding | `8px 16px` |
| paddingTop | `8px` |
| paddingRight | `16px` |
| paddingBottom | `8px` |
| paddingLeft | `16px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `255px` |
| height | `40px` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `inline-block` |
| flexDirection | `row` |
| borderRadius | `8px` |
| border | `0px solid rgb(43, 46, 59)` |
| boxShadow | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(59, 130, 246, 0.2) 0px 10px 15px -3px, rgba(59,` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `0.15s cubic-bezier(0.4, 0, 0.2, 1)` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <span> .flex.items-center.justify-center
Text: "添加节点"
Rect: x=32, y=161, w=223, h=24

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `500` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `223px` |
| height | `24px` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `flex` |
| flexDirection | `row` |
| justifyContent | `center` |
| alignItems | `center` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .flex-1.min-h-0.overflow-y-auto
Text: "我的 GUI (1)Home界面"
Rect: x=0, y=210, w=287, h=625

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `287px` |
| height | `624.75px` |
| minWidth | `auto` |
| minHeight | `0px` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `auto` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <h3> .text-xs.font-bold.text-gray-500
Text: "我的 GUI (1)"
Rect: x=16, y=226, w=255, h=16

| Property | Value |
|----------|-------|
| fontSize | `12px` |
| fontWeight | `700` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `16px` |
| letterSpacing | `0.6px` |
| color | `rgb(107, 114, 128)` |
| textTransform | `uppercase` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px 0px 8px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `8px` |
| marginLeft | `0px` |
| width | `255px` |
| height | `16px` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .group.relative.flex
Text: "Home界面"
Rect: x=16, y=250, w=255, h=40

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgb(23, 23, 23)` |
| background | `rgb(23, 23, 23) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `8px` |
| paddingTop | `8px` |
| paddingRight | `8px` |
| paddingBottom | `8px` |
| paddingLeft | `8px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `255px` |
| height | `40px` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `flex` |
| flexDirection | `row` |
| alignItems | `center` |
| borderRadius | `8px` |
| border | `0px solid rgb(43, 46, 59)` |
| boxShadow | `rgb(255, 255, 255) 0px 0px 0px 0px, rgb(59, 130, 246) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px` |
| overflow | `visible` |
| position | `relative` |
| top | `0px` |
| right | `0px` |
| bottom | `0px` |
| left | `0px` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .flex.items-center.gap-2
Text: "Home界面"
Rect: x=24, y=260, w=207, h=20

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `207px` |
| height | `20px` |
| minWidth | `0px` |
| minHeight | `auto` |
| display | `flex` |
| flexDirection | `row` |
| alignItems | `center` |
| gap | `8px` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .w-2.h-2.rounded-full
Rect: x=24, y=266, w=8, h=8

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgb(96, 165, 250)` |
| background | `rgb(96, 165, 250) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `8px` |
| height | `8px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `9999px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <span> .px-1.5.py-0.5.rounded
Text: "界面"
Rect: x=89, y=261, w=32, h=19

| Property | Value |
|----------|-------|
| fontSize | `10px` |
| fontWeight | `600` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `15px` |
| color | `rgb(147, 197, 253)` |
| backgroundColor | `rgba(59, 130, 246, 0.2)` |
| background | `rgba(59, 130, 246, 0.2) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `2px 6px` |
| paddingTop | `2px` |
| paddingRight | `6px` |
| paddingBottom | `2px` |
| paddingLeft | `6px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `32px` |
| height | `19px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `4px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <button> .ml-2.p-1.rounded-md
Rect: x=239, y=258, w=24, h=24

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(156, 163, 175)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `4px` |
| paddingTop | `4px` |
| paddingRight | `4px` |
| paddingBottom | `4px` |
| paddingLeft | `4px` |
| margin | `0px 0px 0px 8px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `8px` |
| width | `24px` |
| height | `24px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `6px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `0` |
| transition | `color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .flex.items-center.justify-between
Text: "关注我们B"
Rect: x=12, y=848, w=263, h=40

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `263px` |
| height | `40.25px` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `flex` |
| flexDirection | `row` |
| justifyContent | `space-between` |
| alignItems | `center` |
| gap | `12px` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .flex.items-center.gap-2
Text: "B"
Rect: x=72, y=848, w=203, h=40

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `203px` |
| height | `40.25px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `flex` |
| flexDirection | `row` |
| justifyContent | `flex-end` |
| alignItems | `center` |
| gap | `8px` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

### <a> .p-2.rounded-lg.text-gray-400
Rect: x=199, y=852, w=32, h=32

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(156, 163, 175)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `8px` |
| paddingTop | `8px` |
| paddingRight | `8px` |
| paddingBottom | `8px` |
| paddingLeft | `8px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `32px` |
| height | `32px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `8px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `0.15s cubic-bezier(0.4, 0, 0.2, 1)` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <a> .p-2.rounded-lg.text-gray-400
Text: "B"
Rect: x=239, y=848, w=36, h=40

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(156, 163, 175)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `8px` |
| paddingTop | `8px` |
| paddingRight | `8px` |
| paddingBottom | `8px` |
| paddingLeft | `8px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `36px` |
| height | `40.25px` |
| minWidth | `auto` |
| minHeight | `auto` |
| display | `block` |
| flexDirection | `row` |
| borderRadius | `8px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `0.15s cubic-bezier(0.4, 0, 0.2, 1)` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <span> .inline-flex.h-5.w-5
Text: "B"
Rect: x=247, y=860, w=20, h=20

| Property | Value |
|----------|-------|
| fontSize | `11px` |
| fontWeight | `700` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `16.5px` |
| color | `rgb(125, 211, 252)` |
| backgroundColor | `rgba(14, 165, 233, 0.2)` |
| background | `rgba(14, 165, 233, 0.2) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `20px` |
| height | `20px` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `inline-flex` |
| flexDirection | `row` |
| justifyContent | `center` |
| alignItems | `center` |
| borderRadius | `6px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `pointer` |
| objectFit | `fill` |
| visibility | `visible` |

### <div> .flex-1.min-w-0.min-h-0
Text: "Docs  免费积分 C项目 1Home界面布局编辑布局结果图微调结果编辑资源 v110重新生成回收站2"
Rect: x=288, y=0, w=1152, h=900

| Property | Value |
|----------|-------|
| fontSize | `16px` |
| fontWeight | `400` |
| fontFamily | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| lineHeight | `24px` |
| color | `rgb(255, 255, 255)` |
| backgroundColor | `rgba(0, 0, 0, 0)` |
| background | `rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box` |
| padding | `0px` |
| paddingTop | `0px` |
| paddingRight | `0px` |
| paddingBottom | `0px` |
| paddingLeft | `0px` |
| margin | `0px` |
| marginTop | `0px` |
| marginRight | `0px` |
| marginBottom | `0px` |
| marginLeft | `0px` |
| width | `1152px` |
| height | `900px` |
| minWidth | `0px` |
| minHeight | `0px` |
| display | `flex` |
| flexDirection | `column` |
| borderRadius | `0px` |
| border | `0px solid rgb(43, 46, 59)` |
| overflow | `visible` |
| position | `static` |
| top | `auto` |
| right | `auto` |
| bottom | `auto` |
| left | `auto` |
| zIndex | `auto` |
| opacity | `1` |
| transition | `all` |
| cursor | `auto` |
| objectFit | `fill` |
| visibility | `visible` |

## Text Content (verbatim)

- "GameUI AI"
  [SVG] <path> d="M15 18L9 12L15 6"
- "Dark Myth Chibi Cartoon RPG UI"
- "更换"
  [SVG] <path> d="M5 12h14"
  [SVG] <path> d="M12 5v14"
- "添加节点"
- "我的 GUI (1)"
- "Home"
- "界面"
- "关注我们"
  [SVG] <path> d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7."
- "B"

## Assets

### Images
- `https://gameui.ai/gameui_logo.svg` (512x512, alt: "GameUI AI")
- `https://img.gameui.ai/style/IYVrInYx3rZiPVOsocYISkYsnRUI0JLh/WJbDfPn3HuxuDtcl.png` (1080x1080, alt: "项目 1 style thumbnail")

## States & Behaviors

> Verify hover/focus states by comparing screenshots

## Responsive Behavior

- **Desktop (1440px):** see screenshot
- **Tablet (768px):** needs testing
- **Mobile (390px):** needs testing
