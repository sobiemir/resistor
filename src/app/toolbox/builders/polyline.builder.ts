import { Renderer2 } from '@angular/core';
import { DiagramService } from 'src/app/pages/diagram/diagram.service';
import { PolylineShape } from 'src/app/shapes/drawable/polyline';
import { PositionMarkerService } from 'src/app/shapes/position-marker.service';
import { Shape } from '../../shapes/base/shape';
import { ToolboxItem } from '../base/toolbox-item';

export class PolylineBuilder extends ToolboxItem {
  public currentShape: Shape | null = null;

  public constructor(
    private _renderer: Renderer2,
    private _diagramService: DiagramService,
    private _positionMarkerService: PositionMarkerService,
  ) {
    super();
  }

  public getIcon(): string {
    return 'fas fa-draw-polygon';
  }

  onMouseDown(event: MouseEvent): void {
    if (this.currentShape == null) {
      const polyline = new PolylineShape(
        this._renderer,
        this._diagramService
      );
      this.currentShape = polyline.onMouseDown(event);
      // if (this.currentShape != null) {
      // this.shapes.push(this.currentShape);
      // }
    } else {
      this.currentShape = this.currentShape.onMouseDown(event);
    }
  }

  onMouseMove(event: MouseEvent): void {
    this._positionMarkerService.onMouseMove(event);
    this.currentShape?.onMouseMove(event);
  }

  public onMouseEnter(event: MouseEvent): void {
    this._positionMarkerService.setVisible(true);
  }

  public onMouseLeave(event: MouseEvent): void {
    this._positionMarkerService.setVisible(false);
  }
}
