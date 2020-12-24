import { Renderer2 } from '@angular/core';
import { SVGHTMLElement } from '../app.types';
import { Vector2d } from '../math/vector2d';

export abstract class Shape {
  protected shapesContainer: SVGGElement | null = null;
  protected shapeElement: SVGElement | null = null;
  private initialized = false;

  public constructor(
    protected renderer: Renderer2,
    protected viewport: SVGHTMLElement
  ) {}

  public abstract hasMultipleParts(): boolean;

  public create(event: MouseEvent, shapesContainer: SVGGElement): void {
    if (this.initialized) {
      throw new Error('Element was already initialized.');
    }
    this.initialized = true;
    this.shapesContainer = shapesContainer;
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
}
