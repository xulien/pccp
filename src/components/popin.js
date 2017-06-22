import getElement from '../getElement'

const popin = exports.popin = getElement('div', { id: 'popin' })
popin.style.position = 'fixed'
popin.style.top = '20px'
popin.style.left = 0
popin.style.right = 0
popin.style.display = 'none'
popin.style['max-width'] = '90%'
popin.style.height = '90%'
popin.style.background = '#ddd'
popin.style.margin = '0 auto'
popin.style.padding = '2em'
popin.style['z-index'] = 1
popin.style['border-radius'] = '1em'
