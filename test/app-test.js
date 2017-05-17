import should from 'should'
import Background from '../src/background'
import Clip from '../src/clip'

const pix = data => {
  let black = 0, white = 0

  for (let i = 0; i < data.length; i+=4) {
    const v = data[i] + data[i+1] + data[i+2]
    if (v > 510 ) white +=1
    else black +=1
  }
  return { white, black }
}

const raw = document.createElement('img')

let preview

describe('Application', () => {

  before(done => {
    raw.onload = () => {
      preview = raw.cloneNode(true)
      done()
    }
    raw.src = '/img/carre_500x500_100x100_50.png'
  })

  context('square src', () => {

    context('horizontal clip', () => {

      const options = {
        board: {
          side: 500
        },
        clip: {
          r: 1.5,
          s: 'rgba(0,0,0,0.9)'
        },
        output: {
          w: 300,
          h: 200
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = options.board.side

      it('initial load', () => {
        const background = new Background(preview, raw, canvas, options)
        const consistency = pix(background.imageData.data)
        consistency.should.be.eql({ white: 200000, black: 50000 })
      })

      it('result', () => {
        const background = new Background(preview, raw, canvas, options)
        const clip = new Clip(canvas, options)
        clip.selected = { sx: 100, sy: 100, sw: 300, sh: 200 }
        clip.debug = true
        clip.draw()

        const rCanvas = background.applyToNewestCanvas(clip)
        const rContext = rCanvas.getContext('2d')
        const rData = rContext.getImageData(0,0, rCanvas.width, rCanvas.height)

        const consistency = pix(rData.data)
        consistency.should.be.eql({ white: 30000, black: 30000 })
      })

    })

  })

})
