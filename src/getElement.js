import debug from 'debug'
const create = debug('getElement:create')
const skip = debug('getElement:skip')

export default (obj, options) => {
  const { className, id, type, alt, text } = options

  let el = (id) ? document.getElementById(id) : document.getElementsByClassName(className)[0]
  let info = ''

  if (id) info += ` id: ${id} `
  if (className) info += ` className: ${className} `
  if (type) info += ` type: ${type} `
  if (alt) info += ` alt: ${alt} `

  if (!el) {
    el = document.createElement(obj)

    if (id) el.id = id
    if (className) el.className = className
    if (type) el.type = type
    if (alt) el.alt = alt

    if (text) el.appendChild(document.createTextNode(text))

    create(`create a new ${obj} ${info}`)
  } else {
    skip(`${info} - ${obj} exist => skip`)
  }

  return el
}
