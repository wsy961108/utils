import path from "node:path"
import { fileURLToPath } from "node:url"
import { ensureDir } from "fs-extra"

export const toAbsolutePath = (relativePath, baseDir = process.cwd()) => {
  if (import.meta.url) {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    baseDir = baseDir || __dirname
  }

  return path.resolve(baseDir, relativePath)
}

// 根据文件路径获取目录路径
export const getDirPath = (filePath) => path.dirname(filePath)

// 根据文件路径获取文件名
export const getFileName = (filePath) => path.basename(filePath)

// 根据文件路径获取文件后缀
export const getFileExtension = (filePath) => path.extname(filePath).slice(1)

// 确保输出目录存在 不存在会自动创建
export const isFileExist = async (filePath) => ensureDir(filePath)
