import Background from './background'
import Clip from './clip'

function hide(e) {
  e.style.display = 'none'
}

export default (raw, board, options) => {

  const {
    canvas_clip,
    canvas_background,
    popin,
    clear,
    apply,
    save,
    preview,
    redRangeSlider,
    greenRangeSlider,
    blueRangeSlider,
    lessBrightness,
    moreBrightness
  } = board

  raw.ratio = raw.width / raw.height

  // Initial canvas_background size ==========
  if (raw.ratio < 1) {
    canvas_background.width = canvas_clip.width = options.board.side * raw.ratio
    canvas_background.height = canvas_clip.height = options.board.side
  } else if (raw.ratio > 1) {
    canvas_background.width = canvas_clip.width = options.board.side
    canvas_background.height = canvas_clip.height = options.board.side / raw.ratio
  } else {
    canvas_background.width = canvas_clip.width = canvas_background.height = canvas_clip.height  = options.board.side
  }
  // =============================================================================

  const background = new Background(preview, raw, canvas_background, options)
  const clip = new Clip(canvas_clip, options)

  redRangeSlider.updateOptions({ start: [ background.rgbAverage.red ] })
  redRangeSlider.on('update', ( values, handle ) => background.changeColorLevel(Math.round(values[handle]), 'red'))

  greenRangeSlider.updateOptions({ start: [ background.rgbAverage.green ] })
  greenRangeSlider.on('update', ( values, handle ) => background.changeColorLevel(Math.round(values[handle]), 'green'))

  blueRangeSlider.updateOptions({ start: [ background.rgbAverage.blue ] })
  blueRangeSlider.on('update', ( values, handle ) => background.changeColorLevel(Math.round(values[handle]), 'blue'))

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

  redRangeSlider.set(background.rgbAverage.red)
  greenRangeSlider.set(background.rgbAverage.green)
  blueRangeSlider.set(background.rgbAverage.blue)

  apply.addEventListener('click', () => background.apply(clip, dataUri => {
    preview.src = dataUri
    hide(popin)
  }))
  save.addEventListener('click', () => background.save())
  clear.addEventListener('click', () => {
    background.clear()
    redRangeSlider.set(background.rgbAverage.red)
    greenRangeSlider.set(background.rgbAverage.green)
    blueRangeSlider.set(background.rgbAverage.blue)
  })
}
