import { IPoint2D } from 'src/interfaces/point2d.interface';

export class Vector2D implements IPoint2D {
  public x = 0;
  public y = 0;

  public constructor(x: number, y: number);
  public constructor(x1: number, y1: number, x2?: number, y2?: number) {
    if (x2 == null || y2 == null) {
      this.x = x1;
      this.y = y1;
    } else {
      this.x = x2 - x1;
      this.y = y2 - y1;
    }
  }

  public clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  public add(v: Vector2D): Vector2D;
  public add(p: IPoint2D): Vector2D {
    this.x += p.x;
    this.y += p.y;

    return this;
  }

  public sub(v: Vector2D): Vector2D;
  public sub(p: IPoint2D): Vector2D {
    this.x -= p.x;
    this.y -= p.y;

    return this;
  }

  public mul(n: number): Vector2D {
    this.x *= n;
    this.y *= n;

    return this;
  }

  public getLength(): number {
    const xe = Math.abs(this.x);
    const ye = Math.abs(this.y);

    return Math.sqrt(xe * xe + ye * ye);
  }
}
