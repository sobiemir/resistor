import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DiagramService } from 'src/app/pages/diagram/diagram.service';
import { Point2D } from '../math/point2d';
import { PositionMarkerShape } from './controls/position-marker';

@Injectable({
  providedIn: 'root',
})
export class PositionMarkerService {
  private _renderer: Renderer2;
  private _markers: PositionMarkerShape[] = [];
  private _activeMarker = -1;

  public constructor(
    protected _rendererFactory: RendererFactory2,
    protected _diagramService: DiagramService
  ) {
    this._renderer = _rendererFactory.createRenderer(null, null);
  }

  public create(): void {
    const marker = new PositionMarkerShape(this._renderer, this._diagramService);
    this._markers.push(marker);
    this._activeMarker = this._markers.length - 1;
  }

  public removeActive(): void {
    if (this._activeMarker < 0) {
      return;
    }
    this._markers.splice(this._activeMarker, 1);
    this._activeMarker--;
  }

  public getMarkers(): PositionMarkerShape[] {
    return this._markers;
  }

  public setActiveMarker(index: number): void {
    this._activeMarker = index;
  }

  public setPosition(position: Point2D): void {
    this.createIfNotExist();
    this._markers[this._activeMarker].setPosition(position);
  }

  public getPosition(): Point2D {
    this.createIfNotExist();
    return this._markers[this._activeMarker].getPosition();
  }

  public onMouseDown(event: MouseEvent): PositionMarkerShape | null {
    this.createIfNotExist();
    return this._markers[this._activeMarker].onMouseDown(event);
  }

  public onMouseMove(event: MouseEvent): PositionMarkerShape | null {
    this.createIfNotExist();
    return this._markers[this._activeMarker].onMouseMove(event);
  }

  public onMouseUp(event: MouseEvent): PositionMarkerShape | null {
    this.createIfNotExist();
    return this._markers[this._activeMarker].onMouseUp(event);
  }

  public setVisible(visible: boolean): void {
    this.createIfNotExist();
    this._markers[this._activeMarker].setVisible(visible);
  }

  public isVisible(): boolean {
    this.createIfNotExist();
    return this._markers[this._activeMarker].isVisible();
  }

  private createIfNotExist(): void {
    if (this._markers.length === 0) {
      this.create();
    }
  }
}
