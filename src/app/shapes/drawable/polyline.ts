import { SVGGHTMLElement } from 'src/app/app.types';
import { Vector2D } from 'src/app/math/vector2d';
import { Point2D } from '../../math/point2d';
import { ShapeBase } from '../base/shape-base';

export class PolylineShape extends ShapeBase {
  public pointsAttribute = '';

  protected _points: Point2D[] = [];
  protected _vectors: Vector2D[] = [];

  public initialize(points: Point2D[]): void {
    this.setPoints(points);
    this.generateShape();
  }

  public getPoints(): Point2D[] {
    return this._points;
  }

  public setPoints(points: Point2D[]): void {
    if (points.length < 2) {
      throw new Error('Polyline requires at least 2 defined points.');
    }
    this._points.push(...points);
    this.refreshPoints();
  }

  public addPoint(point: Point2D): void {
    this._points.push(point);
    this.refreshPoints();
  }

  public setPoint(index: number, point: Point2D): void {
    this._points[index] = point;
    this.refreshPoints();
  }

  public removePoint(index: number = -1): void {
    if (index === -1) {
      index = this._points.length - 1;
    }
    if (this._points.length <= 2) {
      throw new Error('Polyline requires at least 2 defined points.');
    }
    this._points.splice(index, 1);
    this.refreshPoints();
  }

  protected getSVGContainer(): SVGGHTMLElement {
    return this._diagramService.getShapesContainer();
  }

  private generateShape(): void {
    const polyline = this._renderer.createElement('polyline', 'svg');
    this._svgElement = polyline;

    this.refreshPoints();
    this.setStyles({
      fill: 'none',
      stroke: 'black',
      strokeWidth: '1'
    });
    this.create();
  }

  private refreshPoints(): void {
    if (this._svgElement == null) {
      return;
    }
    this.generatePoints();
    this.generateVectors();
    this._svgElement.setAttribute('points', this.pointsAttribute);
  }

  private generatePoints(): void {
    let stringPoints = '';
    for (let idx = 0; idx < this._points.length; ++idx) {
      const point = this._points[idx];
      if (idx === 0) {
        stringPoints += `${point.x},${point.y}`;
      } else {
        stringPoints += ` ${point.x},${point.y}`;
      }
    }
    this.pointsAttribute = stringPoints;
  }

  private generateVectors(): void {
    this._vectors = [];
    for (let index = 1; index < this._points.length; ++index) {
      const vector = new Vector2D(this._points[index - 1], this._points[index]);
      this._vectors.push(vector);
    }
  }
}
