import { Injectable } from '@angular/core';
import { ShapeBase } from './base/shape-base';

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  private _shapes: ShapeBase[] = [];

  public add(shape: ShapeBase): void {
    this._shapes.push(shape);
  }

  public remove(index: number): void {
    this._shapes.splice(index, 1);
  }

  public getShapes(): ShapeBase[] {
    return this._shapes;
  }
}
