import { IVector2d } from 'src/interfaces/vector2d.interface';

export class Vector2d implements IVector2d {
  public x = 0;
  public y = 0;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public clone(): Vector2d {
    return new Vector2d(this.x, this.y);
  }

  public add(v: Vector2d): Vector2d {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  public addNums(x: number, y: number): Vector2d {
    this.x += x;
    this.y += y;

    return this;
  }

  public substract(v: Vector2d): Vector2d {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  public substractNums(x: number, y: number): Vector2d {
    this.x -= x;
    this.y -= y;

    return this;
  }

  public multiply(n: number): Vector2d {
    this.x *= n;
    this.y *= n;

    return this;
  }

  public getLength(): number {
    const xe = Math.abs(this.x);
    const ye = Math.abs(this.y);

    return Math.sqrt(xe * xe + ye * ye);
  }

  public getLengthSP(startPoint: Vector2d): number {
    const xe = Math.abs(this.x - startPoint.x);
    const ye = Math.abs(this.y - startPoint.y);

    return Math.sqrt(xe * xe + ye * ye);
  }

  public getLengthEP(endPoint: Vector2d): number {
    const xe = Math.abs(endPoint.x - this.x);
    const ye = Math.abs(endPoint.y - this.y);

    return Math.sqrt(xe * xe + ye * ye);
  }
}
