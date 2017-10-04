const glm = require('gl-matrix')
const mat4 = glm.mat4

class Camera {
  constructor (options) {
    this.position = options.position
    this.fieldOfView = options.fieldOfView
    this.aspectRatio = options.aspectRatio
    this.zNear = options.zNear
    this.zFar = options.zFar
    this._projectionMatrix = mat4.create()
    this._modelviewMatrix = mat4.create()
  }

  projectionMatrix () {
    mat4.perspective(this._projectionMatrix,
      this.fieldOfView,
      this.aspectRatio,
      this.zNear,
      this.zFar)
    return this._projectionMatrix
  }

  modelviewMatrix () {
    mat4.identity(this._modelviewMatrix)
    mat4.translate(this._modelviewMatrix,
      this._modelviewMatrix,
      [this.position.x, this.position.y, this.position.z])
    return this._modelviewMatrix
  }

  viewRectangle () {
    // right now this looks straight, if there is camera tilt
    // it will have to be adjusted
    var span = Math.abs(Math.ceil(Math.tan(this.aspectRatio) *
      this.position.z))
    return {
      x: this.position.x - span,
      y: this.position.y - span,
      width: span * 2,
      height: span * 2
    }
  }
}

Camera.DEFAULT = new Camera({
  position: {
    x: 0,
    y: 0,
    z: -6
  },
  aspectRatio: 1.0,
  fieldOfView: 45 * Math.PI / 180,
  zNear: 0.1,
  zFar: 100.0
})

export { Camera as default }
