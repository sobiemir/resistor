// import { Renderer2 } from '@angular/core';
// import { SVGHTMLElement } from '../../app.types';
import { Renderer2 } from '@angular/core';
import { SVGHTMLElement } from 'src/app/app.types';
import { Shape } from '../../shapes/base/shape';
// import { PositionMarker } from '../../shapes/controls/position-marker.service';
// import { PolylineShape } from '../../shapes/polyline';
import { ToolboxItem } from '../base/toolbox-item';

export class PolylineBuilder extends ToolboxItem {
  public currentShape: Shape | null = null;

  public constructor(
    private renderer: Renderer2,
    // private positionMarker: PositionMarker,
    private viewbox: SVGHTMLElement,
    private shapesContainer: SVGGElement
  ) {
    super();
  }

  public getIcon(): string {
    return 'fas fa-draw-polygon';
  }

  onMouseDown(event: MouseEvent): void {
    // if (this.shapesContainer == null || this.viewport == null) {
    //   return;
    // }

    // if (this.currentShape == null) {
    //   const polyline = new PolylineShape(
    //     this.renderer,
    //     this.viewport,
    //     this.shapesContainer
    //   );
    //   this.currentShape = polyline.onMouseDown(event);
    //   // if (this.currentShape != null) {
    //     // this.shapes.push(this.currentShape);
    //   // }
    // } else {
    //   this.currentShape = this.currentShape.onMouseDown(event);
    // }
  }

  onMouseMove(event: MouseEvent): void {
    // this.positionMarker?.onMouseMove(event);
    // this.currentShape?.onMouseMove(event);
  }
}
