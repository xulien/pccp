import getElement from '../getElement'
import { red, blue, green } from './slider'
import { brightness } from './brightness'

import { redRangeSlider, greenRangeSlider, blueRangeSlider } from './slider'
import { worklayer } from './workzone'
import { popin } from './popin'

const control = exports.control = getElement('div', { className: 'control' })
const commandboard = exports.commandboard = getElement('div', { className: 'commandboard' })
const preset = getElement('div', { className: 'preset' })
const effect = getElement('div', { className: 'effect' })

const save = exports.save = getElement('button', { id: 'save', text: 'Send' })
const editor_button = exports.editor_button = getElement('button', { id: 'editor_button', text: 'editor' })

const level = getElement('div', { className: 'level' })

const clear = exports.clear = getElement('button', { id: 'clear', text: 'Clear' })
const apply = exports.apply = getElement('button', { id: 'apply', text: 'Apply' })
const exit = exports.exit = getElement('button', { id: 'exit', text: 'Close' })

const hide = exports.hide = e => e.style.display = 'none'
const show = exports.show = e => e.style.display = 'flex'

level.style.display = 'flex'
level.style['flex-direction'] = 'column'
level.style['margin'] = '35px 15px'

level.appendChild(red)
level.appendChild(green)
level.appendChild(blue)

effect.appendChild(clear)
effect.appendChild(apply)
effect.appendChild(exit)

effect.style.padding = '5px'

preset.appendChild(brightness)

commandboard.appendChild(preset)
commandboard.appendChild(effect)

control.appendChild(commandboard)
control.appendChild(level)

control.style.display = 'flex'
control.style['background-color'] = 'grey'
control.style['max-width'] = '240px'
control.style['flex-grow'] = 1
control.style['flex-direction'] = 'column'
control.style.margin = '10px'

exports.eventControl = (clip, background) => {
  editor_button.addEventListener('click', () => show(popin))
  apply.addEventListener('click', () => background.apply(clip, dataUri => {
    worklayer.src = dataUri
    hide(popin)
  }))
  exit.addEventListener('click', () => hide(popin))
  save.addEventListener('click', () => background.save())
  clear.addEventListener('click', () => {
    background.clear()
    redRangeSlider.set(background.rgbAverage.red)
    greenRangeSlider.set(background.rgbAverage.green)
    blueRangeSlider.set(background.rgbAverage.blue)
  })
}
