import fs from "fs-extra"
import path from "path"

export const findFilesRecursively = async (dir, fileList = []) => {
  const files = await fs.readdir(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = await fs.stat(filePath)
    stats.isDirectory()
      ? await findFilesRecursively(filePath, fileList)
      : stats.isFile() && fileList.push(filePath)
  }

  return fileList
}

export const getFileSize = (filePath) =>
  new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats.size)
      }
    })
  })
