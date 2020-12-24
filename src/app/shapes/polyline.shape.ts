import { Vector2d } from 'src/app/math/vector2d';
import { MultistepShape } from './base/multistep-shape';

export class PolyLineShape extends MultistepShape {
  public pointsAttribute = '';

  private points: Vector2d[] = [];

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
    const idx = this.points.length - 1;

    this.setPoint(idx, stepPoint);
    this.addPoint(stepPoint);
  }

  public modifySelectedStep(event: MouseEvent): void {
    const stepPoint = this.getMousePosition(event);
    const idx = this.points.length - 1;

    this.setPoint(idx, stepPoint);
  }

  public removeSelectedStep(event: MouseEvent): void {
    const idx = this.points.length - 1;
    this.removePoint(idx);
  }

  public getPoints(): Vector2d[] {
    return this.points;
  }

  public addPoint(point: Vector2d): void {
    this.points.push(point);
    this.generatePoints();
  }

  public setPoint(index: number, point: Vector2d): void {
    this.points[index] = point;
    this.generatePoints();
  }

  public removePoint(index: number): void {
    this.points.splice(index, 1);
    this.generatePoints();
  }

  private generatePoints(): void {
    let stringPoints = '';
    for (let idx = 0; idx < this.points.length; ++idx) {
      const point = this.points[idx];
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
    this.shapeElement = polyline;

    this.refreshPoints();
    this.refreshStyles();

    this.renderer.appendChild(this.shapesContainer, this.shapeElement);
  }

  private refreshPoints(): void {
    if (this.shapeElement == null) {
      return;
    }
    this.shapeElement.setAttribute('points', this.pointsAttribute);
  }

  private refreshStyles(): void {
    if (this.shapeElement == null) {
      return;
    }
    this.shapeElement.style.fill = 'none';
    this.shapeElement.style.stroke = 'black';
    this.shapeElement.style.strokeWidth = '3';
  }
}
