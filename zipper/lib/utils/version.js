import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import semver from "semver";

// 获取 package.json 文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = path.join(__dirname, "../../package.json");

// 读取并解析 package.json 文件
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// 获取当前版本号
const currentVersion = packageJson.version;

// 增加一个补丁版本
const addPatchVersion = semver.inc(currentVersion, "patch");

// 增加一个次版本
const addMinorVersion = semver.inc(currentVersion, "minor");

// 增加一个主版本
const addMajorVersion = semver.inc(currentVersion, "major");

// 更新 package.json 中的版本号
// packageJson.version = newVersion;

// 将更新后的内容写回 package.json 文件
// fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8");

export { currentVersion as version };
