import { Point2D } from '../../math/point2d';
import { MultistepShape } from '../base/multistep-shape';

export class PolylineShape extends MultistepShape {
  public pointsAttribute = '';

  private _points: Point2D[] = [];

  public create(event: MouseEvent): void {
    super.create(event);

    const startPoint = this.getMousePosition(event);
    this.addPoint(startPoint);
    this.addPoint(startPoint);

    this.generateShape();
  }

  public createStep(event: MouseEvent): void {
    const currPoint = this.getMousePosition(event);
    const idx = this._points.length - 1;

    const newPoint = event.ctrlKey
      ? this.lockPointHV(idx, currPoint)
      : currPoint;

    this.setPoint(idx, newPoint);
    this.addPoint(newPoint);
  }

  public modifySelectedStep(event: MouseEvent): void {
    const currPoint = this.getMousePosition(event);
    const idx = this._points.length - 1;

    const newPoint = event.ctrlKey
      ? this.lockPointHV(idx, currPoint)
      : currPoint;

    this.setPoint(idx, newPoint);
  }

  public removeSelectedStep(event: MouseEvent): void {
    const idx = this._points.length - 1;
    this.removePoint(idx);
  }

  public getPoints(): Point2D[] {
    return this._points;
  }

  public addPoint(point: Point2D): void {
    this._points.push(point);
    this.generatePoints();
  }

  public setPoint(index: number, point: Point2D): void {
    this._points[index] = point;
    this.generatePoints();
  }

  public removePoint(index: number): void {
    this._points.splice(index, 1);
    this.generatePoints();
  }

  protected refreshPoints(): void {
    if (this._shapeElement == null) {
      return;
    }
    this._shapeElement.setAttribute('points', this.pointsAttribute);
  }

  protected refreshStyles(): void {
    if (this._shapeElement == null) {
      return;
    }
    this._shapeElement.style.fill = 'none';
    this._shapeElement.style.stroke = 'black';
    this._shapeElement.style.strokeWidth = '1';
  }

  private lockPointHV(index: number, mousePosition: Point2D): Point2D {
    const prevPoint = this._points[index - 1];

    const sx = Math.abs(mousePosition.x - prevPoint.x);
    const sy = Math.abs(mousePosition.y - prevPoint.y);

    if (sx > sy) {
      return new Point2D(mousePosition.x, prevPoint.y);
    }
    return new Point2D(prevPoint.x, mousePosition.y);
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
    this.refreshPoints();
  }

  private generateShape(): void {
    const polyline = this._renderer.createElement('polyline', 'svg');
    this._shapeElement = polyline;

    this.refreshPoints();
    this.refreshStyles();

    this._renderer.appendChild(this._diagramService.getShapesContainer(), this._shapeElement);
  }
}
