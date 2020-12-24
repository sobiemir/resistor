import { ToolboxItem } from '../base/toolbox-item';

export class ShapeSelectionTool extends ToolboxItem {
  public getIcon(): string {
    return 'fas fa-mouse-pointer';
  }

  public onMouseDown(event: MouseEvent): void {
  }

  public onMouseMove(event: MouseEvent): void {
  }
}
