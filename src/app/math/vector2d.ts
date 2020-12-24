import { IPoint2D } from 'src/interfaces/point2d.interface';
import { Point2D } from './point2d';

export class Vector2D implements IPoint2D {
  public x = 0;
  public y = 0;

  public static fromPoints(p1: Point2D, p2: Point2D): Vector2D {
    const x = p2.x - p1.x;
    const y = p2.y - p1.y;

    return new Vector2D(x, y);
  }

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  public add(v: Vector2D): Vector2D{
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  public sub(v: Vector2D): Vector2D {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  public mul(n: number): Vector2D {
    this.x *= n;
    this.y *= n;

    return this;
  }

  public crossProduct(vector: Vector2D): number {
    return this.x * vector.y - this.y * vector.x;
  }

  public getLength(): number {
    const xe = Math.abs(this.x);
    const ye = Math.abs(this.y);

    return Math.sqrt(xe * xe + ye * ye);
  }
}
