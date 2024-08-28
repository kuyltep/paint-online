import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null;
  undoList: string[] = [];
  redoList: string[] = [];
  username: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
  }

  pushToUndo(data: string) {
    this.undoList.push(data);
  }

  pushToRedo(data: string) {
    this.redoList.push(data);
  }

  setUsername(username: string) {
    this.username = username;
  }

  undo() {
    const ctx = this.canvas?.getContext("2d");
    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop() || "";
      this.redoList.push(this.canvas?.toDataURL() || "");
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
        ctx?.drawImage(
          img,
          0,
          0,
          this.canvas?.width || 0,
          this.canvas?.height || 0
        );
      };
    } else {
      ctx?.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
    }
  }
  redo() {
    const ctx = this.canvas?.getContext("2d");
    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop() || "";
      this.undoList.push(this.canvas?.toDataURL() || "");
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
        ctx?.drawImage(
          img,
          0,
          0,
          this.canvas?.width || 0,
          this.canvas?.height || 0
        );
      };
    } else {
      ctx?.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
    }
  }
}

export default new CanvasState();
