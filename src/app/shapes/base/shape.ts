import { Vector2d } from '../../math/vector2d';
import { ShapeConfiguration } from './shape-configuration';

export abstract class Shape extends ShapeConfiguration {
  protected _shapeElement: SVGElement | null = null;

  public isMultistep(): boolean {
    return false;
  }

  public create(event: MouseEvent): void {
    if (this.wasCreated()) {
      throw new Error('This element was created before.');
    }
    this._created = true;
  }

  public getMousePosition(event: MouseEvent): Vector2d {
    const ctm = this.viewport?.getScreenCTM();
    if (ctm == null) {
      throw new Error('There was an undefined error while executing getMousePosition function.');
    }
    let mx = (event.clientX - ctm.e) / ctm.a;
    let my = (event.clientY - ctm.f) / ctm.d;

    if (Shape._snapToGrid) {
      const snapSize = Shape._snapToGridSize;
      const halfSnap = snapSize / 2;

      mx = ~~((mx + halfSnap) / snapSize) * snapSize;
      my = ~~((my + halfSnap) / snapSize) * snapSize;
    }
    return new Vector2d(mx, my);
  }

  public getShapeElement(): SVGElement {
    if (this._shapeElement == null) {
      throw new Error('Shape was not created yet.');
    }
    return this._shapeElement;
  }

  public onMouseDown(event: MouseEvent): Shape | null {
    if (!this.wasCreated()) {
      this.create(event);
    }
    return this;
  }

  public onMouseMove(event: MouseEvent): Shape | null {
    return this;
  }
}
