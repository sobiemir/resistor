import { Renderer2 } from '@angular/core';
import { SVGHTMLElement } from 'src/app/app.types';
import { DiagramService } from 'src/app/pages/diagram/diagram.service';
import { BasicShape } from './basic-shape';

export abstract class Shape extends BasicShape {
  protected _shapeElement: SVGElement | null = null;
  protected _previewElement: SVGElement | null = null;
  protected _created = false;

  public constructor(
    protected _renderer: Renderer2,
    protected _diagramService: DiagramService
  ) {
    super(_renderer, _diagramService);
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
