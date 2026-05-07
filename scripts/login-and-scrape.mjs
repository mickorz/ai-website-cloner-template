/**
 * Playwright 有头浏览器脚本 (反检测版)
 * 用途: 启动 Chrome 浏览器 -> 用户手动登录 -> 自动抓取登录后的页面内容
 *
 * 使用方法:
 *   node scripts/login-and-scrape.mjs
 *
 * 流程:
 *   1. 启动有头 Chrome 浏览器 (反自动化检测)
 *   2. 等待用户手动完成登录操作
 *   3. 用户在终端按 Enter 键确认登录完成
 *   4. 脚本自动抓取页面截图和 DOM 内容
 */

import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import os from "os";

const TARGET_URL = "https://gameui.ai/zh-CN";
const OUTPUT_DIR = path.resolve("docs/research/logged-in");
const USER_DATA_DIR = path.join(os.homedir(), ".gameui-browser-profile");

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });

  console.log("正在启动 Chrome 浏览器 (持久化配置 + 反检测)...");

  // 使用 launchPersistentContext 而非 launch + newContext
  // 这样浏览器看起来更像真实用户，不会被检测为自动化
  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: false,
    channel: "chrome",
    viewport: { width: 1440, height: 900 },
    // 反自动化检测参数
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
    // 隐藏 navigator.webdriver 标记
    ignoreDefaultArgs: ["--enable-automation"],
  });

  // 注入反检测脚本 - 在所有页面生效
  await context.addInitScript(() => {
    // 覆盖 webdriver 属性
    Object.defineProperty(navigator, "webdriver", {
      get: () => false,
    });
    // 覆盖 chrome 对象
    window.chrome = {
      runtime: {},
      loadTimes: function () {},
      csi: function () {},
      app: {},
    };
    // 覆盖 permissions query
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) =>
      parameters.name === "notifications"
        ? Promise.resolve({ state: Notification.permission })
        : originalQuery(parameters);
    // 覆盖 plugins 长度
    Object.defineProperty(navigator, "plugins", {
      get: () => [1, 2, 3, 4, 5],
    });
    // 覆盖 languages
    Object.defineProperty(navigator, "languages", {
      get: () => ["zh-CN", "zh", "en"],
    });
  });

  const page = context.pages()[0] || (await context.newPage());

  console.log(`正在打开 ${TARGET_URL} ...`);
  await page.goto(TARGET_URL, { waitUntil: "networkidle" });

  console.log("\n============================================");
  console.log("  请在浏览器中完成登录操作");
  console.log("  登录完成后，回到此处按 Enter 键继续...");
  console.log("============================================\n");

  await waitForEnter();

  // 保存登录状态
  const storageState = await context.storageState();
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "storage-state.json"),
    JSON.stringify(storageState, null, 2),
    "utf-8"
  );
  console.log("[保存] 登录状态已保存到 storage-state.json");

  // 截取首页截图
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "home-logged-in.png"),
    fullPage: true,
  });
  console.log("[截图] 首页截图已保存");

  // 抓取首页 HTML
  const html = await page.content();
  fs.writeFileSync(path.join(OUTPUT_DIR, "home-logged-in.html"), html, "utf-8");
  console.log("[HTML] 首页 HTML 已保存");

  // 抓取首页计算样式 (关键元素的 CSS)
  const stylesData = await page.evaluate(() => {
    const elements = document.querySelectorAll(
      "header, nav, [class*='hero'], [class*='feature'], [class*='workflow'], " +
      "[class*='cta'], [class*='footer'], h1, h2, h3, button, a[role='button']"
    );
    const results = [];
    elements.forEach((el, index) => {
      if (index > 50) return;
      const computed = window.getComputedStyle(el);
      const tag = el.tagName?.toLowerCase();
      const classes = el.className && typeof el.className === "string"
        ? el.className.split(" ").filter(Boolean).slice(0, 5)
        : [];
      results.push({
        tag,
        classes,
        text: el.textContent?.trim().slice(0, 80),
        styles: {
          display: computed.display,
          flexDirection: computed.flexDirection,
          justifyContent: computed.justifyContent,
          alignItems: computed.alignItems,
          gap: computed.gap,
          padding: computed.padding,
          margin: computed.margin,
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
          borderRadius: computed.borderRadius,
          border: computed.border,
          boxShadow: computed.boxShadow,
          backgroundImage: computed.backgroundImage,
          background: computed.background,
          position: computed.position,
          width: computed.width,
          height: computed.height,
          overflow: computed.overflow,
        },
      });
    });
    return results;
  });
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "computed-styles.json"),
    JSON.stringify(stylesData, null, 2),
    "utf-8"
  );
  console.log("[样式] 已抓取 " + stylesData.length + " 个元素的计算样式");

  // 抓取 CSS 变量
  const cssVars = await page.evaluate(() => {
    const root = document.documentElement;
    const computed = window.getComputedStyle(root);
    const vars = {};
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText === ":root" || rule.selectorText === "html") {
            const style = rule.style;
            for (let i = 0; i < style.length; i++) {
              const prop = style[i];
              if (prop.startsWith("--")) {
                vars[prop] = style.getPropertyValue(prop).trim();
              }
            }
          }
        }
      } catch {
        // 跨域样式表无法访问
      }
    }
    return vars;
  });
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "css-variables.json"),
    JSON.stringify(cssVars, null, 2),
    "utf-8"
  );
  console.log("[CSS变量] 已抓取 " + Object.keys(cssVars).length + " 个 CSS 变量");

  // 获取所有页面链接
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a[href]"))
      .map((a) => ({
        href: a.href,
        text: a.textContent?.trim().slice(0, 50),
      }))
      .filter((l) => l.href && !l.href.startsWith("javascript:"));
  });
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "page-links.json"),
    JSON.stringify(links, null, 2),
    "utf-8"
  );
  console.log("[链接] 发现 " + links.length + " 个链接");

  // 抓取登录后的独特子页面
  const uniquePages = [
    ...new Set(
      links
        .filter((l) => l.href.includes("gameui.ai"))
        .map((l) => l.href)
    ),
  ].slice(0, 15);

  console.log("\n开始抓取 " + uniquePages.length + " 个子页面...");

  for (let i = 0; i < uniquePages.length; i++) {
    const url = uniquePages[i];
    const slug = url
      .replace(/https?:\/\/[^/]+/, "")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .slice(0, 50) || "root";

    try {
      console.log("  [" + (i + 1) + "/" + uniquePages.length + "] " + url);
      await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });

      await page.screenshot({
        path: path.join(OUTPUT_DIR, slug + ".png"),
        fullPage: true,
      });

      const pageHtml = await page.content();
      fs.writeFileSync(
        path.join(OUTPUT_DIR, slug + ".html"),
        pageHtml,
        "utf-8"
      );
    } catch (err) {
      console.log("  [跳过] " + url + ": " + err.message);
    }
  }

  console.log("\n============================================");
  console.log("  所有页面抓取完成!");
  console.log("  输出目录: " + OUTPUT_DIR);
  console.log("============================================");

  // 保存最终登录状态
  const finalState = await context.storageState();
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "storage-state.json"),
    JSON.stringify(finalState, null, 2),
    "utf-8"
  );

  console.log("\n浏览器将保持打开状态。关闭此终端窗口即可关闭浏览器。");

  await new Promise(() => {});
}

function waitForEnter() {
  return new Promise((resolve) => {
    process.stdin.setEncoding("utf-8");
    process.stdin.resume();
    process.stdin.once("data", () => {
      resolve();
    });
  });
}

main().catch((err) => {
  console.error("错误:", err);
  process.exit(1);
});
