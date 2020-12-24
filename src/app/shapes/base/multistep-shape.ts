import { EMouseButton } from 'src/app/enums/mouse-button.enum';
import { Shape } from './shape';

export abstract class MultistepShape extends Shape {
  public isMultistep(): boolean {
    return true;
  }

  public abstract onCreateStep(event: MouseEvent): void;
  public abstract modifySelectedStep(event: MouseEvent): void;
  public abstract removeSelectedStep(event: MouseEvent): void;

  public onCreateEnd(event: MouseEvent): void {
    this.removeSelectedStep(event);
  }

  public onMouseDown(event: MouseEvent): Shape | null {
    if (event.button === EMouseButton.Right) {
      this.onCreateEnd(event);
      return null;
    }
    if (!this._createStarted) {
      this.onCreateStart(event);
    } else {
      this.onCreateStep(event);
    }
    return this;
  }

  public onMouseUp(event: MouseEvent): Shape | null {
    return this;
  }

  public onMouseMove(event: MouseEvent): Shape | null {
    this.modifySelectedStep(event);
    return this;
  }
}
