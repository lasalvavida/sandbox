import Tile from './Tile'

class Map {
  constructor (width, height) {
    this.width = width
    this.height = height
    this.tiles = []
    for (var i = 0; i < width; i++) {
      var row = []
      for (var j = 0; j < height; j++) {
        row.push(undefined)
      }
      this.tiles.push(row)
    }
    this.tiles[0][0] = new Tile({
      position: {
        x: 0,
        y: 0
      }
    })
    this.tiles[1][0] = new Tile({
      position: {
        x: 1,
        y: 0
      }
    })
    this.tiles[0][1] = new Tile({
      position: {
        x: 0,
        y: 1
      }
    })
    this.tiles[1][1] = new Tile({
      position: {
        x: 1,
        y: 1
      }
    })
    this.tiles[0][2] = new Tile({
      position: {
        x: 0,
        y: 2
      }
    })
    this.tiles[1][2] = new Tile({
      position: {
        x: 1,
        y: 2
      }
    })
  }
}

export { Map as default }
