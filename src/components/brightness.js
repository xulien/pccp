import getElement from '../getElement'
import { redRangeSlider, greenRangeSlider, blueRangeSlider } from './slider'

const brightness = exports.brightness = getElement('div', { className: 'brightness' })
const moreBrightness = exports.moreBrightness = getElement('button', { id: 'moreBrightness', text: 'Brightness +' })
const lessBrightness = exports.lessBrightness = getElement('button', { id: 'lessBrightness', text: 'Brightness -' })

moreBrightness.style.width = '100%'
lessBrightness.style.width = '100%'

brightness.appendChild(moreBrightness)
brightness.appendChild(lessBrightness)

brightness.style.width = '100%'

exports.eventBrightness = () => {
  moreBrightness.addEventListener('click', () => {
    redRangeSlider.set(Math.round(redRangeSlider.get()) + 5)
    greenRangeSlider.set(Math.round(greenRangeSlider.get()) + 5)
    blueRangeSlider.set(Math.round(blueRangeSlider.get()) + 5)
  })

  lessBrightness.addEventListener('click', () => {
    redRangeSlider.set(Math.round(redRangeSlider.get()) - 5)
    greenRangeSlider.set(Math.round(greenRangeSlider.get()) - 5)
    blueRangeSlider.set(Math.round(blueRangeSlider.get()) - 5)
  })
}
