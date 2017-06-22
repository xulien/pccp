import getElement from '../getElement'

const workspace = getElement('div', { id: 'workspace' })

workspace.style.position = 'relative'
workspace.style['flex-grow'] = 3
workspace.style['min-width'] = '300px'
workspace.style['min-height'] = '300px'
workspace.style['background-color'] = 'black'
workspace.style.display = 'inline-block'
workspace.style['vertical-align'] = 'top'
workspace.style.margin = '10px'
workspace.style.border = '3px solid black'

export default workspace
