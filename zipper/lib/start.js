import ora from "ora"
import { findFilesRecursively, getFileSize } from "./utils/file.js"
import {
  toAbsolutePath,
  getFileName,
  getFileExtension,
  isFileExist,
} from "./utils/path.js"
import { compressImage } from "./utils/compress/image.js"
import { compressVideo } from "./utils/compress/video.js"
import initTable from "./utils/table.js"
import compress from "./utils/bus/compress.js"
const imageType = ["jpg", "jpeg", "png", "webp", "tiff", "avif"]

const mp4Type = [
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wmv",
  "flv",
  "mpeg",
  "mpg",
  "webm",
  "3gp",
  "ogv",
]

async function start(input, output, option) {
  output = output ?? input
  const inputPath = toAbsolutePath(input)
  const outputPath = toAbsolutePath(output)
  let files = null

  const spinner = ora("压缩中...").start()

  let spinnerStatus = "succeed"
  let spinnerMessage = "压缩成功"
  const table = []

  compress.on("compressed", async (info) => {
    if (!info) return
    if (info.message) {
      spinnerStatus = "fail"
      spinnerMessage = "压缩失败"
      spinner[spinnerStatus](spinnerMessage)
      throw new Error(info.message)
    }

    const { file, status, input, output, message } = info
    const before = await getFileSize(input)
    const after = await getFileSize(output)
    const ratio = (((before - after) / before) * 100).toFixed(2) + "%"
    table.push({
      file,
      before,
      after,
      ratio,
      status,
      message,
    })
    if (table.length === files.length) {
      spinner[spinnerStatus](spinnerMessage)
      ora("获取压缩结果").start().succeed()
      initTable(table)
      process.exit(1)
    }
  })

  files = await findFilesRecursively(inputPath)
  await isFileExist(outputPath)
  for (const path of files) {
    const fileName = getFileName(path)
    const ext = getFileExtension(path)
    const outPath = `${outputPath}/${fileName}`

    if (mp4Type.includes(ext)) {
      await compressVideo(path, outPath, option)
    } else if (imageType.includes(ext)) {
      await compressImage(path, outPath, option)
    }
  }
}

export default start
