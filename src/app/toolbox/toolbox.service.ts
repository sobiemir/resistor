import { Injectable } from '@angular/core';
import { IToolboxItem } from 'src/interfaces/toolbox-item.interface';
import { ToolboxFactory } from './toolbox.factory';

@Injectable({
  providedIn: 'root',
})
export class ToolboxService {
  private _toolboxItems: IToolboxItem[] = [];
  private _selected: IToolboxItem | null = null;

  public constructor(
    private _toolboxFactory: ToolboxFactory
  ) { }

  public getPrimaryTools(): IToolboxItem[] {
    if (this._toolboxItems.length === 0) {
      this._toolboxItems = this._toolboxFactory.createPrimaryTools();
    }
    if (this._toolboxItems.length > 0) {
      this._toolboxItems[0].onSelect(new MouseEvent('onclick'));
      this._selected = this._toolboxItems[0];
    }
    return this._toolboxItems;
  }

  public onSelectPrimaryTool(event: MouseEvent, itemToSelect: IToolboxItem): void {
    for (const item of this._toolboxItems) {
      if (item.isSelected()) {
        item.onRemoveSelect(event);
      }
    }
    itemToSelect.onSelect(event);
    this._selected = itemToSelect;
  }

  public onMouseDown(event: MouseEvent): void {
    if (this._selected === null) {
      return;
    }
    this._selected.onMouseDown(event);
  }

  public onMouseMove(event: MouseEvent): void {
    if (this._selected === null) {
      return;
    }
    this._selected.onMouseMove(event);
  }

  public onMouseEnter(event: MouseEvent): void {
    if (this._selected === null) {
      return;
    }
    this._selected.onMouseEnter(event);
  }

  public onMouseLeave(event: MouseEvent): void {
    if (this._selected === null) {
      return;
    }
    this._selected.onMouseLeave(event);
  }
}
