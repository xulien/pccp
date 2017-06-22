import getElement from '../getElement'
import noUiSlider from 'nouislider'

const red = exports.red = getElement('div', { id: 'red', className: 'item-level' })
const green = exports.green = getElement('div', { id: 'green', className: 'item-level' })
const blue = exports.blue = getElement('div', { id: 'blue', className: 'item-level' })

red.style.margin = green.style.margin = blue.style.margin = '45px 10px'

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

exports.eventSlider = background => {
  redRangeSlider.updateOptions({ start: [ background.rgbAverage.red ] })
  redRangeSlider.on('update', ( values, handle ) => background.changeColorLevel(Math.round(values[handle]), 'red'))

  greenRangeSlider.updateOptions({ start: [ background.rgbAverage.green ] })
  greenRangeSlider.on('update', ( values, handle ) => background.changeColorLevel(Math.round(values[handle]), 'green'))

  blueRangeSlider.updateOptions({ start: [ background.rgbAverage.blue ] })
  blueRangeSlider.on('update', ( values, handle ) => background.changeColorLevel(Math.round(values[handle]), 'blue'))

  redRangeSlider.set(background.rgbAverage.red)
  greenRangeSlider.set(background.rgbAverage.green)
  blueRangeSlider.set(background.rgbAverage.blue)
}

redRangeSlider.target.children[0].style.background = '#c0392b'
greenRangeSlider.target.children[0].style.background = '#27ae60'
blueRangeSlider.target.children[0].style.background = '#2980b9'
