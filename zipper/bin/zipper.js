#!/usr/bin/env node

import { program } from "commander"
import { version } from "../lib/utils/version.js"
import start from "../lib/start.js"

program
  .version(version, "-v, --version", "输出当前版本号")
  .usage("<command> [options]")
  .helpOption("-h, --help", "显示帮助信息")

program
  .command("start <input> [output]")
  .description("对音视频进行压缩处理")
  .option(
    "-vq, --video <质量>",
    "数值越大，压缩率越高，文件越小，但处理时间也越长。 取值 0-51",
    28
  )
  .option(
    "-iq, --image <质量>",
    "数值越大，压缩率越高，文件越小，但处理时间也越长。 取值 1-100",
    85
  )
  .action((input, output, options) => {
    const inputPath = input
    const outputPath = output ?? input

    start(inputPath, outputPath, options)
  })

program.parse(process.argv)
