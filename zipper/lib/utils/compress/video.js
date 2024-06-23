import { createRequire } from "module"
import compress from "../bus/compress.js"
import { getFileName } from "../path.js"

const require = createRequire(import.meta.url)
const ffmpegPath = require("ffmpeg-static")
const ffmpeg = require("fluent-ffmpeg")
ffmpeg.setFfmpegPath(ffmpegPath)

export function compressVideo(input, output, options) {
  const name = getFileName(input)
  const info = {
    file: name,
    status: "success",
    input,
    output,
  }
  return new Promise(async (resolve, reject) => {
    ffmpeg(input)
      .outputOptions([
        "-c:v libx264", // 编码器设置为 libx264
        `-crf ${options.video}`, // 调整 CRF 参数，数值越大压缩率越高
        "-preset slow", // 调整预设以控制压缩速度和质量的平衡
        "-c:a copy", // 保留原音频流
      ])
      .save(output)
      .on("end", () => {
        compress.emit("compressed", info)
        resolve(info)
      })
      .on("error", (err) => {
        info.status = "error"
        info.message = err.message
        compress.emit("compressed", info)
        reject(info)
      })
  })
}
