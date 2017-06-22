import getElement from '../getElement'
import { options } from '../app'

const preview = exports.preview = getElement('div', { id: 'preview' })

preview.style.width = '100%'
preview.style.display = 'flex'
preview.style['flex-wrap'] = 'wrap'

exports.load_preview = () => {
  options.output.forEach((o, i) => {
    const d = getElement('div', { className: 'preview_item' })
    d.style.display = 'flex'
    d.style['flex-direction'] = 'column'

    const l = getElement('label', { text: ' ' })
    const t = getElement('img', { id: 'preview_' + i, alt: 'no picture yet' })
    t.style.margin = '5px'
    t.src ='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAUFBQUFBQUGBgUICAcICAsKCQkKCxEMDQwNDBEaEBMQEBMQGhcbFhUWGxcpIBwcICkvJyUnLzkzMzlHREddXX0BBQUFBQUFBQYGBQgIBwgICwoJCQoLEQwNDA0MERoQExAQExAaFxsWFRYbFykgHBwgKS8nJScvOTMzOUdER11dff/CABEIAAEAAQMBIgACEQEDEQH/xAAUAAEAAAAAAAAAAAAAAAAAAAAI/9oACAEBAAAAAGX/AP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIQAAAAf//EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMQAAAAf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Af//Z'
    t.width = t.height = 1

    d.appendChild(t)
    d.appendChild(l)

    preview.appendChild(d)
  })
}
