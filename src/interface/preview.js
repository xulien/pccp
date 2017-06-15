import getElement from '../getElement'
const preview = getElement('img', { id: 'preview', alt: 'cliquez ici pour charger une image' })

preview.style['max-width'] = '100%'//(options.board.side - 5) + 'px'
preview.style['max-height'] = '100%'//(options.board.side - 5) + 'px'

export default preview
