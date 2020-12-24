import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { IToolboxItem } from 'src/interfaces/toolbox-item.interface';
import { DiagramService } from '../pages/diagram/diagram.service';
import { PolylineBuilder } from './builders/polyline.builder';
import { ShapeSelectionTool } from './tools/shape-selection';

@Injectable({
  providedIn: 'root',
})
export class ToolboxFactory {
  private _renderer: Renderer2;

  public constructor(
    private _rendererFactory: RendererFactory2,
    private _diagramService: DiagramService
  ) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  public createPrimaryTools(): IToolboxItem[] {
    const primaryTools = [];

    primaryTools.push(new ShapeSelectionTool());
    primaryTools.push(new PolylineBuilder(
      this._renderer,
      this._diagramService.getViewbox(),
      this._diagramService.getShapesContainer()
    ));

    return primaryTools;
  }
}
