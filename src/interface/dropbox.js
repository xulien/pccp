import getElement from '../getElement'

const dropboxLayout = getElement('div', { className: 'dropbox-layout' })
const dropboxLabel = getElement('label', { className: 'dropbox' })
const dropbox = getElement('input', { id: 'dropbox', type: 'file' })

// dropboxLabel.style.border = '2px dashed #BBBBBB'
// dropboxLabel.style['line-height'] = '50px'
// dropboxLabel.style['text-align'] = 'center'
// dropboxLabel.style.display = 'inline-block'
// dropboxLabel.style.padding = '6px'
// dropboxLabel.style.cursor = 'pointer'

dropboxLabel.appendChild(dropbox)
//dropboxLabel.appendChild(preview)

dropboxLayout.appendChild(dropboxLabel)
dropboxLayout.style['min-width'] = dropboxLayout.style['min-height']
dropboxLayout.style.display = 'inline-block'
dropboxLayout.style['vertical-align'] = 'top'

//dropboxLabel.style['min-width'] = dropboxLabel.style['min-height'] = options.board.side
exports.dropbox = dropbox
exports.dropboxLayout = dropboxLayout
