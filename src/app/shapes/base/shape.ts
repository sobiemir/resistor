import { Renderer2 } from '@angular/core';
import { SVGHTMLElement } from '../../app.types';
import { Vector2d } from '../../math/vector2d';

export abstract class Shape {
  protected shapeElement: SVGElement | null = null;
  private created = false;

  public constructor(
    protected renderer: Renderer2,
    protected viewport: SVGHTMLElement,
    protected shapesContainer: SVGGElement
  ) { }

  public isMultistep(): boolean {
    return false;
  }

  public wasCreated(): boolean {
    return this.created;
  }

  public create(event: MouseEvent): void {
    if (this.wasCreated()) {
      throw new Error('This element was created before.');
    }
    this.created = true;
  }

  public getMousePosition(event: MouseEvent): Vector2d {
    const ctm = this.viewport?.getScreenCTM();
    if (ctm == null) {
      throw new Error('There was an undefined error while executing getMousePosition function.');
    }
    const mx = (event.clientX - ctm.e) / ctm.a;
    const my = (event.clientY - ctm.f) / ctm.d;

    return new Vector2d(mx, my);
  }

  public getShapeElement(): SVGElement {
    if (this.shapeElement == null) {
      throw new Error('Shape was not created yet.');
    }
    return this.shapeElement;
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
