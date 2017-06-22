import getElement from './getElement'
import workspace from './components/workspace'
import { canvas_bg, canvas_fg } from './components/workzone'
import { loadboxLayout } from './components/loadbox'
import { popin } from './components/popin'
import { preview } from './components/preview'
import { control } from './components/control'

export default pccp => {
  workspace.appendChild(canvas_bg)
  workspace.appendChild(canvas_fg)

  popin.appendChild(workspace)
  popin.appendChild(control)

  const dashboard = exports.dashboard = getElement('div', { className: 'dashboard' })
  const flash = exports.flash = getElement('label', { id: 'flash', text: ' ' })

  flash.style.margin = '0 5px'

  dashboard.style.width = '100%'
  dashboard.style.display = 'flex'
  dashboard.style['max-height'] = '30px'

  dashboard.appendChild(loadboxLayout)
  dashboard.appendChild(flash)

  pccp.appendChild(dashboard)
  pccp.appendChild(popin)

  pccp.appendChild(preview)

  pccp.style.display = 'inline-flex'
  pccp.style['flex-wrap'] = 'wrap'
  pccp.style.width = '100%'
  pccp.style['min-height'] = '600px'
}
