/* eslint-disable @typescript-eslint/no-explicit-any */
import toolState from "../store/toolState";
import Tool from "./Tool";

export default class Brash extends Tool {
  mouseDown: boolean;
  constructor(
    canvas: HTMLCanvasElement | null,
    socket: WebSocket | null,
    id: string | null
  ) {
    super(canvas, socket, id);
    this.mouseDown = false;
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
    this.socket?.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish",
        },
      })
    );
  }
  mouseDownHandler(e: any) {
    this.mouseDown = true;
    this.ctx?.beginPath();
    this.ctx?.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
  }
  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
      this.socket?.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "brush",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
          },
        })
      );
    }
  }

  static draw(ctx: CanvasRenderingContext2D | null, x: number, y: number) {
    ctx?.lineTo(x, y);
    ctx!.lineWidth = toolState.lineWidth;
    ctx!.strokeStyle = toolState.color;
    ctx?.stroke();
  }
}
