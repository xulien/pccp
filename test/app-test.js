import should from 'should'
import Background from '../src/background'
import Clip from '../src/clip'

const raw = document.createElement('img')

let preview

describe('Application', () => {

  describe('square src', () => {

    describe('horizontal clip', () => {

      before(done => {
        raw.onload = () => {
          preview = raw.cloneNode(true)

          done()
        }
        raw.src = '/img/carre_500x500_100x100_50.png'
      })

      const options = {
        board: {
          side: 500
        },
        clip: {
          r: 1,
          s: 'rgba(0,0,0,0.9)'
        },
        output: {
          w: 300,
          h: 150
        }
      }

      it('initial load', () => {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = options.board.side

        const background = new Background(preview, raw, canvas, options)

        let consistency = background.imageData.data.reduce((a, b) => a + b)
        consistency.should.be.eql(216750000)

      })

      it('right result', () => {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = options.board.side

        const background = new Background(preview, raw, canvas, options)
        let consistency = background.imageData.data.reduce((a, b) => a + b)

        const clip = new Clip(canvas, options)
        clip.positioning(250, 200)

        clip.selected.sx.should.be.eql(50)
        clip.selected.sy.should.be.eql(100)
        clip.selected.sw.should.be.eql(400)
        clip.selected.sh.should.be.eql(200)

        const rCanvas = background.applyToNewestCanvas(clip)

        const rContext = rCanvas.getContext('2d')
        const rData = rContext.getImageData(0,0, rCanvas.width, rCanvas.height)

        consistency = rData.data.reduce((a, b) => a + b)
        consistency.should.be.eql(32989227)
      })

    })

    describe('square clip', () => {

      before(done => {
        raw.onload = () => {
          preview = raw.cloneNode(true)

          done()
        }
        raw.src = '/img/carre_500x500_100x100_50.png'
      })

      const options = {
        board: {
          side: 500
        },
        clip: {
          r: 1,
          s: 'rgba(0,0,0,0.9)'
        },
        output: {
          w: 300,
          h: 300
        }
      }

      it('initial load', () => {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = options.board.side

        const background = new Background(preview, raw, canvas, options)

        let consistency = background.imageData.data.reduce((a, b) => a + b)
        consistency.should.be.eql(216750000)

      })

      it('right result', () => {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = options.board.side

        const background = new Background(preview, raw, canvas, options)
        let consistency = background.imageData.data.reduce((a, b) => a + b)

        const clip = new Clip(canvas, options)
        clip.positioning(250, 200)

        clip.selected.sx.should.be.eql(50)
        clip.selected.sy.should.be.eql(0)
        clip.selected.sw.should.be.eql(400)
        clip.selected.sh.should.be.eql(400)

        const rCanvas = background.applyToNewestCanvas(clip)

        const rContext = rCanvas.getContext('2d')
        const rData = rContext.getImageData(0,0, rCanvas.width, rCanvas.height)

        consistency = rData.data.reduce((a, b) => a + b)
        consistency.should.be.eql(70278899)
      })

    })

    describe('vertical clip', () => {

      before(done => {
        raw.onload = () => {
          preview = raw.cloneNode(true)

          done()
        }
        raw.src = '/img/carre_500x500_100x100_50.png'
      })

      const options = {
        board: {
          side: 500
        },
        clip: {
          r: 1,
          s: 'rgba(0,0,0,0.9)'
        },
        output: {
          w: 150,
          h: 300
        }
      }

      it('initial load', () => {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = options.board.side

        const background = new Background(preview, raw, canvas, options)

        let consistency = background.imageData.data.reduce((a, b) => a + b)
        consistency.should.be.eql(216750000)

      })

      it('right result', () => {
        const canvas = document.createElement('canvas')
        canvas.width = canvas.height = options.board.side

        const background = new Background(preview, raw, canvas, options)
        let consistency = background.imageData.data.reduce((a, b) => a + b)

        const clip = new Clip(canvas, options)
        clip.positioning(200, 250)

        clip.selected.sx.should.be.eql(100)
        clip.selected.sy.should.be.eql(50)
        clip.selected.sw.should.be.eql(200)
        clip.selected.sh.should.be.eql(400)

        const rCanvas = background.applyToNewestCanvas(clip)

        const rContext = rCanvas.getContext('2d')
        const rData = rContext.getImageData(0,0, rCanvas.width, rCanvas.height)

        consistency = rData.data.reduce((a, b) => a + b)
        consistency.should.be.eql(32982018)
      })

    })

  })

})
