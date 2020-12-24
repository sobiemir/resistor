import { Point2D } from 'src/app/math/point2d';
import { ShapeConfiguration } from './shape.configuration';

export abstract class BasicShape extends ShapeConfiguration {
  protected _shapeElement: SVGElement | null = null;
  protected _created = false;
  protected _visible = true;

  public abstract onMouseDown(event: MouseEvent): BasicShape | null;
  public abstract onMouseMove(event: MouseEvent): BasicShape | null;
  protected abstract refreshStyles(): void;

  public isVisible(): boolean {
    return this._visible;
  }

  public setVisible(visible: boolean): void {
    this._visible = visible;
    this.refreshStyles();
  }

  public getMousePosition(event: MouseEvent): Point2D {
    const ctm = this.viewport?.getScreenCTM();
    if (ctm == null) {
      throw new Error('There was an undefined error while executing getMousePosition function.');
    }
    let mx = (event.clientX - ctm.e) / ctm.a;
    let my = (event.clientY - ctm.f) / ctm.d;

    if (ShapeConfiguration._snapToGrid) {
      const snapSize = ShapeConfiguration._snapToGridSize;
      const halfSnap = snapSize / 2;

      mx = ~~((mx + halfSnap) / snapSize) * snapSize;
      my = ~~((my + halfSnap) / snapSize) * snapSize;
    }
    return new Point2D(mx, my);
  }

  public getShapeElement(): SVGElement {
    if (this._shapeElement == null) {
      throw new Error('Shape was not created yet.');
    }
    return this._shapeElement;
  }
}
