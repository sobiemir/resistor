import { IPoint2D } from 'src/interfaces/point2d.interface';
import { Point2D } from './point2d';

export class Vector2D implements IPoint2D {
  public x = 0;
  public y = 0;

  public constructor(x: number, y: number);
  public constructor(p1: Point2D, p2: Point2D);
  public constructor(x1: number, y1: number, x2: number, y2: number);
  public constructor(x1: number | Point2D, y1: number | Point2D, x2: number | null = null, y2: number | null = null) {
    if (x2 == null && y2 == null) {
      if (typeof (x1) === 'number' && typeof (y1) === 'number') {
        this.x = x1;
        this.y = y1;
      } else if (x1 instanceof Point2D && y1 instanceof Point2D) {
        this.x = y1.x - x1.x;
        this.y = y1.y - x1.y;
      }
    } else if (x2 !== null && y2 !== null && typeof (x1) === 'number' && typeof (y1) === 'number') {
      this.x = x2 - x1;
      this.y = y2 - y1;
    }
  }

  public clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  public add(v: Vector2D): Vector2D {
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
