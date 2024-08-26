import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;
  color = "black";
  lineWidth = 1;
  constructor() {
    makeAutoObservable(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTool(tool: any) {
    this.tool = tool;
  }

  setColor(color: string) {
    this.color = color;
  }

  setLineWidth(width: number) {
    if (width > 0) {
      this.lineWidth = width;
    }
  }
}

export default new ToolState();
