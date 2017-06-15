import getElement from '../getElement'

const canvas_clip = exports.canvas_clip = getElement('canvas', { id: 'mask' })

const canvas_background = exports.canvas_background = getElement('canvas', { id: 'background' })
canvas_background.style.position = canvas_clip.style.position = 'absolute'
canvas_background.style.top = canvas_clip.style.top = 0
canvas_background.style.left = canvas_clip.style.left = 0
