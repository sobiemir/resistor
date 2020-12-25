import { Renderer2 } from '@angular/core';
import { Point2D } from 'src/app/math/point2d';
import { DiagramService } from 'src/app/pages/diagram/diagram.service';

export abstract class BuilderOperations {
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

  public getMousePosition(event: MouseEvent): Point2D {
    const ctm = this._diagramService.getViewbox().getScreenCTM();
    if (ctm == null) {
      throw new Error('There was an undefined error while executing getMousePosition function.');
    }
    let mx = (event.clientX - ctm.e) / ctm.a;
    let my = (event.clientY - ctm.f) / ctm.d;

    if (BuilderOperations._snapToGrid) {
      const snapSize = BuilderOperations._snapToGridSize;
      const halfSnap = snapSize / 2;

      mx = ~~((mx + halfSnap) / snapSize) * snapSize;
      my = ~~((my + halfSnap) / snapSize) * snapSize;
    }
    return new Point2D(mx, my);
  }
}
