import { createServer } from "node:http";
import { readFileSync, mkdirSync, existsSync, copyFileSync } from "node:fs";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const configPath = join(__dirname, "pdf.config.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

function resolvePublicPath(publicDir, requestPath) {
  let path = decodeURIComponent(requestPath.split("?")[0]);
  if (path.endsWith("/")) {
    path += "index.html";
  }

  const absolutePath = normalize(join(publicDir, path));
  if (!absolutePath.startsWith(publicDir)) {
    return null;
  }

  return absolutePath;
}

function startStaticServer(publicDir) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const filePath = resolvePublicPath(publicDir, req.url ?? "/");
      if (!filePath || !existsSync(filePath)) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      const body = readFileSync(filePath);
      res.writeHead(200, {
        "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream",
      });
      res.end(body);
    });

    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

async function launchBrowser() {
  if (process.env.CHROME_PATH) {
    return puppeteer.launch({
      executablePath: process.env.CHROME_PATH,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }

  if (process.platform === "linux") {
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  const { default: puppeteerLocal } = await import("puppeteer");
  return puppeteerLocal.launch({ headless: true });
}

async function main() {
  const publicDir = join(rootDir, config.publicDir);
  const resumeIndex = join(publicDir, config.resumePath, "index.html");
  const outputPath = join(rootDir, config.output);

  if (!existsSync(resumeIndex)) {
    console.error(`Missing ${resumeIndex}. Run "hugo --minify" first.`);
    process.exit(1);
  }

  mkdirSync(dirname(outputPath), { recursive: true });

  const { server, port } = await startStaticServer(publicDir);
  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(`http://127.0.0.1:${port}${config.resumePath}`, {
      waitUntil: "networkidle0",
    });
    await page.emulateMediaType("print");
    await page.pdf({
      path: outputPath,
      format: config.format,
      margin: config.margin,
      printBackground: true,
    });
    console.log(`Wrote ${config.output}`);

    const publicOutput = join(rootDir, "public", "files", "jonas-rosland-resume.pdf");
    if (existsSync(join(rootDir, "public"))) {
      mkdirSync(dirname(publicOutput), { recursive: true });
      copyFileSync(outputPath, publicOutput);
      console.log("Copied to public/files/jonas-rosland-resume.pdf");
    }
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
