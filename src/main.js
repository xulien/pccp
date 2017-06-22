import Background from './background'
import Clip from './clip'
import { options } from './app'
import { canvas_bg, canvas_fg } from './components/workzone'
import workspace from './components/workspace'
import { popin } from './components/popin'
import { eventSlider } from './components/slider'
import { eventBrightness } from './components/brightness'
import { eventControl, show, save, editor_button } from './components/control'
import { raw } from './app'
import { dashboard } from './dashboard'

const debug = require('debug')('pccp:main')

export default () => {

  show(popin)
  const workspace_raw = workspace.getBoundingClientRect()
  debug('workspace_raw', workspace_raw)

  options.workzone = (workspace_raw.height < 1000) ? workspace_raw.height: 1000

  raw.ratio = raw.width / raw.height

  // Initial canvas_bg size ==========
  if (raw.ratio < 1) {
    canvas_bg.width = canvas_fg.width = options.workzone * raw.ratio
    canvas_bg.height = canvas_fg.height = options.workzone
  } else if (raw.ratio > 1) {
    canvas_bg.width = canvas_fg.width = options.workzone
    canvas_bg.height = canvas_fg.height = options.workzone / raw.ratio
  } else {
    canvas_bg.width = canvas_fg.width = canvas_bg.height = canvas_fg.height  = options.workzone
  }
  // =============================================================================

  const background = new Background()
  const clip = new Clip()
  dashboard.appendChild(editor_button)
  dashboard.appendChild(save)
  eventSlider(background)
  eventControl(clip, background)
  eventBrightness()

}
