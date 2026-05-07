#!/usr/bin/env node

/**
 * Playwright 有头浏览器 + 注入保存按钮
 *
 * 功能:
 *   1. 启动 Chrome (反自动化检测 + 持久化登录)
 *   2. 在每个页面右上角注入 [保存页面] 按钮
 *   3. 点击按钮抓取当前页面完整数据
 *   4. 按 域名/页面路径 分目录保存
 *   5. 自动生成 clone-playwright 所需的研究文档
 *
 * 使用: node launch-browser.mjs <url>
 */

import { createRequire } from "module";
import fs from "fs";
import path from "path";
import os from "os";

// 从项目工作目录解析 playwright (createRequire 基于项目目录)
const projectRequire = createRequire(path.join(process.cwd(), "_resolve_.js"));
let chromium;
try {
  ({ chromium } = projectRequire("playwright"));
} catch {
  console.error("[错误] 找不到 playwright, 请先运行: npm install playwright");
  process.exit(1);
}

// --- 配置 ---
const TARGET_URL = process.argv[2];
const OUTPUT_BASE = path.resolve("docs/research");
const DESIGN_REFS = path.resolve("docs/design-references");
const USER_DATA_DIR = path.join(os.homedir(), ".playwright-browser-profile");

// Playwright 注入的元素 ID, 需要过滤
const PW_IDS = new Set(["__pw_wrap", "__pw_btn", "__pw_badge"]);

// --- 工具: URL 转目录路径 ---
function urlToDir(pageUrl) {
  const u = new URL(pageUrl);
  const host = u.hostname;
  const pagePath = u.pathname.replace(/^\/+|\/+$/g, "") || "root";
  const slug = pagePath.replace(/[^\w一-鿿-]/g, "_").slice(0, 80);
  return { host, slug, fullPath: path.join(OUTPUT_BASE, host, slug) };
}

// --- 颜色归一化: rgb/rgba/hsl -> hex ---
function colorToHex(color) {
  if (!color || typeof color !== "string") return null;
  color = color.trim();
  // 已经是 hex
  if (/^#[0-9a-f]{3,8}$/i.test(color)) return color.toLowerCase();
  // rgb(r, g, b) 或 rgba(r, g, b, a)
  const rgbaMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1]);
    const g = parseInt(rgbaMatch[2]);
    const b = parseInt(rgbaMatch[3]);
    return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  }
  return null;
}

// --- 页面抓取核心 ---
async function capturePage(page) {
  const currentUrl = page.url();
  if (currentUrl === "about:blank") return null;

  const { host, slug, fullPath } = urlToDir(currentUrl);
  fs.mkdirSync(fullPath, { recursive: true });
  fs.mkdirSync(DESIGN_REFS, { recursive: true });

  console.log(`\n[抓取] ${currentUrl}`);
  console.log(`[保存] ${fullPath}`);

  // 隐藏注入的保存按钮
  await page.evaluate(() => {
    const el = document.getElementById("__pw_wrap");
    if (el) el.style.display = "none";
  });

  // 1. 截图 (全页 + 视口)
  await page.screenshot({
    path: path.join(fullPath, "screenshot.png"),
    fullPage: true,
  });
  // 视口截图
  await page.screenshot({
    path: path.join(fullPath, "viewport.png"),
  });
  // 复制到 design-references
  const refName = `${host}_${slug}.png`;
  try {
    fs.copyFileSync(
      path.join(fullPath, "screenshot.png"),
      path.join(DESIGN_REFS, refName)
    );
  } catch {}

  // 恢复保存按钮显示
  await page.evaluate(() => {
    const el = document.getElementById("__pw_wrap");
    if (el) el.style.display = "";
  });

  // 2. 滚动页面以触发 lazy-load 内容
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const height = document.body.scrollHeight;
    const step = Math.max(window.innerHeight, 600);
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await delay(300);
    }
    window.scrollTo(0, 0);
    await delay(200);
  });

  // 3. HTML 源码
  const html = await page.content();
  fs.writeFileSync(path.join(fullPath, "page.html"), html, "utf-8");

  // 4. 计算样式 (增强版: 更多样素, 不过滤关键值)
  const stylesData = await page.evaluate(() => {
    const selectors = [
      "header", "nav", "footer", "main", "section", "article", "aside",
      "[class*='hero']", "[class*='feature']", "[class*='workflow']",
      "[class*='cta']", "[class*='card']", "[class*='banner']",
      "[class*='sidebar']", "[class*='modal']", "[class*='tab']",
      "[class*='grid']", "[class*='flex']", "[class*='gallery']",
      "[class*='slider']", "[class*='carousel']", "[class*='form']",
      "[class*='input']", "[class*='search']", "[class*='menu']",
      "[class*='overlay']", "[class*='dropdown']", "[class*='tooltip']",
      "[class*='avatar']", "[class*='badge']", "[class*='toast']",
      "[class*='social']", "[class*='share']", "[class*='style']",
      "[class*='project']", "[class*='explore']", "[class*='step']",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "button", "a[role='button']", "a",
      "img", "video", "canvas",
      "input", "textarea", "select", "[role='checkbox']",
      "[id]", "[data-testid]", "[role]",
      "[class*='dark']", "[class*='light']",
      "[class*='rounded']", "[class*='shadow']",
    ].join(", ");
    const elements = document.querySelectorAll(selectors);
    const props = [
      "fontSize", "fontWeight", "fontFamily", "lineHeight", "letterSpacing",
      "color", "textTransform", "textDecoration",
      "backgroundColor", "background", "backgroundImage",
      "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
      "margin", "marginTop", "marginRight", "marginBottom", "marginLeft",
      "width", "height", "maxWidth", "minWidth", "maxHeight", "minHeight",
      "display", "flexDirection", "justifyContent", "alignItems", "gap",
      "gridTemplateColumns", "gridTemplateRows",
      "borderRadius", "border", "boxShadow", "overflow",
      "position", "top", "right", "bottom", "left", "zIndex",
      "opacity", "transform", "transition", "cursor",
      "objectFit", "filter", "backdropFilter", "visibility",
    ];
    const results = [];
    elements.forEach((el, i) => {
      if (i > 500) return;
      // 跳过 Playwright 注入元素
      if (el.id && el.id.startsWith("__pw_")) return;
      const cs = getComputedStyle(el);
      const styles = {};
      props.forEach((p) => {
        const v = cs[p];
        // 只过滤空值, 保留 "none"/"auto"/"0px" 等有意义的信息
        if (v !== undefined && v !== "") {
          styles[p] = v;
        }
      });
      const cls = typeof el.className === "string"
        ? el.className.split(" ").filter(Boolean)
        : [];
      results.push({
        tag: el.tagName.toLowerCase(),
        classes: cls,
        text: el.textContent?.trim().slice(0, 300) || "",
        styles,
        rect: (() => {
          try {
            const r = el.getBoundingClientRect();
            return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
          } catch { return null; }
        })(),
      });
    });
    return results;
  });
  fs.writeFileSync(
    path.join(fullPath, "computed-styles.json"),
    JSON.stringify(stylesData, null, 2),
    "utf-8"
  );

  // 5. CSS 变量 (增强版: 所有规则中的变量 + keyframes + media)
  const cssData = await page.evaluate(() => {
    const vars = {};
    const keyframes = {};
    const mediaBreakpoints = [];
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            // CSS 变量: 收集所有选择器的
            if (rule.style) {
              for (let i = 0; i < rule.style.length; i++) {
                const prop = rule.style[i];
                if (prop.startsWith("--")) {
                  const sel = rule.selectorText || "*";
                  if (!vars[sel]) vars[sel] = {};
                  vars[sel][prop] = rule.style.getPropertyValue(prop).trim();
                }
              }
            }
            // @keyframes
            if (rule.type === 7 && rule.name) {
              keyframes[rule.name] = Array.from(rule.cssRules).map((r) => r.cssText);
            }
            // @media
            if (rule.type === 4 && rule.conditionText) {
              mediaBreakpoints.push(rule.conditionText);
            }
          }
        } catch {
          // 跨域样式表无法访问
        }
      }
    } catch {}
    return { vars, keyframes, mediaBreakpoints };
  });
  fs.writeFileSync(
    path.join(fullPath, "css-variables.json"),
    JSON.stringify(cssData.vars, null, 2),
    "utf-8"
  );
  if (Object.keys(cssData.keyframes).length) {
    fs.writeFileSync(
      path.join(fullPath, "keyframes.json"),
      JSON.stringify(cssData.keyframes, null, 2),
      "utf-8"
    );
  }
  if (cssData.mediaBreakpoints.length) {
    fs.writeFileSync(
      path.join(fullPath, "media-breakpoints.json"),
      JSON.stringify([...new Set(cssData.mediaBreakpoints)], null, 2),
      "utf-8"
    );
  }

  // 6. DOM 结构 (增强版: 更深, 保留 SVG, 记录 rect 和布局信息)
  const domStructure = await page.evaluate(() => {
    const skipTags = new Set(["script", "style", "noscript", "br", "hr", "link", "meta"]);
    function walk(el, depth) {
      if (depth > 12) return null;
      const tag = el.tagName?.toLowerCase();
      if (!tag || skipTags.has(tag)) return null;
      // 跳过 Playwright 注入元素
      if (el.id && el.id.startsWith("__pw_")) return null;
      const result = { tag };
      if (el.id) result.id = el.id;
      const cls = typeof el.className === "string"
        ? el.className.split(" ").filter(Boolean).slice(0, 15)
        : [];
      if (cls.length) result.classes = cls;
      // 文本内容: 收集直接文本节点
      const text = el.childNodes.length === 1 && el.childNodes[0].nodeType === 3
        ? el.textContent?.trim().slice(0, 300)
        : null;
      if (text) result.text = text;
      // 布局信息
      try {
        const cs = getComputedStyle(el);
        const layout = {
          display: cs.display,
        };
        if (cs.display === "flex" || cs.display === "inline-flex") {
          layout.flexDirection = cs.flexDirection;
          layout.justifyContent = cs.justifyContent;
          layout.alignItems = cs.alignItems;
          if (cs.gap && cs.gap !== "normal") layout.gap = cs.gap;
        }
        if (cs.display === "grid" || cs.display === "inline-grid") {
          layout.gridTemplateColumns = cs.gridTemplateColumns;
          layout.gridTemplateRows = cs.gridTemplateRows;
          if (cs.gap && cs.gap !== "normal") layout.gap = cs.gap;
        }
        if (cs.position && cs.position !== "static") layout.position = cs.position;
        // 简化: 只记录语义化标签和关键元素的 rect
        const semanticTags = new Set(["header", "nav", "main", "section", "article", "aside", "footer"]);
        if (semanticTags.has(tag) || cls.some((c) => /^(hero|feature|card|sidebar|banner|modal|gallery|workflow|cta|style|project|explore|step)/.test(c))) {
          const r = el.getBoundingClientRect();
          layout.rect = { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
        }
        result.layout = layout;
      } catch {}
      // SVG: 只抓 2 层 (svg + 直接子元素)
      if (tag === "svg") {
        result.svg = true;
        result.viewBox = el.getAttribute("viewBox") || "";
        const svgChildren = Array.from(el.children).slice(0, 10).map((c) => ({
          tag: c.tagName?.toLowerCase(),
          d: c.getAttribute("d") || "",
          fill: c.getAttribute("fill") || "",
          stroke: c.getAttribute("stroke") || "",
        })).filter((c) => c.tag);
        if (svgChildren.length) result.children = svgChildren;
        return result;
      }
      const children = Array.from(el.children)
        .map((c) => walk(c, depth + 1))
        .filter(Boolean);
      if (children.length) result.children = children.slice(0, 50);
      return result;
    }
    return JSON.stringify(walk(document.body, 0), null, 2);
  });
  fs.writeFileSync(
    path.join(fullPath, "dom-structure.json"),
    domStructure,
    "utf-8"
  );

  // 7. 页面链接
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a[href]"))
      .map((a) => ({
        href: a.href,
        text: a.textContent?.trim().slice(0, 80),
        classes: typeof a.className === "string" ? a.className.split(" ").filter(Boolean).slice(0, 5) : [],
      }))
      .filter((l) => l.href && !l.href.startsWith("javascript:"));
  });
  fs.writeFileSync(
    path.join(fullPath, "page-links.json"),
    JSON.stringify(links, null, 2),
    "utf-8"
  );

  // 8. 资源清单 (增强版: 图片关联最近语义祖先)
  const assets = await page.evaluate(() => {
    // 为图片找到最近的语义祖先 (section/header/main/aside/article)
    const semanticTags = new Set(["SECTION", "HEADER", "MAIN", "ASIDE", "ARTICLE", "FOOTER", "NAV"]);
    function findSemanticParent(el) {
      let parent = el.parentElement;
      while (parent) {
        if (semanticTags.has(parent.tagName)) {
          return parent.tagName.toLowerCase() + (parent.id ? `#${parent.id}` : "") +
            (typeof parent.className === "string" ? `.${parent.className.split(" ")[0]}` : "");
        }
        parent = parent.parentElement;
      }
      return "";
    }

    return {
      images: [...document.querySelectorAll("img")].map((img) => ({
        src: img.src || img.currentSrc,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
        parentClasses: img.parentElement?.className?.split(" ").filter(Boolean).slice(0, 3),
        section: findSemanticParent(img),
      })),
      videos: [...document.querySelectorAll("video")].map((v) => ({
        src: v.src || v.querySelector("source")?.src,
        poster: v.poster,
        autoplay: v.autoplay,
        loop: v.loop,
        muted: v.muted,
      })),
      backgroundImages: [...document.querySelectorAll("*")]
        .slice(0, 500)
        .filter((el) => {
          const bg = getComputedStyle(el).backgroundImage;
          return bg && bg !== "none";
        })
        .map((el) => {
          const bg = getComputedStyle(el).backgroundImage;
          // 提取 url()
          const urls = [];
          const urlRegex = /url\(["']?([^"')]+)["']?\)/g;
          let m;
          while ((m = urlRegex.exec(bg)) !== null) urls.push(m[1]);
          return {
            urls,
            raw: bg,
            element: el.tagName + (el.id ? `#${el.id}` : "") + (typeof el.className === "string" ? `.${el.className.split(" ")[0]}` : ""),
          };
        }),
      fonts: [...new Set(
        [...document.querySelectorAll("*")]
          .slice(0, 300)
          .map((el) => getComputedStyle(el).fontFamily)
      )],
      favicons: [...document.querySelectorAll("link[rel*='icon']")].map((l) => ({
        href: l.href,
        sizes: l.sizes?.toString(),
      })),
    };
  });
  fs.writeFileSync(
    path.join(fullPath, "assets.json"),
    JSON.stringify(assets, null, 2),
    "utf-8"
  );

  // 9. 表单数据
  const formData = await page.evaluate(() => {
    const forms = [];
    document.querySelectorAll("input, textarea, select, [role='checkbox']").forEach((el) => {
      if (el.id && el.id.startsWith("__pw_")) return;
      const tag = el.tagName.toLowerCase();
      forms.push({
        tag,
        type: el.type || "",
        name: el.name || "",
        placeholder: el.placeholder || "",
        value: tag === "input" && (el.type === "password" || el.type === "email") ? "" : (el.value || ""),
        required: el.required,
        maxLength: el.maxLength > 0 ? el.maxLength : null,
        checked: el.checked || null,
        classes: typeof el.className === "string" ? el.className.split(" ").filter(Boolean).slice(0, 5) : [],
        id: el.id || "",
        rows: tag === "textarea" ? el.rows : null,
        ariaLabel: el.getAttribute("aria-label") || "",
      });
    });
    return forms;
  });
  fs.writeFileSync(
    path.join(fullPath, "forms.json"),
    JSON.stringify(formData, null, 2),
    "utf-8"
  );

  // 10. SVG 图标提取
  const svgIcons = await page.evaluate(() => {
    const icons = [];
    document.querySelectorAll("svg").forEach((svg) => {
      if (svg.id?.startsWith("__pw_")) return;
      const html = svg.outerHTML;
      // 跳过太大的 SVG (可能是图表, 不是图标)
      if (html.length > 5000) return;
      const ariaLabel = svg.getAttribute("aria-label") || "";
      const cls = typeof svg.className === "string"
        ? svg.className : (svg.className?.baseVal || "");
      const parentText = svg.parentElement?.textContent?.trim().slice(0, 30) || "";
      icons.push({
        html,
        viewBox: svg.getAttribute("viewBox") || "",
        width: svg.getAttribute("width") || "",
        height: svg.getAttribute("height") || "",
        classes: cls.split(" ").filter(Boolean).slice(0, 5),
        ariaLabel,
        context: parentText,
      });
    });
    return icons;
  });
  fs.writeFileSync(
    path.join(fullPath, "svg-icons.json"),
    JSON.stringify(svgIcons, null, 2),
    "utf-8"
  );

  // 11. 区块视觉映射
  const sectionsVisual = await page.evaluate(() => {
    const semanticTags = new Set(["HEADER", "NAV", "MAIN", "ASIDE", "ARTICLE", "FOOTER", "SECTION"]);
    const sections = [];
    document.querySelectorAll("*").forEach((el) => {
      if (el.id?.startsWith("__pw_")) return;
      const tag = el.tagName.toLowerCase();
      const cls = typeof el.className === "string" ? el.className : "";
      const isSemantic = semanticTags.has(el.tagName);
      const hasSectionClass = /\b(hero|feature|workflow|cta|banner|card|footer|sidebar|gallery|style|project|explore|step|content|tab|form|search|menu|modal|avatar|badge|social|share|pricing|testimonial|faq|about|team|contact)\b/i.test(cls);
      if (isSemantic || hasSectionClass) {
        const rect = el.getBoundingClientRect();
        sections.push({
          tag,
          id: el.id || "",
          classes: cls.split(" ").filter(Boolean).slice(0, 8),
          rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
          text: el.textContent?.trim().slice(0, 100) || "",
          childCount: el.children.length,
        });
      }
    });
    // 按 y 坐标排序 (视觉从上到下)
    sections.sort((a, b) => a.rect.y - b.rect.y);
    return sections;
  });
  fs.writeFileSync(
    path.join(fullPath, "sections-visual.json"),
    JSON.stringify(sectionsVisual, null, 2),
    "utf-8"
  );

  // 12. 页面摘要
  const pageTitle = await page.title();
  const summary = [
    `# ${pageTitle}`,
    "",
    `- URL: ${currentUrl}`,
    `- Domain: ${host}`,
    `- Page: ${slug}`,
    `- Elements with styles: ${stylesData.length}`,
    `- Links: ${links.length}`,
    `- Images: ${assets.images.length}`,
    `- Videos: ${assets.videos.length}`,
    `- Background images: ${assets.backgroundImages.length}`,
    `- CSS variables: ${Object.keys(cssData.vars).reduce((acc, sel) => acc + Object.keys(cssData.vars[sel]).length, 0)}`,
    `- Keyframes: ${Object.keys(cssData.keyframes).length}`,
    `- Media breakpoints: ${cssData.mediaBreakpoints.length}`,
    `- SVG icons: ${svgIcons.length}`,
    `- Form elements: ${formData.length}`,
    `- Visual sections: ${sectionsVisual.length}`,
    "- Fonts: " + assets.fonts.join(", "),
    "",
    "## Files",
    "",
    "| File | Description |",
    "|------|-------------|",
    "| screenshot.png | Full page screenshot |",
    "| viewport.png | Viewport-only screenshot |",
    "| page.html | Complete HTML source |",
    "| computed-styles.json | CSS computed styles (" + stylesData.length + " elements) |",
    "| css-variables.json | CSS custom properties |",
    "| keyframes.json | CSS @keyframes animations |",
    "| media-breakpoints.json | CSS @media breakpoints |",
    "| dom-structure.json | DOM hierarchy (deep) |",
    "| page-links.json | Page links (" + links.length + ") |",
    "| assets.json | Image/video/font inventory |",
    "| forms.json | Form elements inventory |",
    "| svg-icons.json | SVG icon extraction |",
    "| sections-visual.json | Visual section mapping |",
    "| page-summary.md | This file |",
    "",
  ].join("\n");
  fs.writeFileSync(
    path.join(fullPath, "page-summary.md"),
    summary,
    "utf-8"
  );

  console.log(
    `[完成] ${stylesData.length} styles, ${links.length} links, ${assets.images.length} images, ${sectionsVisual.length} sections`
  );

  // 13. 生成 clone-website 所需的研究文档
  const domainDir = path.join(OUTPUT_BASE, host);
  generateResearchDocs(domainDir, stylesData, cssData.vars, domStructure, links, assets, currentUrl, pageTitle, sectionsVisual, svgIcons);

  return fullPath;
}

// ============================================================
// clone-website 研究文档生成
// ============================================================

function generateResearchDocs(domainDir, stylesData, cssVars, domStructure, links, assets, pageUrl, pageTitle, sectionsVisual, svgIcons) {
  const componentsDir = path.join(domainDir, "components");
  fs.mkdirSync(componentsDir, { recursive: true });

  generateDesignTokens(domainDir, stylesData, cssVars, assets);
  generateComponentInventory(domainDir, stylesData, domStructure, assets, sectionsVisual);
  generateLayoutArchitecture(domainDir, domStructure);
  generatePageTopology(domainDir, stylesData, domStructure, sectionsVisual, pageUrl, pageTitle);
  generateComponentSpecs(componentsDir, domainDir, stylesData, domStructure, assets, pageUrl, sectionsVisual);

  console.log("[研究文档] 已生成 clone-website 格式的研究文档");
}

// --- 辅助: 颜色归一化 (Node.js 侧) ---
function normalizeColor(color) {
  if (!color || typeof color !== "string") return null;
  color = color.trim();
  if (/^#[0-9a-f]{3,8}$/i.test(color)) return color.toLowerCase();
  const m = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) {
    return "#" + [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])]
      .map((v) => v.toString(16).padStart(2, "0")).join("");
  }
  return null;
}

// --- 辅助: 从渐变字符串提取颜色 ---
function extractGradientColors(bg) {
  if (!bg || typeof bg !== "string") return [];
  const colors = [];
  // 匹配 rgb/rgba 颜色
  const rgbaRegex = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\)/g;
  let m;
  while ((m = rgbaRegex.exec(bg)) !== null) {
    const hex = normalizeColor(m[0]);
    if (hex) colors.push(hex);
  }
  // 匹配 hex 颜色
  const hexRegex = /#[0-9a-f]{3,8}/gi;
  while ((m = hexRegex.exec(bg)) !== null) {
    colors.push(m[0].toLowerCase());
  }
  return colors;
}

// --- DESIGN_TOKENS.md (增强版) ---
function generateDesignTokens(dir, stylesData, cssVars, assets) {
  const colorCounts = new Map();
  const gradientColors = new Map();
  const typography = [];
  const spacing = new Set();
  const radii = new Set();
  const shadows = new Set();
  const zIndexes = new Map();
  const blurEffects = new Set();

  for (const item of stylesData) {
    const s = item.styles;
    // 颜色 (归一化)
    [s.color, s.backgroundColor].filter(Boolean).forEach((c) => {
      if (c === "rgba(0, 0, 0, 0)") return;
      const hex = normalizeColor(c);
      if (hex) colorCounts.set(hex, (colorCounts.get(hex) || 0) + 1);
    });
    // 渐变颜色提取
    const bg = s.background || s.backgroundImage;
    if (bg && bg.includes("gradient")) {
      extractGradientColors(bg).forEach((c) => {
        gradientColors.set(c, (gradientColors.get(c) || 0) + 1);
      });
    }
    // 排版
    if (s.fontFamily) {
      typography.push({
        family: s.fontFamily,
        weight: s.fontWeight || "",
        size: s.fontSize || "",
        lineHeight: s.lineHeight || "",
        letterSpacing: s.letterSpacing || "",
        tag: item.tag,
        classes: item.classes?.slice(0, 3).join(".") || "",
      });
    }
    // 间距
    if (s.padding) spacing.add(s.padding);
    if (s.margin) spacing.add(s.margin);
    if (s.gap && s.gap !== "normal") spacing.add(s.gap);
    // 圆角
    if (s.borderRadius && s.borderRadius !== "0px") radii.add(s.borderRadius);
    // 阴影
    if (s.boxShadow && s.boxShadow !== "none") shadows.add(s.boxShadow);
    // z-index
    if (s.zIndex && s.zIndex !== "auto") zIndexes.set(item.tag + "." + (item.classes?.[0] || ""), s.zIndex);
    // 模糊效果
    if (s.filter && s.filter !== "none") blurEffects.add(s.filter);
    if (s.backdropFilter && s.backdropFilter !== "none") blurEffects.add(s.backdropFilter);
  }

  // 合并渐变颜色到主颜色表
  for (const [color, count] of gradientColors) {
    colorCounts.set(color, (colorCounts.get(color) || 0) + count);
  }

  // 排版去重
  const seenFonts = new Set();
  const uniqueTypography = typography.filter((t) => {
    const key = `${t.family}|${t.weight}|${t.size}|${t.lineHeight}|${t.letterSpacing}`;
    if (seenFonts.has(key)) return false;
    seenFonts.add(key);
    return true;
  });

  const lines = [
    "# Design Tokens",
    "",
    "> Extracted by open-playwright from computed styles (enhanced)",
    "",
    "## CSS Custom Properties",
    "",
  ];

  // CSS 变量分类
  const colorVars = {};
  const spacingVars = {};
  const fontVars = {};
  const otherVars = {};
  for (const [selector, props] of Object.entries(cssVars)) {
    for (const [key, value] of Object.entries(props)) {
      if (/color|bg|background|border-color|accent|primary|secondary|muted|foreground/i.test(key)) {
        colorVars[key] = value;
      } else if (/space|spacing|gap|padding|margin|radius|width|height|size/i.test(key)) {
        spacingVars[key] = value;
      } else if (/font|text|line|letter/i.test(key)) {
        fontVars[key] = value;
      } else {
        otherVars[key] = value;
      }
    }
  }

  if (Object.keys(colorVars).length) {
    lines.push("### Colors", "", "| Variable | Value |", "|----------|-------|");
    for (const [k, v] of Object.entries(colorVars)) lines.push(`| \`${k}\` | \`${v}\` |`);
    lines.push("");
  }
  if (Object.keys(spacingVars).length) {
    lines.push("### Spacing", "", "| Variable | Value |", "|----------|-------|");
    for (const [k, v] of Object.entries(spacingVars)) lines.push(`| \`${k}\` | \`${v}\` |`);
    lines.push("");
  }
  if (Object.keys(fontVars).length) {
    lines.push("### Typography Variables", "", "| Variable | Value |", "|----------|-------|");
    for (const [k, v] of Object.entries(fontVars)) lines.push(`| \`${k}\` | \`${v}\` |`);
    lines.push("");
  }
  if (Object.keys(otherVars).length) {
    lines.push("### Other", "", "| Variable | Value |", "|----------|-------|");
    for (const [k, v] of Object.entries(otherVars)) lines.push(`| \`${k}\` | \`${v}\` |`);
    lines.push("");
  }

  // 提取的颜色 (归一化后)
  lines.push("## Extracted Colors (normalized to hex)", "", "| Color | Usage Count |", "|-------|-------------|");
  for (const [color, count] of [...colorCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 50)) {
    lines.push(`| \`${color}\` | ${count} |`);
  }
  lines.push("");

  // 排版
  lines.push("## Typography", "", "| Family | Weight | Size | Line Height | Letter Spacing | Used By |", "|--------|--------|------|-------------|----------------|---------|");
  for (const t of uniqueTypography.slice(0, 50)) {
    lines.push(`| \`${t.family.slice(0, 60)}\` | ${t.weight} | ${t.size} | ${t.lineHeight} | ${t.letterSpacing} | <${t.tag}> |`);
  }
  lines.push("");

  // 间距
  lines.push("## Spacing Values", "");
  for (const s of [...spacing].sort()) lines.push(`- \`${s}\``);
  lines.push("");

  // 圆角
  if (radii.size) {
    lines.push("## Border Radius", "");
    for (const r of [...radii].sort()) lines.push(`- \`${r}\``);
    lines.push("");
  }

  // 阴影
  if (shadows.size) {
    lines.push("## Box Shadows", "");
    for (const s of [...shadows]) lines.push(`- \`${s}\``);
    lines.push("");
  }

  // z-index 层级
  if (zIndexes.size) {
    lines.push("## Z-Index Layers", "", "| Element | Z-Index |", "|---------|---------|");
    for (const [el, z] of [...zIndexes.entries()].sort((a, b) => parseInt(b[1]) - parseInt(a[1]))) {
      lines.push(`| \`${el}\` | ${z} |`);
    }
    lines.push("");
  }

  // 模糊效果
  if (blurEffects.size) {
    lines.push("## Blur Effects", "");
    for (const b of [...blurEffects]) lines.push(`- \`${b}\``);
    lines.push("");
  }

  // 字体列表
  if (assets.fonts?.length) {
    lines.push("## Font Families (from DOM)", "");
    for (const f of assets.fonts) lines.push(`- \`${f}\``);
    lines.push("");
  }

  fs.writeFileSync(path.join(dir, "DESIGN_TOKENS.md"), lines.join("\n"), "utf-8");
}

// --- COMPONENT_INVENTORY.md (增强版) ---
function generateComponentInventory(dir, stylesData, domStructure, assets, sectionsVisual) {
  const dom = typeof domStructure === "string" ? JSON.parse(domStructure) : domStructure;

  const components = [];
  // 扩展关键词: 英文 + 中文
  const sectionKeywords = [
    "header", "navbar", "nav", "hero", "banner", "feature", "benefit",
    "workflow", "step", "how-it-work", "cta", "call-to-action", "footer",
    "pricing", "testimonial", "faq", "about", "team", "contact",
    "card", "sidebar", "slider", "carousel", "gallery", "portfolio",
    "form", "input", "search", "menu", "overlay", "dropdown", "tooltip",
    "tab", "accordion", "modal", "popup", "dialog", "toast", "notification",
    "avatar", "badge", "tag", "pill", "social", "share", "button",
    "checkbox", "toggle", "switch", "table", "list", "grid", "masonry",
    "timeline", "process", "counter", "stats", "chart", "progress",
    "style", "project", "explore", "content", "editor", "preview",
    // 中文关键词
    "侧边栏", "头部", "底部", "导航", "画廊", "工作流",
    "风格", "项目", "探索", "步骤", "卡片", "菜单",
  ];

  function findSections(el, depth) {
    if (!el) return;
    // 过滤 Playwright 注入
    if (el.id && PW_IDS.has(el.id)) return;
    // 先检查当前元素
    const cls = (el.classes || []).join(" ").toLowerCase();
    const id = (el.id || "").toLowerCase();
    const tag = el.tag;

    const isSection = ["section", "header", "nav", "footer", "main", "article", "aside"].includes(tag);
    const hasSectionClass = sectionKeywords.some((kw) => cls.includes(kw) || id.includes(kw));

    if (isSection || hasSectionClass) {
      const name = inferComponentName(tag, cls, id, el);
      const childCount = countDescendants(el);
      // 收集内部元素信息
      const innerButtons = [];
      const innerHeadings = [];
      const innerImages = [];
      collectInnerElements(el, innerButtons, innerHeadings, innerImages, 0);

      components.push({
        name,
        tag,
        classes: el.classes || [],
        id: el.id || "",
        childCount,
        text: el.text || "",
        depth,
        innerButtons: innerButtons.length,
        innerHeadings: innerHeadings.length,
        innerImages: innerImages.length,
      });
    }

    // 递归 (深度增加到 6)
    if (el.children && depth < 6) {
      el.children.forEach((c) => findSections(c, depth + 1));
    }
  }

  findSections(dom, 0);

  // 去重: 名称 + 位置索引
  const seen = new Set();
  let nameIdx = {};
  const uniqueComponents = components.filter((c) => {
    if (!nameIdx[c.name]) nameIdx[c.name] = 0;
    nameIdx[c.name]++;
    const key = `${c.name}_${nameIdx[c.name]}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // 从 stylesData 补充
  const buttons = stylesData.filter((s) => s.tag === "button" || s.tag === "a");
  const headings = stylesData.filter((s) => /^h[1-6]$/.test(s.tag));
  const forms = stylesData.filter((s) => ["input", "textarea", "select"].includes(s.tag));

  const lines = [
    "# Component Inventory",
    "",
    "> Extracted by open-playwright (enhanced)",
    "",
    "## Page Sections",
    "",
    "| # | Component | Tag | Classes | Children | Buttons | Headings | Images | Text |",
    "|---|-----------|-----|---------|----------|---------|----------|--------|------|",
  ];

  uniqueComponents.forEach((c, i) => {
    const cls = c.classes.slice(0, 4).join(", ");
    const text = c.text ? c.text.slice(0, 50) : "";
    lines.push(`| ${i + 1} | ${c.name} | <${c.tag}> | \`${cls}\` | ${c.childCount} | ${c.innerButtons} | ${c.innerHeadings} | ${c.innerImages} | ${text} |`);
  });

  lines.push("", "## Buttons & Links", "", "| Tag | Classes | Text |", "|-----|---------|------|");
  buttons.slice(0, 50).forEach((b) => {
    lines.push(`| <${b.tag}> | \`${(b.classes || []).slice(0, 4).join(".")}\` | ${b.text?.slice(0, 60) || ""} |`);
  });

  lines.push("", "## Headings", "", "| Tag | Classes | Text |", "|-----|---------|------|");
  headings.forEach((h) => {
    lines.push(`| <${h.tag}> | \`${(h.classes || []).slice(0, 3).join(".")}\` | ${h.text?.slice(0, 80) || ""} |`);
  });

  if (forms.length) {
    lines.push("", "## Form Elements", "", "| Tag | Classes | Text |", "|-----|---------|------|");
    forms.forEach((f) => {
      lines.push(`| <${f.tag}> | \`${(f.classes || []).slice(0, 3).join(".")}\` | ${f.text?.slice(0, 60) || ""} |`);
    });
  }

  lines.push("", "## All Styled Elements", "", "| Tag | Classes | Text Preview |", "|-----|---------|-------------|");
  stylesData.slice(0, 80).forEach((el) => {
    lines.push(`| <${el.tag}> | \`${(el.classes || []).slice(0, 3).join(".")}\` | ${el.text?.slice(0, 60) || ""} |`);
  });
  lines.push("");

  fs.writeFileSync(path.join(dir, "COMPONENT_INVENTORY.md"), lines.join("\n"), "utf-8");
}

// --- LAYOUT_ARCHITECTURE.md (增强版) ---
function generateLayoutArchitecture(dir, domStructure) {
  const dom = typeof domStructure === "string" ? JSON.parse(domStructure) : domStructure;

  const lines = [
    "# Layout Architecture",
    "",
    "> Extracted by open-playwright (enhanced)",
    "",
    "## DOM Tree (annotated with layout info)",
    "",
    "```",
  ];

  function printTree(el, depth) {
    if (!el) return;
    if (el.id && PW_IDS.has(el.id)) return;
    const indent = "  ".repeat(depth);
    const cls = (el.classes || []).length ? `.${(el.classes || []).slice(0, 4).join(".")}` : "";
    const id = el.id ? `#${el.id}` : "";
    const text = el.text ? ` "${el.text.slice(0, 40)}"` : "";
    const childInfo = el.children?.length ? ` (${el.children.length} children)` : "";
    // 布局标注
    let layoutTag = "";
    if (el.layout) {
      const parts = [];
      if (el.layout.display && el.layout.display !== "block") parts.push(el.layout.display);
      if (el.layout.flexDirection && el.layout.flexDirection !== "row") parts.push(`dir:${el.layout.flexDirection}`);
      if (el.layout.justifyContent && el.layout.justifyContent !== "start") parts.push(`jc:${el.layout.justifyContent}`);
      if (el.layout.alignItems && el.layout.alignItems !== "stretch") parts.push(`ai:${el.layout.alignItems}`);
      if (el.layout.gap) parts.push(`gap:${el.layout.gap}`);
      if (el.layout.gridTemplateColumns) parts.push(`cols:${el.layout.gridTemplateColumns}`);
      if (el.layout.position) parts.push(`pos:${el.layout.position}`);
      if (parts.length) layoutTag = ` [${parts.join(", ")}]`;
    }
    lines.push(`${indent}<${el.tag}${id}${cls}>${text}${childInfo}${layoutTag}`);
    if (el.children && depth < 8) {
      el.children.slice(0, 30).forEach((c) => printTree(c, depth + 1));
    }
  }

  if (dom) printTree(dom, 0);

  lines.push("```", "");

  lines.push("## Layout Observations", "");
  lines.push("- Layout info annotated per node: display, flexDirection, justifyContent, alignItems, gap, gridTemplateColumns, position");
  lines.push("- Nodes with semantic tags or section-related classes include rect dimensions");
  lines.push("- See computed-styles.json for complete CSS values");
  lines.push("- See sections-visual.json for bounding box coordinates");
  lines.push("");

  fs.writeFileSync(path.join(dir, "LAYOUT_ARCHITECTURE.md"), lines.join("\n"), "utf-8");
}

// --- PAGE_TOPOLOGY.md (增强版) ---
function generatePageTopology(dir, stylesData, domStructure, sectionsVisual, pageUrl, pageTitle) {
  const dom = typeof domStructure === "string" ? JSON.parse(domStructure) : domStructure;

  const lines = [
    "# Page Topology",
    "",
    `> URL: ${pageUrl}`,
    `> Title: ${pageTitle}`,
    "",
    "## Section Order (top to bottom, by visual position)",
    "",
  ];

  // 优先使用 visual sections (按 y 坐标排序)
  if (sectionsVisual && sectionsVisual.length > 0) {
    sectionsVisual.forEach((section, i) => {
      const name = inferComponentName(section.tag, section.classes.join(" "), section.id, section);
      lines.push(`### ${i + 1}. ${name}`);
      lines.push(`- Tag: <${section.tag}>`);
      if (section.classes?.length) lines.push(`- Classes: \`${section.classes.slice(0, 5).join(".")}\``);
      if (section.id) lines.push(`- ID: #${section.id}`);
      lines.push(`- Children: ${section.childCount}`);
      lines.push(`- Position: x=${section.rect.x}, y=${section.rect.y}, w=${section.rect.w}, h=${section.rect.h}`);
      if (section.text) lines.push(`- Text: "${section.text.slice(0, 80)}"`);
      lines.push("");
    });
  } else {
    // 退化: 从 DOM 树提取
    function findSectionsDeep(el, depth, results) {
      if (!el || depth > 6) return;
      if (el.id && PW_IDS.has(el.id)) return;
      const tag = el.tag;
      const isSection = ["header", "nav", "main", "section", "article", "footer", "aside"].includes(tag);
      if (isSection) {
        results.push(el);
      } else if (el.children) {
        el.children.forEach((c) => findSectionsDeep(c, depth + 1, results));
      }
    }
    const sections = [];
    if (dom?.children) dom.children.forEach((c) => findSectionsDeep(c, 0, sections));
    sections.forEach((section, i) => {
      const name = inferComponentName(section.tag, (section.classes || []).join(" "), section.id || "", section);
      lines.push(`### ${i + 1}. ${name}`);
      lines.push(`- Tag: <${section.tag}>`);
      if (section.classes?.length) lines.push(`- Classes: \`${section.classes.join(".")}\``);
      if (section.id) lines.push(`- ID: #${section.id}`);
      lines.push(`- Children: ${section.children?.length || 0}`);
      if (section.text) lines.push(`- Text: "${section.text.slice(0, 80)}"`);
      lines.push("");
    });
  }

  // z-index 和固定元素
  const fixedElements = stylesData.filter((s) => s.styles.position === "fixed" || s.styles.position === "sticky");
  if (fixedElements.length) {
    lines.push("## Fixed/Sticky Elements", "");
    fixedElements.forEach((el) => {
      lines.push(`- <${el.tag}> .${(el.classes || []).slice(0, 3).join(".")} - position: ${el.styles.position}, zIndex: ${el.styles.zIndex || "auto"}`);
    });
    lines.push("");
  }

  lines.push("## Notes", "");
  lines.push("- Sections listed in visual order (top to bottom) based on bounding rectangles");
  lines.push("- Dimensions are in pixels from the viewport origin");
  lines.push("- See individual component specs in `components/` for detailed styles");
  lines.push("");

  fs.writeFileSync(path.join(dir, "PAGE_TOPOLOGY.md"), lines.join("\n"), "utf-8");
}

// --- components/*.spec.md (增强版) ---
function generateComponentSpecs(componentsDir, domainDir, stylesData, domStructure, assets, pageUrl, sectionsVisual) {
  const dom = typeof domStructure === "string" ? JSON.parse(domStructure) : domStructure;

  // 收集所有 section 级别的组件 (深度增加到 6)
  const sections = [];
  function collectSections(el, depth) {
    if (!el || depth > 6) return;
    if (el.id && PW_IDS.has(el.id)) return;
    const tag = el.tag;
    const cls = (el.classes || []).join(" ").toLowerCase();
    const isSection = ["header", "nav", "main", "section", "article", "footer", "aside"].includes(tag);
    const hasSectionKeyword = /\b(hero|feature|workflow|cta|banner|card|footer|nav|header|pricing|testimonial|faq|about|team|content|sidebar|gallery|style|project|explore|step|form|search|menu|modal|avatar|badge|social|share|tab)\b/i.test(cls);

    if (isSection || hasSectionKeyword) {
      sections.push(el);
    } else if (el.children) {
      el.children.forEach((c) => collectSections(c, depth + 1));
    }
  }

  if (dom?.children) dom.children.forEach((c) => collectSections(c, 0));

  // 如果没找到, 用 visual sections
  if (sections.length === 0 && sectionsVisual?.length) {
    // 无法直接从 sectionsVisual 恢复 DOM, 记录到 unknown spec
  }

  // 如果还是没有, 用顶层元素
  if (sections.length === 0 && dom?.children) {
    dom.children.filter(Boolean).filter((c) => !PW_IDS.has(c.id)).forEach((c) => sections.push(c));
  }

  // 为每个 section 生成 spec 文件
  const generated = new Set();
  let nameCounter = {};
  for (const section of sections) {
    let name = inferComponentName(section.tag, (section.classes || []).join(" "), section.id || "", section);
    // 去重: 添加索引
    if (!nameCounter[name]) nameCounter[name] = 0;
    nameCounter[name]++;
    if (nameCounter[name] > 1) name = `${name}${nameCounter[name]}`;

    const filename = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".spec.md";
    if (generated.has(filename)) continue;
    generated.add(filename);

    // 收集 section 子树中的所有 tag 和 class (用于精确匹配)
    const sectionTagClasses = new Set();
    collectTagClasses(section, sectionTagClasses);

    // 精确匹配: 只收集 section 子树内元素的样式
    const relatedStyles = stylesData.filter((s) => {
      return (s.classes || []).some((c) => sectionTagClasses.has(c)) ||
             sectionTagClasses.has(s.tag);
    });

    const lines = [
      `# ${name} Specification`,
      "",
      `> Source: ${pageUrl}`,
      "",
      "## Overview",
      `- **Target file:** \`src/components/${name}.tsx\``,
      `- **Screenshot:** \`docs/design-references/\` (see captured screenshots)`,
      `- **Children:** ${countDescendants(section)} descendants`,
      "",
      "## DOM Structure",
      "",
      "```",
    ];

    function printDom(el, depth) {
      if (!el || depth > 8) return;
      const indent = "  ".repeat(depth);
      const cls = (el.classes || []).length ? `.${(el.classes || []).slice(0, 5).join(".")}` : "";
      const id = el.id ? `#${el.id}` : "";
      const text = el.text ? ` "${el.text.slice(0, 60)}"` : "";
      lines.push(`${indent}<${el.tag}${id}${cls}>${text}`);
      if (el.children) el.children.slice(0, 30).forEach((c) => printDom(c, depth + 1));
    }

    printDom(section, 0);
    lines.push("```", "");

    // Computed Styles (不限 5 个)
    lines.push("## Computed Styles", "");
    for (const item of relatedStyles.slice(0, 30)) {
      const clsLabel = item.classes?.length ? ` .${item.classes.slice(0, 3).join(".")}` : "";
      lines.push(`### <${item.tag}>${clsLabel}`);
      if (item.text) lines.push(`Text: "${item.text.slice(0, 80)}"`);
      if (item.rect) lines.push(`Rect: x=${item.rect.x}, y=${item.rect.y}, w=${item.rect.w}, h=${item.rect.h}`);
      lines.push("");
      lines.push("| Property | Value |", "|----------|-------|");
      for (const [prop, val] of Object.entries(item.styles)) {
        // 过滤掉无意义的默认值以减少噪音
        if (val === "none" && prop !== "display") continue;
        if (val === "normal") continue;
        lines.push(`| ${prop} | \`${val.slice(0, 120)}\` |`);
      }
      lines.push("");
    }

    // Text Content (完整版)
    lines.push("## Text Content (verbatim)", "");
    collectTexts(section, lines);
    lines.push("");

    // Assets (只列出该 section 的图片, 基于 section 关键词匹配)
    lines.push("## Assets", "");
    const sectionKeywords = (section.classes || []).join(" ").toLowerCase();
    const sectionImgs = assets.images?.filter((img) => {
      if (!img.src) return false;
      // 匹配: 图片的 section 属性包含当前 section 的标识
      if (img.section && sectionKeywords) {
        const sectionParts = img.section.toLowerCase().split(/[.#]/);
        return sectionParts.some((p) => sectionKeywords.includes(p));
      }
      return true;
    }) || [];
    if (sectionImgs.length) {
      lines.push("### Images");
      sectionImgs.forEach((img) => {
        lines.push(`- \`${img.src}\` (${img.width}x${img.height}, alt: "${img.alt || ""}")`);
      });
    }
    lines.push("");

    lines.push("## States & Behaviors", "");
    lines.push("> Verify hover/focus states by comparing screenshots");
    lines.push("");
    lines.push("## Responsive Behavior", "");
    lines.push("- **Desktop (1440px):** see screenshot");
    lines.push("- **Tablet (768px):** needs testing");
    lines.push("- **Mobile (390px):** needs testing");
    lines.push("");

    fs.writeFileSync(path.join(componentsDir, filename), lines.join("\n"), "utf-8");
  }
}

// --- inferComponentName (增强版: 50+ 关键词, 支持中文, 结构化启发) ---
function inferComponentName(tag, cls, id, el) {
  const combined = `${cls} ${id}`.toLowerCase();
  const nameMap = [
    // 导航/头部
    ["header", "Header"], ["navbar", "Header"], ["nav-bar", "Header"],
    ["navigation", "Navigation"], ["sidebar", "Sidebar"], ["side-bar", "Sidebar"],
    // 英雄区
    ["hero", "Hero"], ["banner", "Hero"], ["jumbo", "Hero"],
    // 功能/特性
    ["feature", "Features"], ["benefit", "Features"], ["advantage", "Features"],
    // 工作流
    ["workflow", "Workflow"], ["step", "Workflow"], ["how-it-work", "Workflow"],
    ["process", "Workflow"], ["timeline", "Timeline"],
    // CTA
    ["cta", "CtaSection"], ["call-to-action", "CtaSection"], ["cta-section", "CtaSection"],
    // 页脚
    ["footer", "Footer"],
    // 风格/项目/探索 (gameui.ai 特有)
    ["style-picker", "StylePicker"], ["style-select", "StylePicker"],
    ["project-gallery", "ProjectGallery"], ["project-card", "ProjectGallery"],
    ["explore", "Explore"], ["gallery", "Gallery"], ["portfolio", "Gallery"],
    // 卡片
    ["card", "Card"], ["tile", "Card"],
    // 定价/评价
    ["pricing", "Pricing"], ["testimonial", "Testimonials"], ["review", "Testimonials"],
    ["faq", "FAQ"], ["about", "About"],
    ["team", "Team"], ["contact", "Contact"],
    // 交互组件
    ["modal", "Modal"], ["popup", "Modal"], ["dialog", "Modal"],
    ["dropdown", "Dropdown"], ["tooltip", "Tooltip"], ["popover", "Popover"],
    ["tab", "Tab"], ["accordion", "Accordion"],
    ["slider", "Slider"], ["carousel", "Carousel"],
    ["toast", "Toast"], ["notification", "Toast"],
    ["form", "Form"], ["search", "Search"], ["input", "Input"],
    ["menu", "Menu"], ["overlay", "Overlay"],
    // UI 元素
    ["avatar", "Avatar"], ["badge", "Badge"], ["tag", "Tag"],
    ["social", "Social"], ["share", "Share"],
    ["button", "Button"], ["checkbox", "Checkbox"], ["toggle", "Toggle"],
    // 数据展示
    ["table", "Table"], ["list", "List"], ["grid", "Grid"],
    ["stats", "Stats"], ["counter", "Counter"], ["chart", "Chart"],
    // 其他
    ["content", "Content"], ["editor", "Editor"], ["preview", "Preview"],
    ["login", "Login"], ["signup", "Signup"], ["register", "Register"],
    // 中文关键词
    ["侧边栏", "Sidebar"], ["头部", "Header"], ["底部", "Footer"],
    ["导航", "Navigation"], ["画廊", "Gallery"], ["工作流", "Workflow"],
    ["风格", "StylePicker"], ["项目", "ProjectGallery"], ["探索", "Explore"],
    ["步骤", "Workflow"], ["卡片", "Card"], ["菜单", "Menu"],
  ];

  for (const [keyword, name] of nameMap) {
    if (combined.includes(keyword)) return name;
  }

  // 结构化启发式: 根据子元素类型推断
  if (el?.children?.length) {
    const childTags = el.children.map((c) => c.tag);
    const hasImages = childTags.includes("img") || el.children.some((c) => c.children?.some((cc) => cc.tag === "img"));
    const hasHeadings = childTags.some((t) => /^h[1-6]$/.test(t));
    const hasButtons = childTags.includes("button");
    const hasFormElements = childTags.some((t) => ["input", "textarea", "select"].includes(t));

    if (hasImages && childTags.length >= 3 && el.children?.length >= 3) return "Gallery";
    if (hasFormElements && hasButtons) return "Form";
    if (hasImages && hasHeadings) return "FeatureSection";
    if (hasButtons && hasHeadings) return "InteractiveSection";
  }

  // tag 名回退
  const tagNames = {
    header: "Header", nav: "Navigation", main: "MainContent",
    footer: "Footer", section: "Section", article: "Article",
    aside: "Sidebar",
  };
  if (tagNames[tag]) return tagNames[tag];

  // 第一个有意义的 class
  if (el?.classes?.length) {
    const firstClass = el.classes[0].replace(/[^a-zA-Z]/g, "");
    if (firstClass && firstClass.length > 2) {
      return firstClass.charAt(0).toUpperCase() + firstClass.slice(1);
    }
  }

  return "Unknown";
}

// --- 辅助函数 ---
function countDescendants(el) {
  if (!el?.children) return 0;
  let count = el.children.length;
  for (const c of el.children) count += countDescendants(c);
  return count;
}

function collectTexts(el, lines, depth) {
  if (!el) return;
  if (el.text) {
    lines.push(`- "${el.text}"`);
  }
  // SVG 内容也收集
  if (el.svg) {
    const svgChildren = el.children || [];
    svgChildren.forEach((c) => {
      if (c.d) lines.push(`  [SVG] <${c.tag}> d="${c.d.slice(0, 80)}"`);
    });
  }
  if (el.children && !(el.children[0]?.d !== undefined)) {
    // 普通子元素
    el.children.forEach((c) => collectTexts(c, lines, (depth || 0) + 1));
  }
}

function collectInnerElements(el, buttons, headings, images, depth) {
  if (!el || depth > 5) return;
  if (el.tag === "button" || el.tag === "a") buttons.push(el);
  if (/^h[1-6]$/.test(el.tag)) headings.push(el);
  if (el.tag === "img") images.push(el);
  if (el.children) {
    el.children.forEach((c) => collectInnerElements(c, buttons, headings, images, depth + 1));
  }
}

function collectTagClasses(el, set) {
  if (!el) return;
  set.add(el.tag);
  (el.classes || []).forEach((c) => set.add(c));
  if (el.children) el.children.forEach((c) => collectTagClasses(c, set));
}

// --- 主入口 ---
async function main() {
  if (!TARGET_URL) {
    console.error("Usage: node launch-browser.mjs <url>");
    process.exit(1);
  }

  try {
    new URL(TARGET_URL);
  } catch {
    console.error("Invalid URL:", TARGET_URL);
    process.exit(1);
  }

  fs.mkdirSync(USER_DATA_DIR, { recursive: true });

  console.log("[启动] Chrome 浏览器 (持久化 + 反检测)...");

  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: false,
    channel: "chrome",
    viewport: { width: 1440, height: 900 },
    args: [
      "--disable-blink-features=AutomationControlled",
      "--disable-features=IsolateOrigins,site-per-process",
      "--disable-infobars",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-renderer-backgrounding",
      "--disable-component-update",
      "--disable-default-apps",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
  });

  // 反检测: 隐藏自动化标记
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
    window.chrome = {
      runtime: {},
      loadTimes: function () {},
      csi: function () {},
      app: {},
    };
    const origQuery = window.navigator.permissions.query.bind(window.navigator.permissions);
    window.navigator.permissions.query = (params) =>
      params.name === "notifications"
        ? Promise.resolve({ state: Notification.permission })
        : origQuery(params);
    Object.defineProperty(navigator, "plugins", {
      get: () => [1, 2, 3, 4, 5],
    });
    Object.defineProperty(navigator, "languages", {
      get: () => ["zh-CN", "zh", "en"],
    });
  });

  // 注入保存按钮 (每次页面加载都执行, 可拖动)
  await context.addInitScript(() => {
    function injectButton() {
      if (document.getElementById("__pw_btn")) return;

      const style = document.createElement("style");
      style.textContent = [
        "#__pw_wrap { position:fixed; top:12px; right:12px; z-index:999999; font-family:system-ui,-apple-system,sans-serif; }",
        "#__pw_btn { padding:10px 20px; background:#7c3aed; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:grab; box-shadow:0 2px 12px rgba(124,58,237,0.4); user-select:none; transition:background 0.2s,box-shadow 0.2s; }",
        "#__pw_btn:hover { background:#6d28d9; }",
        "#__pw_btn.--dragging { cursor:grabbing; box-shadow:0 4px 20px rgba(124,58,237,0.6); opacity:0.9; }",
        "#__pw_btn.--saving { background:#f59e0b; pointer-events:none; }",
        "#__pw_btn.--saved { background:#10b981; pointer-events:none; }",
        "#__pw_btn.--error { background:#ef4444; pointer-events:none; }",
        "#__pw_badge { position:absolute; top:-6px; right:-6px; min-width:18px; height:18px; background:#10b981; color:#fff; border-radius:9px; font-size:11px; font-weight:700; display:flex; align-items:center; justify-content:center; padding:0 4px; opacity:0; transition:opacity 0.3s; }",
        "#__pw_badge.--show { opacity:1; }",
      ].join("\n");
      document.head.appendChild(style);

      const wrap = document.createElement("div");
      wrap.id = "__pw_wrap";

      const btn = document.createElement("button");
      btn.id = "__pw_btn";
      btn.textContent = "保存页面";

      const badge = document.createElement("span");
      badge.id = "__pw_badge";
      badge.textContent = "0";
      badge.style.display = "none";

      wrap.appendChild(btn);
      wrap.appendChild(badge);
      document.body.appendChild(wrap);

      // --- 拖动逻辑 ---
      let isDragging = false;
      let hasMoved = false;
      let startX = 0, startY = 0;
      let wrapLeft = 0, wrapTop = 0;

      try {
        const saved = JSON.parse(localStorage.getItem("__pw_pos") || "{}");
        if (saved.left != null) { wrap.style.left = saved.left + "px"; wrap.style.right = "auto"; }
        if (saved.top != null) { wrap.style.top = saved.top + "px"; }
      } catch {}

      function onPointerDown(e) {
        if (e.button && e.button !== 0) return;
        isDragging = true;
        hasMoved = false;
        const rect = wrap.getBoundingClientRect();
        startX = e.clientX;
        startY = e.clientY;
        wrapLeft = rect.left;
        wrapTop = rect.top;
        btn.classList.add("--dragging");
        e.preventDefault();
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
        if (!hasMoved) return;

        const newLeft = Math.max(0, Math.min(window.innerWidth - wrap.offsetWidth, wrapLeft + dx));
        const newTop = Math.max(0, Math.min(window.innerHeight - wrap.offsetHeight, wrapTop + dy));
        wrap.style.left = newLeft + "px";
        wrap.style.top = newTop + "px";
        wrap.style.right = "auto";
      }

      function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;
        btn.classList.remove("--dragging");

        const rect = wrap.getBoundingClientRect();
        try { localStorage.setItem("__pw_pos", JSON.stringify({ left: rect.left, top: rect.top })); } catch {}
      }

      btn.addEventListener("mousedown", onPointerDown);
      document.addEventListener("mousemove", onPointerMove);
      document.addEventListener("mouseup", onPointerUp);

      btn.addEventListener("touchstart", (e) => {
        const t = e.touches[0];
        onPointerDown({ clientX: t.clientX, clientY: t.clientY, preventDefault: () => e.preventDefault() });
      }, { passive: false });
      document.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const t = e.touches[0];
        onPointerMove({ clientX: t.clientX, clientY: t.clientY });
      });
      document.addEventListener("touchend", onPointerUp);

      // --- 点击保存 ---
      btn.addEventListener("click", async () => {
        if (hasMoved) return;
        btn.className = "--saving";
        btn.textContent = "保存中...";
        try {
          await window.__pwCapture(location.href);
          btn.className = "--saved";
          btn.textContent = "已保存!";
          const count = parseInt(badge.textContent || "0") + 1;
          badge.textContent = String(count);
          badge.style.display = "flex";
          badge.className = "--show";
        } catch (e) {
          btn.className = "--error";
          btn.textContent = "保存失败";
          console.error("[Playwright Save Error]", e);
        }
        setTimeout(() => {
          btn.className = "";
          btn.textContent = "保存页面";
        }, 2500);
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", injectButton);
    } else {
      injectButton();
    }

    let lastUrl = location.href;
    const checkUrl = setInterval(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        setTimeout(injectButton, 500);
      }
    }, 1000);
  });

  // 暴露抓取函数到浏览器上下文
  await context.exposeFunction("__pwCapture", async (callerUrl) => {
    const pages = context.pages();
    let target = pages.find((p) => {
      try {
        return p.url() === callerUrl;
      } catch {
        return false;
      }
    });
    if (!target) target = pages[0];
    if (target) {
      return await capturePage(target);
    }
    return null;
  });

  // 导航到目标 URL
  const page = context.pages()[0] || (await context.newPage());
  console.log("[导航] " + TARGET_URL);
  await page.goto(TARGET_URL, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});

  console.log("");
  console.log("==========================================");
  console.log("  浏览器已启动!");
  console.log("  点击右上角 [保存页面] 按钮抓取当前页面");
  console.log("  每次保存按 域名/页面 分目录存放");
  console.log("  关闭浏览器窗口即可退出");
  console.log("==========================================");
  console.log("");

  // 等待浏览器关闭
  context.on("close", () => {
    console.log("[退出] 浏览器已关闭");
    process.exit(0);
  });

  await new Promise(() => {});
}

main().catch((err) => {
  console.error("[错误]", err.message || err);
  process.exit(1);
});
