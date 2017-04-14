const getHttpRequest = () => {
  let httpRequest = false

  if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest()
    if (httpRequest.overrideMimeType) {
      httpRequest.overrideMimeType('text/xml')
    }
  }

  if (!httpRequest) {
    alert('Abort, unable to create an XMLHTTP instance')
    return false
  }

  return httpRequest
}

export default getHttpRequest
