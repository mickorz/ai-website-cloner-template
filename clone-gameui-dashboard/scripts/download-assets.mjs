// 下载远程图片到 public/images/
// 用法: node scripts/download-assets.mjs

import { readFileSync, mkdirSync, existsSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const IMAGES_DIR = join(ROOT, "public", "images");

// 确保目录存在
if (!existsSync(IMAGES_DIR)) {
  mkdirSync(IMAGES_DIR, { recursive: true });
}

// 需要下载的远程图片映射: 远程URL -> 本地文件名
const imageMap = [
  // sidebar 项目缩略图
  {
    url: "https://img.gameui.ai/style/IYVrInYx3rZiPVOsocYISkYsnRUI0JLh/WJbDfPn3HuxuDtcl.png",
    local: "project-thumb-1.png",
  },
  // project-gallery 项目封面
  {
    url: "https://img.gameui.ai/style/twOsj09qOmMK5zRKkUXpAaQLQ7Mqx5u9/yOE5JlGHKr7nlXAA.png",
    local: "project-candy-farm.png",
  },
  {
    url: "https://img.gameui.ai/style/tKyPUEA5lDPzGcA6EVQ2mRXtJNOfznKC/83Oh58A4ynRUrkGK.png",
    local: "project-pixel-turf.png",
  },
  {
    url: "https://img.gameui.ai/style/twOsj09qOmMK5zRKkUXpAaQLQ7Mqx5u9/ZsEYTtS1enau4Zh6.png",
    local: "project-floating-island.png",
  },
  {
    url: "https://img.gameui.ai/style/twOsj09qOmMK5zRKkUXpAaQLQ7Mqx5u9/f3vqe18YbyKMDsZA.png",
    local: "project-pixel-farm.png",
  },
  {
    url: "https://img.gameui.ai/style/twOsj09qOmMK5zRKkUXpAaQLQ7Mqx5u9/VXdiAvokBV37AMWJ.png",
    local: "project-pirate-ui.png",
  },
  {
    url: "https://img.gameui.ai/style/twOsj09qOmMK5zRKkUXpAaQLQ7Mqx5u9/ZFvOdNoUMftBOz8a.png",
    local: "project-magic-academy.png",
  },
  {
    url: "https://img.gameui.ai/style/3zaV3Mj7eIapitTVrpaOeRXSRRdQeOEH/WKayaT6zzCJe6AXH.png",
    local: "project-forest-puzzle.png",
  },
  {
    url: "https://img.gameui.ai/style/DHtWOipLE1zoDJgMYNM5GLk3m8xj1R0g/6Hz7a9VE4YUVwmwZ.png",
    local: "project-visual-novel.png",
  },
  // 用户头像
  {
    url: "https://lh3.googleusercontent.com/a/ACg8ocIGYjMjMiksN_VdYnVjW01_TXrKBa092OY5RUwTzd52Wgh0Zw=s96-c",
    local: "avatar-lai-lai.png",
  },
  {
    url: "https://lh3.googleusercontent.com/a/ACg8ocJJIANEIgjpIKeBKithk1zG3RG4HImWiech8djWwedGKSX0oQ=s96-c",
    local: "avatar-tail-kink.png",
  },
  {
    url: "https://avatars.githubusercontent.com/u/106372074?v=4",
    local: "avatar-yoxioo.png",
  },
];

async function downloadImage(url, localPath) {
  if (existsSync(localPath)) {
    console.log(`[跳过] ${localPath} 已存在`);
    return true;
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!res.ok) {
      console.error(`[失败] ${url} -> HTTP ${res.status}`);
      return false;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(localPath, buffer);
    console.log(`[成功] ${localPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (err) {
    console.error(`[错误] ${url}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`下载目录: ${IMAGES_DIR}\n`);

  let success = 0;
  let failed = 0;

  for (const item of imageMap) {
    const localPath = join(IMAGES_DIR, item.local);
    const ok = await downloadImage(item.url, localPath);
    if (ok) success++;
    else failed++;
  }

  console.log(`\n完成: ${success} 成功, ${failed} 失败`);

  // 生成 URL -> 本地路径映射 JSON,供后续更新组件引用
  const mapping = {};
  for (const item of imageMap) {
    mapping[item.url] = `/images/${item.local}`;
  }
  const mappingPath = join(IMAGES_DIR, "_mapping.json");
  writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  console.log(`映射文件: ${mappingPath}`);
}

main();
