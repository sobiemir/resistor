import { Renderer2 } from '@angular/core';
import { EMouseButton } from 'src/app/enums/mouse-button.enum';
import { Point2D } from 'src/app/math/point2d';
import { Vector2D } from 'src/app/math/vector2d';
import { DiagramService } from 'src/app/pages/diagram/diagram.service';
import { EllipseShape } from 'src/app/shapes/drawable/ellipse';
import { PositionMarkerService } from 'src/app/shapes/position-marker.service';
import { ShapeService } from 'src/app/shapes/shape.service';
import { ToolboxItem } from '../base/toolbox-item';

export class EllipseBuilder extends ToolboxItem {
  protected _currentShape: EllipseShape | null = null;
  protected _startPoint: Point2D = new Point2D(0, 0);

  public constructor(
    protected _renderer: Renderer2,
    protected _diagramService: DiagramService,
    protected _positionMarkerService: PositionMarkerService,
    protected _shapeService: ShapeService
  ) {
    super(_renderer, _diagramService);
  }

  public getIcon(): string {
    return 'far fa-circle';
  }

  public onMouseDown(event: MouseEvent): void {
    if (event.button !== EMouseButton.Left) {
      return;
    }
    const polyline = new EllipseShape(this._renderer, this._diagramService);
    const mousePoint = this.getMousePosition(event);

    this._startPoint = mousePoint;

    this._currentShape = polyline;
    this._currentShape.initialize(mousePoint, 0);
  }

  public onMouseUp(event: MouseEvent): void {
    if (this._currentShape != null) {
      const radius = this._currentShape.getRadius();
      if (radius.x <= 0 || radius.y <= 0) {
        this._currentShape.destroy();
      }
    }
    this._currentShape = null;
  }

  public onMouseMove(event: MouseEvent): void {
    this._positionMarkerService.onMouseMove(event);

    if (this._currentShape == null) {
      return;
    }
    const mousePoint = this.getMousePosition(event);
    const vector = new Vector2D(this._startPoint, mousePoint);

    let rx = 0;
    let ry = 0;

    if (event.shiftKey) {
      rx = vector.x;
      ry = vector.y;

      if (event.ctrlKey) {
        rx = ry > rx ? ry : rx;
        ry = rx > ry ? rx : ry;
      }
      this._currentShape.setPosition(this._startPoint);
      this._currentShape.setRadius(Math.abs(rx), Math.abs(ry));
    } else {
      const startPoint = this._startPoint.clone();

      rx = vector.x / 2;
      ry = vector.y / 2;

      if (event.ctrlKey) {
        rx = ry > rx ? ry : rx;
        ry = rx > ry ? rx : ry;
      }

      startPoint.add(rx, ry);
      this._currentShape.setPosition(startPoint);
      this._currentShape.setRadius(Math.abs(rx), Math.abs(ry));
    }
  }

  public onMouseEnter(event: MouseEvent): void {
    this._positionMarkerService.setVisible(true);
  }

  public onMouseLeave(event: MouseEvent): void {
    this._positionMarkerService.setVisible(false);
  }
}
