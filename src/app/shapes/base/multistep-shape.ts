import { EMouseButton } from 'src/app/enums/mouse-button.enum';
import { Shape } from './shape';

export abstract class MultistepShape extends Shape {
  public isMultistep(): boolean {
    return true;
  }

  public abstract createStep(event: MouseEvent): void;
  public abstract modifySelectedStep(event: MouseEvent): void;
  public abstract removeSelectedStep(event: MouseEvent): void;

  public onMouseDown(event: MouseEvent): Shape | null {
    if (event.button === EMouseButton.Right) {
      this.removeSelectedStep(event);
      return null;
    }
    if (!this.wasCreated()) {
      this.create(event);
    } else {
      this.createStep(event);
    }
    return this;
  }

  public onMouseMove(event: MouseEvent): Shape | null {
    this.modifySelectedStep(event);
    return this;
  }
}
