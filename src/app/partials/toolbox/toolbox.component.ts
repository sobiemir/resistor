import { Component, OnInit } from '@angular/core';
import { ToolboxService } from 'src/app/toolbox/toolbox.service';
import { IToolboxItem } from 'src/interfaces/toolbox-item.interface';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  public toolboxItems: IToolboxItem[] = [];

  public constructor(
    private _toolboxService: ToolboxService
  ) { }

  public ngOnInit(): void {
    this.toolboxItems = this._toolboxService.getPrimaryTools();
  }

  public onItemClick(event: MouseEvent, item: IToolboxItem): void {
    this._toolboxService.onSelectPrimaryTool(event, item);
  }
}
