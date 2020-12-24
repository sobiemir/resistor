import { Point2D } from '../../math/point2d';
import { BasicShape } from '../base/basic-shape';

export class PositionMarkerShape extends BasicShape {
  private _position: Point2D = new Point2D(0, 0);
  private _size = 4;

  public getSize(): number {
    return this._size;
  }

  public setSize(size: number): void {
    this._size = size;
    this.refreshStyles();
  }

  public getPosition(): Point2D {
    return this._position;
  }

  public setPosition(position: Point2D): void {
    this._position = position;
    this.refreshPosition();
  }

  public onMouseDown(event: MouseEvent): PositionMarkerShape | null {
    return this;
  }

  public onMouseUp(event: MouseEvent): PositionMarkerShape | null {
    return this;
  }

  public onMouseMove(event: MouseEvent): PositionMarkerShape | null {
    const currPoint = this.getMousePosition(event);
    this.setPosition(currPoint);

    return this;
  }

  public setVisible(visible: boolean): void {
    if (this._shapeElement == null) {
      this.generateShape();
    }
    super.setVisible(visible);
  }

  protected refreshPosition(): void {
    if (this._shapeElement == null) {
      return;
    }
    this._shapeElement.setAttribute('cx', this._position.x.toString());
    this._shapeElement.setAttribute('cy', this._position.y.toString());
  }

  protected refreshStyles(): void {
    if (this._shapeElement == null) {
      return;
    }
    this._shapeElement.setAttribute('r', this._size.toString());
    this._shapeElement.style.display = this._visible
      ? 'initial'
      : 'none';
    this._shapeElement.style.fill = 'none';
    this._shapeElement.style.stroke = 'blue';
    this._shapeElement.style.strokeWidth = '0.5';
  }

  protected generateShape(): void {
    const positionMarker = this._renderer.createElement('circle', 'svg');
    this._shapeElement = positionMarker;

    this.refreshPosition();
    this.refreshStyles();

    this._renderer.appendChild(this._diagramService.getControlsContainer(), this._shapeElement);
  }
}