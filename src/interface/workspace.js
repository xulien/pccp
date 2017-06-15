import getElement from '../getElement'

function Workspace(options) {
  // workspace
  const workspace = getElement('div', { id: 'workspace' })

  workspace.style.width = workspace.style.height = options.board.side
  workspace.style.position = 'relative'
  workspace.style['min-width'] = '300px'
  workspace.style['min-height'] = '300px'
  workspace.style['background-color'] = 'black'
  workspace.style.display = 'inline-block'
  workspace.style['vertical-align'] = 'top'
  workspace.style.margin = '10px'
  workspace.style.border = '3px solid black'

  return workspace
}

export default Workspace
