export interface IToolboxItem {
  onMouseDown(event: MouseEvent): void;
  onMouseMove(event: MouseEvent): void;
  onMouseEnter(event: MouseEvent): void;
  onMouseLeave(event: MouseEvent): void;

  getIcon(): string;
  isSelected(): boolean;

  onSelect(event: MouseEvent): void;
  onRemoveSelect(event: MouseEvent): void;
}
