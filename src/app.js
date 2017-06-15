import Board from './board'
import Main from './main'

function show(e) {
  e.style.display = 'block'
}

function hide(e) {
  e.style.display = 'none'
}

exports.init = (options = {}) => {
  if (!options.output) return console.warn('no output values')

  options.dest = options.dest || '/thumbnail'
  options.board = options.board || {}
  options.board.side = options.board.side || 500
  options.clip = options.clip || {}
  options.clip = {
    s: options.clip.s || 'rgba(0,0,0,0.8)',
  }

  const pccp = document.getElementById('pccp')
  if (!pccp) return

  const board = Board(pccp, options)

  const { dropbox, preview, popin, show_button, popin_bg } = board

  show_button.addEventListener('click', () => show(popin))
  popin_bg.addEventListener('click', () => hide(popin))

  const load = () => {

    const raw = new Image()
    const file = dropbox.files[0]

    raw.addEventListener('load', () => {
      URL.revokeObjectURL(file)
      preview.addEventListener('load', function main() {
        Main(raw, board, options)
        show(popin)
        preview.removeEventListener('load', main, false)
      }, false)
      preview.src = URL.createObjectURL(file)
    }, false)

    raw.src = URL.createObjectURL(file)
  }

  dropbox.addEventListener('change', load)
}
