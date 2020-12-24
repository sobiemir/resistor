import { Renderer2 } from '@angular/core';
import { SVGHTMLElement } from 'src/app/app.types';
import { Point2D } from '../../math/point2d';
import { BasicShape } from '../base/basic.shape';

export class PositionMarker extends BasicShape {
  private _position: Point2D = new Point2D(0, 0);
  private _size = 4;

  public constructor(
    protected renderer: Renderer2,
    protected viewport: SVGHTMLElement,
    protected controlsContainer: SVGGElement
  ) {
    super(renderer, viewport);
    this.generateMarker();
  }

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

  public onMouseDown(event: MouseEvent): PositionMarker | null {
    return this;
  }

  public onMouseMove(event: MouseEvent): PositionMarker | null {
    const currPoint = this.getMousePosition(event);
    this.setPosition(currPoint);

    return this;
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

  private generateMarker(): void {
    const polyline = this.renderer.createElement('circle', 'svg');
    this._shapeElement = polyline;

    this.refreshPosition();
    this.refreshStyles();

    console.log(this.controlsContainer);
    this.renderer.appendChild(this.controlsContainer, this._shapeElement);
  }
}
