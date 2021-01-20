import { export_json_to_excel as exportJsonToExcel } from './Export2Excel'
export function export2Excel(columns, list) {
  require.ensure([], () => {
    // const { export_json_to_excel } = require('./Export2Excel')
    const tHeader = []
    const filterVal = []
    const timestamp = Date.parse(new Date())
    console.log(columns)
    if (!columns) {
      return
    }
    columns.forEach(item => {
      tHeader.push(item.title)
      filterVal.push(item.key)
    })
    const data = list.map(v => filterVal.map(j => v[j]))
    exportJsonToExcel(tHeader, data, '实时日志' + timestamp)
  })
}
