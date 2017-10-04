// import uuidv4 from 'uuid/v4'

class Tile {
  constructor (options) {
    this.position = options.position
    this.color = [0.0, 0.0, 1.0, 1.0]
  }

  appendTriangles (positions, indices) {
    var x = this.position.x
    var y = this.position.y
    var offset = y % 2 === 0 ? 0 : -0.5
    var p = positions.length
    positions.push(
      x - offset, y - y * 0.143,
      x + 0.5 - offset, y + 0.288 - y * 0.143,
      x + 0.5 - offset, y - 0.288 - y * 0.143,
      x - offset, y - 0.577 - y * 0.143,
      x - 0.5 - offset, y - 0.288 - y * 0.143,
      x - 0.5 - offset, y + 0.288 - y * 0.143,
      x - offset, y + 0.577 - y * 0.143,
      x + 0.5 - offset, y + 0.288 - y * 0.143
    )
    indices.push(
      p, p + 1, p + 2,
      p, p + 2, p + 3,
      p, p + 3, p + 4,
      p, p + 4, p + 5,
      p, p + 5, p + 6,
      p, p + 6, p + 7
    )
  }

  appendColors (colors) {
    colors.push(this.color[0], this.color[1], this.color[2], this.color[3])
  }
}

export { Tile as default }
