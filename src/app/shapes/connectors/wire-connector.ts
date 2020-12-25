import { SVGGHTMLElement } from 'src/app/app.types';
import { Point2D } from '../../math/point2d';
import { ShapeBase } from '../base/shape-base';

export class WireConnectorShape extends ShapeBase {
  protected _position: Point2D = new Point2D(0, 0);
  protected _radius = 3;

  public initialize(position: Point2D, radius: number = 3): void {
    this._position = position;
    this._radius = radius;

    this.generateShape();
  }

  public getRadius(): number {
    return this._radius;
  }

  public getPosition(): Point2D {
    return this._position;
  }

  public setRadius(size: number): void {
    this._radius = size;
    this.refreshRadius();
  }

  public setPosition(position: Point2D): void {
    this._position = position;
    this.refreshPosition();
  }

  public setVisible(visible: boolean): void {
    if (this._svgElement == null) {
      this.generateShape();
    }
    super.setVisible(visible);
  }

  protected getSVGContainer(): SVGGHTMLElement {
    return this._diagramService.getConnectorsContainer();
  }

  protected refreshPosition(): void {
    this._svgElement?.setAttribute('cx', this._position.x.toString());
    this._svgElement?.setAttribute('cy', this._position.y.toString());
  }

  protected refreshRadius(): void {
    this._svgElement?.setAttribute('r', this._radius.toString());
  }

  protected generateShape(): void {
    const positionMarker = this._renderer.createElement('circle', 'svg');
    this._svgElement = positionMarker;

    this.refreshRadius();
    this.refreshPosition();
    this.setStyles({
      fill: 'black'
    });

    this.create();
  }
}
