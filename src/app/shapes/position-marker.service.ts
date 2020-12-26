import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DiagramService } from 'src/app/pages/diagram/diagram.service';
import { Point2D } from '../math/point2d';
import { BuilderOperations } from '../toolbox/base/builder-operations';
import { PositionMarkerShape } from './controls/position-marker';

@Injectable({
  providedIn: 'root',
})
export class PositionMarkerService extends BuilderOperations {
  protected _markers: PositionMarkerShape[] = [];
  protected _activeMarker: PositionMarkerShape | null = null;

  public constructor(
    protected _rendererFactory: RendererFactory2,
    protected _diagramService: DiagramService
  ) {
    super(_rendererFactory.createRenderer(null, null), _diagramService);
  }

  public create(): void {
    const marker = new PositionMarkerShape(this._renderer, this._diagramService);
    marker.initialize(new Point2D(0, 0), 4);
    this._markers.push(marker);

    this._activeMarker = marker;
  }

  public getMarkers(): PositionMarkerShape[] {
    return this._markers;
  }

  public getActive(): PositionMarkerShape | null {
    return this._activeMarker;
  }

  public setActiveByIndex(index: number): void {
    this._activeMarker = this._markers[index];
  }

  public setActive(marker: PositionMarkerShape): void {
    const index = this._markers.indexOf(marker);
    if (index === -1) {
      throw new Error('Marker was removed or was not created by service.');
    }
    this._activeMarker = marker;
  }

  public removeActive(): void {
    if (this._activeMarker == null) {
      return;
    }
    const index = this._markers.indexOf(this._activeMarker);
    this._markers.splice(index, 1);

    this._activeMarker = null;
  }

  public setPosition(position: Point2D): void {
    this.createIfNotExist();
    this._activeMarker?.setPosition(position);
  }

  public getPosition(): Point2D {
    this.createIfNotExist();
    return this._activeMarker?.getPosition() as Point2D;
  }

  public setVisible(visible: boolean): void {
    this.createIfNotExist();
    this._activeMarker?.setVisible(visible);
  }

  public isVisible(): boolean {
    this.createIfNotExist();
    return !!this._activeMarker?.isVisible();
  }

  public onMouseMove(event: MouseEvent): void {
    this.createIfNotExist();

    const currPoint = this.getMousePosition(event);
    this.setPosition(currPoint);
  }

  protected createIfNotExist(): void {
    if (this._markers.length === 0) {
      this.create();
    } else if (this._activeMarker == null) {
      this._activeMarker = this._markers[0];
    }
  }
}
