import { Vector2d } from 'src/app/math/vector2d';
import { Shape } from './shape';

export class PolyLineShape extends Shape {
  public pointsAttribute = '';

  private points: Vector2d[] = [];

  public hasMultipleParts(): boolean {
    return true;
  }

  public create(event: MouseEvent, shapesContainer: SVGGElement): void {
    super.create(event, shapesContainer);

    const startPoint = this.getMousePosition(event);
    this.addPoint(startPoint);
    this.addPoint(startPoint.clone().addNums(10, 10));

    this.generateShape();
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
