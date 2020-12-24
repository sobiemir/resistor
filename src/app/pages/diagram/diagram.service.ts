import { Injectable } from '@angular/core';
import { SVGGHTMLElement, SVGHTMLElement } from 'src/app/app.types';

@Injectable({
  providedIn: 'root',
})
export class DiagramService {
  private _viewbox: SVGHTMLElement | null = null;
  private _shapesContainer: SVGGHTMLElement | null = null;
  private _controlsContainer: SVGGHTMLElement | null = null;
  private _connectorsContainer: SVGGHTMLElement | null = null;

  public getViewbox(): SVGHTMLElement {
    if (!this._viewbox) {
      this._viewbox = document.getElementById('resistorViewbox') as SVGHTMLElement;
      if (!this._viewbox) {
        throw new Error('Viewbox does not exist in current page!');
      }
    }
    return this._viewbox;
  }

  public getShapesContainer(): SVGGHTMLElement {
    if (!this._shapesContainer) {
      this._shapesContainer = document.getElementById('resistorShapesContainer') as SVGGHTMLElement;
      if (!this._shapesContainer) {
        throw new Error('Shapes container does not exist in current page!');
      }
    }
    return this._shapesContainer;
  }

  public getControlsContainer(): SVGGHTMLElement {
    if (!this._controlsContainer) {
      this._controlsContainer = document.getElementById('resistorControlsContainer') as SVGGHTMLElement;
      if (!this._controlsContainer) {
        throw new Error('Controls container does not exist in current page!');
      }
    }
    return this._controlsContainer;
  }

  public getConnectorsContainer(): SVGGHTMLElement {
    if (!this._connectorsContainer) {
      this._connectorsContainer = document.getElementById('resistorConnectorsContainer') as SVGGHTMLElement;
      if (!this._connectorsContainer) {
        throw new Error('Connectors container does not exist in current page!');
      }
    }
    return this._connectorsContainer;
  }
}
