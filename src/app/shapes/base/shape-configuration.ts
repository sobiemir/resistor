import { Renderer2 } from '@angular/core';
import { DiagramService } from 'src/app/pages/diagram/diagram.service';

export abstract class ShapeConfiguration {
  protected static _snapToGrid = true;
  protected static _snapToGridSize = 10;

  public constructor(
    protected _renderer: Renderer2,
    protected _diagramService: DiagramService
  ) { }

  public static setSnapToGrid(snap: boolean, size: number): void {
    this._snapToGrid = snap;
    this._snapToGridSize = size;
  }
}
