import getElement from '../getElement'

const loadboxLayout = getElement('div', { className: 'loadbox-layout' })
const loadboxLabel = getElement('label', { for_: 'loadbox', className: 'loadbox-label', text: 'load image' })
const loadbox = getElement('input', { id: 'loadbox', type: 'file' })


loadboxLabel.style.cursor = 'pointer'
loadboxLabel.style.color = '#00b1ca'
loadboxLabel.style.padding = '0 5px'
loadboxLabel.style['font-weight'] = 'bold'
loadboxLabel.style.border = '2px dashed grey'

loadbox.style.display = 'none'

loadboxLayout.style.width = '120px'
loadboxLayout.style.display = 'block'
//loadboxLayout.style['vertical-align'] = 'top'

loadboxLayout.appendChild(loadboxLabel)
loadboxLayout.appendChild(loadbox)

//loadboxLabel.style['min-width'] = loadboxLabel.style['min-height'] = options.workzone
exports.loadbox = loadbox
exports.loadboxLayout = loadboxLayout
