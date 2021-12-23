import * as fs from 'fs'
import * as yaml from 'js-yaml'
import * as util from 'util'
import Log from './loggers.js'

const wait = util.promisify(setTimeout)

export default class YAML {
  static Get(file: string): any {
    if (fs.existsSync(`./${file}.yaml`)) {
      const fil = fs.readFileSync(`./${file}.yaml`, 'utf8')
      return yaml.load(fil)
    } else {
      wait(1000).then(() => {
        Log.Error('Please restart your bot!')
        process.exit()
      })
    }
  }

  static Generate(file: string, contents: Object | string): void {
    if (!fs.existsSync(`./${file}.yaml`)) {
      fs.writeFile(`./${file}.yaml`, typeof contents === 'object' ? yaml.dump(contents) : contents, () => {
        wait(1000).then(() => {
          Log.Success(`Successfully created ${file}.yaml`)
        })
      })
    }
  }
}