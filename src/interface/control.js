import getElement from '../getElement'
import noUiSlider from 'nouislider'

const control = exports.control = getElement('div', { className: 'control' })
const board = getElement('div', { className: 'board' })
const preset = getElement('div', { className: 'preset' })
const effect = getElement('div', { className: 'effect' })
const brightness = getElement('div', { className: 'brightness' })
const moreBrightness = exports.moreBrightness = getElement('button', { id: 'moreBrightness', text: 'Brightness +' })
const lessBrightness = exports.lessBrightness = getElement('button', { id: 'lessBrightness', text: 'Brightness -' })
const level = getElement('div', { className: 'level' })
const red = getElement('div', { id: 'red', className: 'item-level' })
const green = getElement('div', { id: 'green', className: 'item-level' })
const blue = getElement('div', { id: 'blue', className: 'item-level' })
const clear = exports.clear = getElement('button', { id: 'clear', text: 'Clear' })
const apply = exports.apply = getElement('button', { id: 'apply', text: 'Apply' })
const save = exports.save = getElement('button', { id: 'save', text: 'Send' })

moreBrightness.style.margin =
lessBrightness.style.margin =
clear.style.margin =
apply.style.margin =
save.style.margin = '10px'

moreBrightness.style.width =
lessBrightness.style.width =
clear.style.width =
apply.style.width =
save.style.width = '100px'

moreBrightness.style.height =
lessBrightness.style.height =
clear.style.height =
apply.style.height =
save.style.height = '30px'

red.style.margin = green.style.margin = blue.style.margin = '20px 10px'

level.style.display = 'flex'
level.style['flex-direction'] = 'column'
level.style.width = '300px'
level.style['margin'] = '35px 25px'

level.appendChild(red)
level.appendChild(green)
level.appendChild(blue)

effect.appendChild(clear)
effect.appendChild(apply)

brightness.appendChild(moreBrightness)
brightness.appendChild(lessBrightness)

preset.appendChild(brightness)

board.appendChild(preset)
board.appendChild(effect)


control.appendChild(level)
control.appendChild(board)

control.style.display = 'flex'
control.style['background-color'] = 'grey'
control.style['min-height'] = '240px'
control.style.margin = '10px'

if (red.classList.contains('noUi-target')) red.noUiSlider.destroy()
if (green.classList.contains('noUi-target')) green.noUiSlider.destroy()
if (blue.classList.contains('noUi-target')) blue.noUiSlider.destroy()

const redRangeSlider = exports.redRangeSlider = noUiSlider.create(red, {
  start: [0],
  tooltips: [ true ],
  range: {
    'min': [ 0 ],
    'max': [ 255 ]
  },
  pips: {
    mode: 'steps',
    stepped: true,
    density: 8
  }
})

const greenRangeSlider = exports.greenRangeSlider = noUiSlider.create(green, {
  start: [0],
  tooltips: [ true ],
  range: {
    'min': [ 0 ],
    'max': [ 255 ]
  },
  pips: {
    mode: 'steps',
    stepped: true,
    density: 8
  }
})

const blueRangeSlider = exports.blueRangeSlider = noUiSlider.create(blue, {
  start: [0],
  tooltips: [ true ],
  range: {
    'min': [ 0 ],
    'max': [ 255 ]
  },
  pips: {
    mode: 'steps',
    stepped: true,
    density: 8
  }
})

redRangeSlider.target.children[0].style.background = '#c0392b'
greenRangeSlider.target.children[0].style.background = '#27ae60'
blueRangeSlider.target.children[0].style.background = '#2980b9'
