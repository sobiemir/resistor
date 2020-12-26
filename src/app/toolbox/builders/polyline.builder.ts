import { Renderer2 } from '@angular/core';
import { EMouseButton } from 'src/app/enums/mouse-button.enum';
import { Point2D } from 'src/app/math/point2d';
import { DiagramService } from 'src/app/pages/diagram/diagram.service';
import { PolylineShape } from 'src/app/shapes/drawable/polyline';
import { PositionMarkerService } from 'src/app/shapes/position-marker.service';
import { ShapeService } from 'src/app/shapes/shape.service';
import { ToolboxItem } from '../base/toolbox-item';

export class PolylineBuilder extends ToolboxItem {
  protected _currentShape: PolylineShape | null = null;

  public constructor(
    protected _renderer: Renderer2,
    protected _diagramService: DiagramService,
    protected _positionMarkerService: PositionMarkerService,
    protected _shapeService: ShapeService
  ) {
    super(_renderer, _diagramService);
  }

  public getIcon(): string {
    return 'fas fa-draw-polygon';
  }

  public onMouseDown(event: MouseEvent): void {
    if (this._currentShape != null) {
      if (event.button === EMouseButton.Right) {
        this.onCreateEnd(event);
      } else {
        this.onCreateStep(event);
      }
    } else {
      this.onCreateStart(event);
    }
  }

  public onMouseUp(event: MouseEvent): void {
  }

  public onMouseMove(event: MouseEvent): void {
    this._positionMarkerService.onMouseMove(event);

    if (this._currentShape == null) {
      return;
    }
    const mousePoint = this.getMousePosition(event);
    const points = this._currentShape.getPoints();

    if (points.length < 2) {
      return;
    }
    const lastIndex = points.length - 1;
    const penultPoint = points[lastIndex - 1];

    const newPoint = event.ctrlKey
      ? this.lockPointHV(penultPoint, mousePoint)
      : mousePoint;

    this._currentShape.setPoint(lastIndex, newPoint);
  }

  public onMouseEnter(event: MouseEvent): void {
    this._positionMarkerService.setVisible(true);
  }

  public onMouseLeave(event: MouseEvent): void {
    this._positionMarkerService.setVisible(false);
  }

  public onCreateStart(event: MouseEvent): void {
    const polyline = new PolylineShape(this._renderer, this._diagramService);
    const mousePoint = this.getMousePosition(event);

    this._currentShape = polyline;
    this._currentShape.initialize([mousePoint, mousePoint]);
  }

  public onCreateStep(event: MouseEvent): void {
    if (this._currentShape == null) {
      return;
    }
    const mousePoint = this.getMousePosition(event);
    const points = this._currentShape.getPoints();

    if (points.length < 2) {
      return;
    }
    const lastIndex = points.length - 1;
    const penultPoint = points[lastIndex - 1];

    const newPoint = event.ctrlKey
      ? this.lockPointHV(penultPoint, mousePoint)
      : mousePoint;

    // prevent adding two same points in container
    if (penultPoint.isEqual(newPoint)) {
      return;
    }
    this._currentShape.setPoint(lastIndex, newPoint);

    // add new point for moving
    this._currentShape.addPoint(newPoint);
  }

  public onCreateEnd(event: MouseEvent): void {
    if (this._currentShape == null) {
      return;
    }
    if (this._currentShape.getPoints().length <= 2) {
      this._currentShape.destroy();
    } else {
      this._currentShape.removePoint();
    }
    this._currentShape = null;
  }

  protected lockPointHV(checkPoint: Point2D, mousePosition: Point2D): Point2D {
    if (this._currentShape == null) {
      throw new Error('Shape was not yet initialized!');
    }

    const sx = Math.abs(mousePosition.x - checkPoint.x);
    const sy = Math.abs(mousePosition.y - checkPoint.y);

    if (sx > sy) {
      return new Point2D(mousePosition.x, checkPoint.y);
    }
    return new Point2D(checkPoint.x, mousePosition.y);
  }
}
