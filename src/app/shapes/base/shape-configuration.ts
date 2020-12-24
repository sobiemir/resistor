import { Renderer2 } from '@angular/core';
import { SVGHTMLElement } from 'src/app/app.types';

export abstract class ShapeConfiguration {
  protected static _snapToGrid = true;
  protected static _snapToGridSize = 10;
  protected _created = false;

  public constructor(
    protected renderer: Renderer2,
    protected viewport: SVGHTMLElement,
    protected shapesContainer: SVGGElement
  ) { }

  public static setSnapToGrid(snap: boolean, size: number): void {
    this._snapToGrid = snap;
    this._snapToGridSize = size;
  }

  public wasCreated(): boolean {
    return this._created;
  }
}
