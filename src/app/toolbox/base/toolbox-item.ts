import { IToolboxItem } from 'src/interfaces/toolbox-item.interface';
import { BuilderOperations } from './builder-operations';

export abstract class ToolboxItem extends BuilderOperations implements IToolboxItem {
  protected _selected = false;

  public abstract onMouseDown(event: MouseEvent): void;
  public abstract onMouseUp(event: MouseEvent): void;
  public abstract onMouseMove(event: MouseEvent): void;
  public abstract onMouseEnter(event: MouseEvent): void;
  public abstract onMouseLeave(event: MouseEvent): void;
  public abstract getIcon(): string;

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
