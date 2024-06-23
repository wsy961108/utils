import sharp from "sharp"
import { getFileName, getFileExtension } from "../path.js"
import compress from "../bus/compress.js"

function imageLoader(filePath, option) {
  const ext = getFileExtension(filePath)
  const loader = ext === "jpg" ? "jpeg" : ext
  const params = { quality: option.image, compressionLevel: 9 }
  return sharp(filePath)[loader](params)
}

export async function compressImage(input, output, option) {
  const name = getFileName(input)
  const info = {
    file: name,
    status: "success",
    input,
    output,
  }
  try {
    const loader = imageLoader(input, option)
    await loader.toFile(output)
    compress.emit("compressed", info)
  } catch (err) {
    info.status = "error"
    info.message = err.message
    compress.emit("compressed", info)
  }
}
