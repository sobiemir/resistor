import { Renderer2 } from '@angular/core';
import { DiagramService } from 'src/app/pages/diagram/diagram.service';
import { BasicShape } from './basic-shape';

export abstract class Shape extends BasicShape {
  protected _shapeElement: SVGElement | null = null;
  protected _previewElement: SVGElement | null = null;
  protected _createStarted = false;
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

  public onCreateStart(event: MouseEvent): void {
    if (this._createStarted) {
      throw new Error('Creation of this element was started before.');
    }
    this._createStarted = true;
  }

  public onCreateEnd(event: MouseEvent): void {
    if (this._created) {
      throw new Error('This element was created before.');
    }
    this._created = true;
  }

  public onMouseDown(event: MouseEvent): Shape | null {
    if (!this._createStarted) {
      this.onCreateStart(event);
    }
    return this;
  }

  public onMouseUp(event: MouseEvent): Shape | null {
    if (!this._created) {
      this.onCreateEnd(event);
    }
    return this;
  }

  public onMouseMove(event: MouseEvent): Shape | null {
    return this;
  }
}
