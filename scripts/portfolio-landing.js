const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const buildDir = path.join(root, "build");
const publicDir = path.join(root, "public");
const rootIndex = path.join(buildDir, "index.html");
const portfolioDir = path.join(buildDir, "portfolio");
const portfolioIndex = path.join(portfolioDir, "index.html");
const landingHtml = path.join(publicDir, "landing.html");

if (!fs.existsSync(buildDir)) {
    throw new Error(`Build directory not found: ${buildDir}`);
}
if (!fs.existsSync(rootIndex)) {
    throw new Error(`Build index.html not found: ${rootIndex}`);
}
if (!fs.existsSync(landingHtml)) {
    throw new Error(`Landing HTML not found: ${landingHtml}`);
}

fs.mkdirSync(portfolioDir, { recursive: true });

const appHtml = fs.readFileSync(rootIndex, "utf8");
fs.writeFileSync(portfolioIndex, appHtml, "utf8");

const landing = fs.readFileSync(landingHtml, "utf8");
fs.writeFileSync(rootIndex, landing, "utf8");

console.log("Landing page set as root and app copied to /portfolio/index.html");
