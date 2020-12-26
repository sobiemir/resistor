import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Point2D } from 'src/app/math/point2d';
import { WireConnectorService } from 'src/app/shapes/wire-connector.service';
import { ToolboxService } from 'src/app/toolbox/toolbox.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit, AfterViewInit {
  public constructor(
    private _toolboxService: ToolboxService,
    private _wc: WireConnectorService
  ) { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this._wc.create(new Point2D(100, 100));
  }

  public onMouseDown(event: MouseEvent): void {
    this._toolboxService.onMouseDown(event);
  }

  public onMouseUp(event: MouseEvent): void {
    this._toolboxService.onMouseUp(event);
  }

  public onMouseMove(event: MouseEvent): void {
    this._toolboxService.onMouseMove(event);
  }

  public onMouseEnter(event: MouseEvent): void {
    this._toolboxService.onMouseEnter(event);
  }

  public onMouseLeave(event: MouseEvent): void {
    this._toolboxService.onMouseLeave(event);
  }

  public onContextMenu(event: MouseEvent): boolean {
    event.stopPropagation();
    event.cancelBubble = true;

    return false;
  }
}
