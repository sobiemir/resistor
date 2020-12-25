import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DiagramService } from 'src/app/pages/diagram/diagram.service';
import { Point2D } from '../math/point2d';
import { BuilderOperations } from '../toolbox/base/builder-operations';
import { WireConnectorShape } from './connectors/wire-connector';

@Injectable({
  providedIn: 'root',
})
export class WireConnectorService extends BuilderOperations {
  protected _connectors: WireConnectorShape[] = [];

  public constructor(
    protected _rendererFactory: RendererFactory2,
    protected _diagramService: DiagramService
  ) {
    super(_rendererFactory.createRenderer(null, null), _diagramService);
  }

  public create(position: Point2D): void {
    const marker = new WireConnectorShape(this._renderer, this._diagramService);
    this._connectors.push(marker);

    const index = this._connectors.length - 1;
    this.setPosition(index, position);
    this.setVisible(index, true);
  }

  public getConnectors(): WireConnectorShape[] {
    return this._connectors;
  }

  public setPosition(index: number, position: Point2D): void {
    this._connectors[index].setPosition(position);
  }

  public setVisible(index: number, visible: boolean): void {
    this._connectors[index].setVisible(visible);
  }
}
