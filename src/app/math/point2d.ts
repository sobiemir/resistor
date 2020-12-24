import { IPoint2D } from 'src/interfaces/point2d.interface';
import { EAngleType } from '../enums/angle-type.enum';

export class Point2D implements IPoint2D {
  public x = 0;
  public y = 0;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public clone(): Point2D {
    return new Point2D(this.x, this.y);
  }

  public add(x: number, y: number): Point2D {
    this.x += x;
    this.y += y;

    return this;
  }

  public sub(x: number, y: number): Point2D {
    this.x -= x;
    this.y -= y;

    return this;
  }

  public mul(n: number): Point2D {
    this.x *= n;
    this.y *= n;

    return this;
  }

  public getAngle(x: number, y: number, type: EAngleType = EAngleType.Angle_360): number {
    const rad = Math.atan2(y - this.y, x - this.x);

    if (type === EAngleType.Angle || type === EAngleType.Angle_360) {
      const deg = rad * 180 / Math.PI;
      if (type === EAngleType.Angle_360 && deg < 0) {
        return 360 + deg;
      }
      return deg;
    }
    if (type === EAngleType.Radian_2PI && rad < 0) {
      return 2 * Math.PI + rad;
    }
    return rad;
  }
}
