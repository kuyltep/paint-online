/* eslint-disable @typescript-eslint/no-explicit-any */
import toolState from "../store/toolState";
import Tool from "./Tool";

export default class Circle extends Tool {
  mouseDown: boolean;
  startX: number;
  startY: number;
  width: number;
  height: number;
  saved: string;
  constructor(canvas: HTMLCanvasElement | null) {
    super(canvas);
    this.mouseDown = false;
    this.startX = 0;
    this.startY = 0;
    this.width = 0;
    this.height = 0;
    this.saved = "";
    this.listen();
  }

  listen() {
    if (this.canvas) {
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
      this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }
  }

  mouseUpHandler(e: any) {
    this.mouseDown = false;
  }
  mouseDownHandler(e: any) {
    this.mouseDown = true;
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.ctx?.beginPath();
    this.saved = this.canvas?.toDataURL() || "";
  }
  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      const currentX = e.pageX - e.target.offsetLeft;
      const currnetY = e.pageY - e.target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currnetY - this.startY;
      this.draw(this.startX, this.width, this.startY, this.height);
    }
  }

  draw(x: number, width: number, y: number, height: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx?.clearRect(
        0,
        0,
        this.canvas?.width || 0,
        this.canvas?.height || 0
      );
      this.ctx?.drawImage(
        img,
        0,
        0,
        this.canvas?.width || 0,
        this.canvas?.height || 0
      );
      this.ctx?.beginPath();
      this.ctx?.arc(x, y, Math.abs(width + height) / 2, 0, 2 * Math.PI);
      this.ctx!.strokeStyle = toolState.color;
      this.ctx?.stroke();
      this.ctx!.fillStyle = toolState.color;
      this.ctx?.fill();
    };
  }
}
