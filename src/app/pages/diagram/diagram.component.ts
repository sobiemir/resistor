import { Component, OnInit } from '@angular/core';
import { ToolboxService } from 'src/app/toolbox/toolbox.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {
  public constructor(
    private _toolboxService: ToolboxService
  ) { }

  public ngOnInit(): void {
  }

  public onMouseDown(event: MouseEvent): void {
    this._toolboxService.onMouseDown(event);
  }

  public onMouseMove(event: MouseEvent): void {
    this._toolboxService.onMouseMove(event);
  }

  public onContextMenu(event: MouseEvent): boolean {
    event.stopPropagation();
    event.cancelBubble = true;

    return false;
  }
}
