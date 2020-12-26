import { Renderer2 } from '@angular/core';
import { SVGGHTMLElement } from 'src/app/app.types';
import { DiagramService } from 'src/app/pages/diagram/diagram.service';
import { ICSSOptions } from 'src/interfaces/css-options.interface';

export abstract class ShapeBase {
  protected _svgElement: SVGElement | null = null;
  protected _visible = true;
  protected _created = false;

  protected abstract getSVGContainer(): SVGGHTMLElement;

  public constructor(
    protected _renderer: Renderer2,
    protected _diagramService: DiagramService
  ) { }

  public isVisible(): boolean {
    return this._visible;
  }

  public setVisible(visible: boolean): void {
    this._visible = visible;

    if (this._svgElement == null) {
      return;
    }
    this._svgElement.style.display = this._visible
      ? 'initial'
      : 'none';
  }

  public setStyles(styles: ICSSOptions): void {
    if (this._svgElement == null) {
      throw new Error('Shape was not yet initialized!');
    }
    for (const name in styles) {
      if (!styles.hasOwnProperty(name)) {
        continue;
      }
      this._svgElement.style.setProperty(name, styles[name]);
    }
  }

  public getSVGElement(): SVGElement {
    if (this._svgElement == null) {
      throw new Error('Shape was not yet initialized!');
    }
    return this._svgElement;
  }

  public destroy(): void {
    if (this._svgElement == null) {
      throw new Error('Shape was not yet initialized!');
    }
    this._renderer.removeChild(this._diagramService.getShapesContainer(), this._svgElement);
    this._svgElement = null;
    this._created = false;
  }

  protected create(): void {
    if (this._created) {
      throw new Error('Shape was already created!');
    }
    if (!this._svgElement) {
      throw new Error('Shape was not yet initialized!');
    }
    this._renderer.appendChild(this.getSVGContainer(), this._svgElement);
    this._created = true;
  }
}
