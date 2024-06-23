import Table from "cli-table3"

const initTable = (data) => {
  if (!data.length) return

  const head = ["文件", "压缩前", "压缩后", "压缩比"]

  const table = new Table({
    head,
    colWidths: [20, 10, 20],
    style: {
      head: ["green"],
      border: ["yellow"],
      compact: false,
    },
  })

  table.push(
    ...data.map(({ file, before, after, ratio }) => [
      file,
      before,
      after,
      ratio,
    ])
  )
  console.log(table.toString())
}

export default initTable
