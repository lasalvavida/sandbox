<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import Camera from '../lib/Camera'
import Map from '../lib/Map'

export default {
  name: 'renderer',
  data () {
    return {
      camera: Camera.DEFAULT,
      map: new Map(20, 20)
    }
  },
  methods: {
    handleResize () {
      var canvas = this.$refs.canvas
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      this.render()
    },
    render () {
      var canvas = this.$refs.canvas
      var gl = canvas.getContext('webgl')
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      const vsSource = `
        precision highp float;
        attribute vec4 aVertexPosition;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        void main() {
          gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
      `
      const fsSource = `
        precision highp float;

        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
      `

      const vs = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vs, vsSource)
      gl.compileShader(vs)

      if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(vs))
      }

      const fs = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fs, fsSource)
      gl.compileShader(fs)

      if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(fs))
      }

      const shaderProgram = gl.createProgram()
      gl.attachShader(shaderProgram, vs)
      gl.attachShader(shaderProgram, fs)
      gl.linkProgram(shaderProgram)

      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          color: gl.getAttribLocation(shaderProgram, 'aColor')
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
        }
      }

      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      const indicesBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)

      var indices = []
      var positions = []
      var rectangle = this.camera.viewRectangle()
      console.log(rectangle)
      for (var i = rectangle.x; i < rectangle.x + rectangle.width; i++) {
        for (var j = rectangle.y; j < rectangle.y + rectangle.height; j++) {
          if (i >= 0 && j >= 0 && i < this.map.width && j < this.map.height) {
            var tile = this.map.tiles[i][j]
            if (tile) {
              tile.appendTriangles(positions, indices)
            }
          }
        }
      }

      gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW)

      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW)

      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0)
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)

      gl.useProgram(programInfo.program)

      gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        this.camera.projectionMatrix())
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        this.camera.modelviewMatrix())

      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
canvas {
  position: absolute;
}
</style>
