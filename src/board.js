
import getElement from './getElement'
import Workspace from './interface/workspace'
import { canvas_background, canvas_clip } from './interface/canvas'
import { dropbox, dropboxLayout } from './interface/dropbox'
import preview from './interface/preview'
import { popin, popin_bg, popin_fg } from './interface/popin'
import {
  control,
  moreBrightness,
  lessBrightness,
  clear,
  save,
  apply,
  redRangeSlider,
  greenRangeSlider,
  blueRangeSlider
} from './interface/control'

export default (pccp, options) => {

  const workspace = Workspace(options)

  // popin

  const show_button = getElement('button', { id: 'show_button', text: options.label })

  workspace.appendChild(canvas_background)
  workspace.appendChild(canvas_clip)

  popin_fg.appendChild(workspace)
  popin_fg.appendChild(control)

  popin.appendChild(popin_bg)
  popin.appendChild(popin_fg)

  // pccp
  pccp.appendChild(dropboxLayout)
  pccp.appendChild(preview)
  pccp.appendChild(popin)
  pccp.appendChild(show_button)
  pccp.appendChild(save)

  pccp.style.display = 'inline-flex'
  pccp.style['flex-wrap'] = 'wrap'
  pccp.style.width = '100%'

  return {
    popin,
    popin_bg,
    show_button,
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
