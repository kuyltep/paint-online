export default class Tool {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  constructor(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext("2d") : null;
    this.destroyEvents();
  }

  destroyEvents() {
    if (this.canvas) {
      this.canvas.onmousedown = null;
      this.canvas.onmousemove = null;
      this.canvas.onmouseup = null;
    }
  }
}
