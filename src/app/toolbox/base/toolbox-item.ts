import { IToolboxItem } from 'src/interfaces/toolbox-item.interface';

export abstract class ToolboxItem implements IToolboxItem {
  private _selected = false;

  public abstract onMouseDown(event: MouseEvent): void;
  public abstract onMouseMove(event: MouseEvent): void;
  public abstract getIcon(): string;

  public constructor() {
  }

  public isSelected(): boolean {
    return this._selected;
  }

  public onSelect(event: MouseEvent): void {
    this._selected = true;
  }

  public onRemoveSelect(event: MouseEvent): void {
    this._selected = false;
  }
}
