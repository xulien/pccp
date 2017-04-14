import noUiSlider from 'nouislider'
import getElement from './getElement'

export default (pccp, options) => {

  // workspace
  const workspace = getElement('div', { id: 'workspace' })
  const canvas_background = getElement('canvas', { id: 'background' })
  const canvas_clip = getElement('canvas', { id: 'mask' })

  canvas_background.style.position = canvas_clip.style.position = 'absolute'
  canvas_background.style.top = canvas_clip.style.top = 0
  canvas_background.style.left = canvas_clip.style.left = 0

  workspace.appendChild(canvas_background)
  workspace.style.width = workspace.style.height = options.board.side
  workspace.style.position = 'relative'
  workspace.style['min-width'] = '300px'
  workspace.style['min-height'] = '300px'
  workspace.style['background-color'] = 'black'
  workspace.style.display = 'inline-block'
  workspace.style['vertical-align'] = 'top'
  workspace.style.margin = '10px'
  workspace.style.border = '3px solid black'
  workspace.appendChild(canvas_clip)

  // dropbox
  const dropboxLayout = getElement('div', { className: 'dropbox-layout' })
  const dropboxLabel = getElement('label', { className: 'dropbox' })
  const dropbox = getElement('input', { id: 'dropbox', type: 'file' })
  const preview = getElement('img', { id: 'preview', alt: 'cliquez ici pour charger une image' })

  preview.style['max-width'] = (options.board.side - 5) + 'px'
  preview.style['max-height'] = (options.board.side - 5) + 'px'

  dropbox.style.display = 'none'

  dropboxLabel.style.border = '2px dashed #BBBBBB'
  dropboxLabel.style['line-height'] = '50px'
  dropboxLabel.style['text-align'] = 'center'
  dropboxLabel.style.display = 'inline-block'
  dropboxLabel.style.padding = '6px'
  dropboxLabel.style.cursor = 'pointer'

  dropboxLabel.appendChild(dropbox)
  dropboxLabel.appendChild(preview)

  dropboxLayout.appendChild(dropboxLabel)
  dropboxLayout.style['min-width'] = dropboxLayout.style['min-height']
  dropboxLayout.style.display = 'inline-block'
  dropboxLayout.style['vertical-align'] = 'top'

  dropboxLabel.style['min-width'] = dropboxLabel.style['min-height'] = options.board.side

  // control
  const control = getElement('div', { className: 'control' })
  const board = getElement('div', { className: 'board' })
  const preset = getElement('div', { className: 'preset' })
  const effect = getElement('div', { className: 'effect' })
  const brightness = getElement('div', { className: 'brightness' })
  const moreBrightness = getElement('button', { id: 'moreBrightness', text: 'Brightness +' })
  const lessBrightness = getElement('button', { id: 'lessBrightness', text: 'Brightness -' })
  const level = getElement('div', { className: 'level' })
  const red = getElement('div', { id: 'red', className: 'item-level' })
  const green = getElement('div', { id: 'green', className: 'item-level' })
  const blue = getElement('div', { id: 'blue', className: 'item-level' })
  const clear = getElement('button', { id: 'clear', text: 'Clear' })
  const apply = getElement('button', { id: 'apply', text: 'Apply' })
  const save = getElement('button', { id: 'save', text: 'Send' })

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
  effect.appendChild(save)

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

  // pccp
  pccp.appendChild(workspace)
  pccp.appendChild(dropboxLayout)
  pccp.appendChild(control)

  pccp.style.display = 'inline-flex'
  pccp.style['flex-wrap'] = 'wrap'
  pccp.style.width = '100%'

  if (red.classList.contains('noUi-target')) red.noUiSlider.destroy()
  if (green.classList.contains('noUi-target')) green.noUiSlider.destroy()
  if (blue.classList.contains('noUi-target')) blue.noUiSlider.destroy()

  const redRangeSlider = noUiSlider.create(red, {
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

  const greenRangeSlider = noUiSlider.create(green, {
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

  const blueRangeSlider = noUiSlider.create(blue, {
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

  return {
    canvas_clip,
    preview,
    canvas_background,
    dropbox,
    clear,
    apply,
    save,
    redRangeSlider,
    greenRangeSlider,
    blueRangeSlider,
    moreBrightness,
    lessBrightness
  }

}
