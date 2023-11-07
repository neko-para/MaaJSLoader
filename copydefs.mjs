import fs from 'fs/promises'
import path from 'path'

const d = 'src/gen'

const result = ['import * as dependency_1 from "./gen/types"', '', 'export const definitions = {']

for (const file of await fs.readdir(d)) {
  const rows = (await fs.readFile(path.join(d, file), 'utf-8')).split(/\n+/)
  let state = 0
  let name
  for (const row of rows) {
    if (state === 3) {
      result.push('')
      break
    }
    switch (state) {
      case 0: {
        const m = /export abstract class Unimplemented(.+)Service/.exec(row)
        if (m) {
          state = 1
          name = m[1]
        }
        break
      }
      case 1: // static definition row
        result.push(`    ${name.toLowerCase()}: {`)
        state = 2
        break
      case 2:
        if (row === `    };`) {
          state = 3
          result.push('    },')
        } else {
          const m = /(request|response)(S|Des)erialize: \((?:message|bytes): (.+)\) => /.exec(row)
          if (m) {
            if (m[2] === 'S') {
              result.push(`            ${m[1]}: ${m[3]},`)
              result.push(`            ${m[1]}Type: '${m[3].replace('dependency_1.', '')}',`)
            }
          } else {
            result.push(row)
          }
        }
    }
  }
}

result.push('} as const')

fs.writeFile('src/definition.ts', result.join('\n'))
