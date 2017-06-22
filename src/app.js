import { loadbox } from './components/loadbox'
import { worklayer } from './components/workzone'
import { load_preview } from './components/preview'
import Main from './main'
import Dashboard from './dashboard'

const debug = require('debug')('pccp:app')

exports.init = (options = {}) => {
  if (!options.output) {
    debug('no output values')
    return
  }
  options.dashboard = options.dashboard || {}
  options.dest = options.dest || '/thumbnail'
  options.clip = options.clip || {}
  options.clip = {
    s: options.clip.s || 'rgba(0,0,0,0.8)',
  }

  exports.options = options
  load_preview()

  const pccp = document.getElementById('pccp')
  if (!pccp) return

  Dashboard(pccp)

  const load = () => {

    const raw = new Image()
    const file = loadbox.files[0]

    raw.addEventListener('load', () => {
      URL.revokeObjectURL(file)
      worklayer.addEventListener('load', function main() {
        exports.raw = raw
        worklayer.crossOrigin = 'Anonymous'
        worklayer.ratio = worklayer.width / worklayer.height
        Main()
        worklayer.removeEventListener('load', main, false)
      }, false)
      worklayer.src = URL.createObjectURL(file)
    }, false)

    raw.src = URL.createObjectURL(file)
  }

  loadbox.addEventListener('change', load)
}
