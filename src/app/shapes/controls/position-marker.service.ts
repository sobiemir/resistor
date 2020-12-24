import { Renderer2 } from '@angular/core';
import { SVGHTMLElement } from 'src/app/app.types';
import { Point2D } from '../../math/point2d';
import { BasicShape } from '../base/basic-shape';

export class PositionMarkerService extends BasicShape {
  private _position: Point2D = new Point2D(0, 0);
  private _size = 4;
  // private _viewport: SVGHTMLElement | null = null;
  private _controlsContainer: SVGGElement | null = null;

  // public constructor(
  //   protected _renderer: Renderer2,
  // ) {
  //   super(_renderer, _viewport);
  //   this.generateMarker();
  // }

  public initialize(
    viewport: SVGHTMLElement,
    controlsContainer: SVGGElement
  ) {

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

  public onMouseDown(event: MouseEvent): PositionMarkerService | null {
    return this;
  }

  public onMouseMove(event: MouseEvent): PositionMarkerService | null {
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
    const polyline = this._renderer.createElement('circle', 'svg');
    this._shapeElement = polyline;

    this.refreshPosition();
    this.refreshStyles();

    this._renderer.appendChild(this._controlsContainer, this._shapeElement);
  }
}
