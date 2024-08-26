import toolState from "../store/toolState";
import Tool from "./Tool";

export default class Eraser extends Tool {
  mouseDown: boolean;
  startX: number;
  startY: number;
  constructor(canvas: HTMLCanvasElement | null) {
    super(canvas);
    this.mouseDown = false;
    this.startX = 0;
    this.startY = 0;
    this.listen();
  }

  listen() {
    if (this.canvas) {
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
      this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mouseUpHandler(e: any) {
    this.mouseDown = false;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mouseDownHandler(e: any) {
    this.mouseDown = true;
    this.ctx?.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      const currentX = e.pageX - e.target.offsetLeft;
      const currnetY = e.pageY - e.target.offsetTop;
      this.draw(currentX, currnetY);
    }
  }

  draw(x: number, y: number) {
    this.ctx?.lineTo(x, y);
    this.ctx!.lineWidth = toolState.lineWidth;
    this.ctx?.stroke();
    this.ctx!.strokeStyle = "white";
  }
}
