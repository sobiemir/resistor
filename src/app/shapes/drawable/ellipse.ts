import { SVGGHTMLElement } from 'src/app/app.types';
import { ICSSOptions } from 'src/interfaces/css-options.interface';
import { Point2D } from '../../math/point2d';
import { ShapeBase } from '../base/shape-base';

export class EllipseShape extends ShapeBase {
  protected _position: Point2D = new Point2D(0, 0);
  protected _radius: Point2D = new Point2D(0, 0);
  protected _defaultStyle: ICSSOptions = {
    fill: 'none',
    stroke: 'black',
    strokeWidth: '1'
  };

  public initialize(position: Point2D, r: number): void;
  public initialize(position: Point2D, rx: number, ry: number): void;
  public initialize(position: Point2D, rx: number, ry: number | null = null): void {
    this._position = position;

    if (ry == null) {
      this._radius = new Point2D(rx, rx);
    } else {
      this._radius = new Point2D(rx, ry);
    }
    this.generateShape();
  }

  public getRadius(): Point2D {
    return this._radius;
  }

  public setRadius(r: number): void;
  public setRadius(rx: number, ry: number): void;
  public setRadius(rx: number, ry: number | null = null): void {
    if (ry == null) {
      this._radius = new Point2D(rx, rx);
    } else {
      this._radius = new Point2D(rx, ry);
    }
    this.refreshRadius();
  }

  public getPosition(): Point2D {
    return this._position;
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
    return this._diagramService.getShapesContainer();
  }

  protected refreshPosition(): void {
    this._svgElement?.setAttribute('cx', this._position.x.toString());
    this._svgElement?.setAttribute('cy', this._position.y.toString());
  }

  protected refreshRadius(): void {
    this._svgElement?.setAttribute('rx', this._radius.x.toString());
    this._svgElement?.setAttribute('ry', this._radius.y.toString());
  }

  protected generateShape(): void {
    const positionMarker = this._renderer.createElement('ellipse', 'svg');
    this._svgElement = positionMarker;

    this.refreshRadius();
    this.refreshPosition();

    this.setStyles(this._defaultStyle);
    this.create();
  }
}
