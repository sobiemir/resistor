import { Renderer2 } from '@angular/core';
import { SVGHTMLElement } from 'src/app/app.types';
import { Point2D } from 'src/app/math/point2d';
import { BasicShape } from './basic.shape';

export abstract class Shape extends BasicShape {
  protected _shapeElement: SVGElement | null = null;
  protected _created = false;

  public constructor(
    protected renderer: Renderer2,
    protected viewport: SVGHTMLElement,
    protected shapesContainer: SVGGElement
  ) {
    super(renderer, viewport);
  }

  public isMultistep(): boolean {
    return false;
  }

  public wasCreated(): boolean {
    return this._created;
  }

  public create(event: MouseEvent): void {
    if (this.wasCreated()) {
      throw new Error('This element was created before.');
    }
    this._created = true;
  }

  public onMouseDown(event: MouseEvent): Shape | null {
    if (!this.wasCreated()) {
      this.create(event);
    }
    return this;
  }

  public onMouseMove(event: MouseEvent): Shape | null {
    return this;
  }
}
