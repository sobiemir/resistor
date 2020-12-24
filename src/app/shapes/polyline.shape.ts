import { Vector2d } from 'src/app/math/vector2d';
import { MultistepShape } from './base/multistep-shape';

export class PolyLineShape extends MultistepShape {
  public pointsAttribute = '';

  private _points: Vector2d[] = [];

  public hasMultipleParts(): boolean {
    return true;
  }

  public create(event: MouseEvent): void {
    super.create(event);

    const startPoint = this.getMousePosition(event);
    this.addPoint(startPoint);
    this.addPoint(startPoint);

    this.generateShape();
  }

  public createStep(event: MouseEvent): void {
    const stepPoint = this.getMousePosition(event);
    const idx = this._points.length - 1;

    this.setPoint(idx, stepPoint);
    this.addPoint(stepPoint);
  }

  public modifySelectedStep(event: MouseEvent): void {
    const stepPoint = this.getMousePosition(event);
    const idx = this._points.length - 1;

    this.setPoint(idx, stepPoint);
  }

  public removeSelectedStep(event: MouseEvent): void {
    const idx = this._points.length - 1;
    this.removePoint(idx);
  }

  public getPoints(): Vector2d[] {
    return this._points;
  }

  public addPoint(point: Vector2d): void {
    this._points.push(point);
    this.generatePoints();
  }

  public setPoint(index: number, point: Vector2d): void {
    this._points[index] = point;
    this.generatePoints();
  }

  public removePoint(index: number): void {
    this._points.splice(index, 1);
    this.generatePoints();
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
    const polyline = this.renderer.createElement('polyline', 'svg');
    this._shapeElement = polyline;

    this.refreshPoints();
    this.refreshStyles();

    this.renderer.appendChild(this.shapesContainer, this._shapeElement);
  }

  private refreshPoints(): void {
    if (this._shapeElement == null) {
      return;
    }
    this._shapeElement.setAttribute('points', this.pointsAttribute);
  }

  private refreshStyles(): void {
    if (this._shapeElement == null) {
      return;
    }
    this._shapeElement.style.fill = 'none';
    this._shapeElement.style.stroke = 'black';
    this._shapeElement.style.strokeWidth = '3';
  }
}
