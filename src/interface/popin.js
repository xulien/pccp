import getElement from '../getElement'

const popin = exports.popin = getElement('div', { id: 'popin' })
popin.style.display = 'none'

const popin_bg = exports.popin_bg = getElement('div', { id: 'popin-bg' })
popin_bg.style.position = 'fixed'
popin_bg.style.top = 0
popin_bg.style.background = 'black'
popin_bg.style.width = '100%'
popin_bg.style.height = '100%'
popin_bg.style.opacity = '.5'

const popin_fg = exports.popin_fg = getElement('div', { id: 'popin-fg' })
popin_fg.style['max-width'] = '90%'
popin_fg.style.background = '#ddd'
popin_fg.style.margin = '0 auto'
popin_fg.style.padding = '2em'
popin_fg.style['z-index'] = 1
popin_fg.style.position = 'absolute'
popin_fg.style.left = 0
popin_fg.style.right = 0
popin_fg.style['border-radius'] = '1em'
