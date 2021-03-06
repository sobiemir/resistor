import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { IToolboxItem } from 'src/interfaces/toolbox-item.interface';
import { DiagramService } from '../pages/diagram/diagram.service';
import { PositionMarkerService } from '../shapes/position-marker.service';
import { ShapeService } from '../shapes/shape.service';
import { EllipseBuilder } from './builders/ellipse.builder';
import { PolylineBuilder } from './builders/polyline.builder';
import { ShapeSelectionTool } from './tools/shape-selection';

@Injectable({
  providedIn: 'root',
})
export class ToolboxFactory {
  private _renderer: Renderer2;

  public constructor(
    private _rendererFactory: RendererFactory2,
    private _diagramService: DiagramService,
    private _positionMarkerService: PositionMarkerService,
    private _shapeService: ShapeService
  ) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  public createPrimaryTools(): IToolboxItem[] {
    const primaryTools = [];

    primaryTools.push(new ShapeSelectionTool(
      this._renderer,
      this._diagramService
    ));
    primaryTools.push(new PolylineBuilder(
      this._renderer,
      this._diagramService,
      this._positionMarkerService,
      this._shapeService
    ));
    primaryTools.push(new EllipseBuilder(
      this._renderer,
      this._diagramService,
      this._positionMarkerService,
      this._shapeService
    ));

    return primaryTools;
  }
}
