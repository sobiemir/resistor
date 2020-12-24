import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Shape } from '../../shapes/base/shape';
// import { PositionMarker } from './shapes/controls/position-marker.service';
// import { ToolboxItem } from './toolbox/base/toolbox-item';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  public currentShape: Shape | null = null;
  public shapes: Shape[] = [];
  // public positionMarker: PositionMarker | null = null;

  // public shapesContainer: ElementRef | null = null;
  // public controlsContainer: ElementRef | null = null;
  // public viewport: ElementRef | null = null;

  // @ViewChild('resistorShapesContainer', { read: ElementRef })
  // public shapesContainer: ElementRef | null = null;

  // @ViewChild('resistorControls', { read: ElementRef })
  // public controlsContainer: ElementRef | null = null;

  // @ViewChild('resistorViewport', { read: ElementRef })
  // public viewport: ElementRef | null = null;

  public constructor(
    private renderer: Renderer2,
  ) {
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    // this.positionMarker = new PositionMarker(
    //   this.renderer,
    //   this.viewport?.nativeElement,
    //   this.controlsContainer?.nativeElement
    // );

    // if (this.positionMarker == null) {
    //   return;
    // }

    // this.toolboxService.initialize(
    //   this.viewport?.nativeElement,
    //   this.shapesContainer?.nativeElement,
    //   this.controlsContainer?.nativeElement
    // );

    // ToolboxInitializer.initialize(
    //   this.renderer,
    //   this.positionMarker,
    //   this.viewport?.nativeElement,
    //   this.shapesContainer?.nativeElement
    // );
    // ToolboxInitializer.activateShapeSelection();

    // this.toolboxItems = ToolboxItem.getItems();
  }

  public onMouseDown(event: MouseEvent): void {
  }

  public onMouseMove(event: MouseEvent): void {
  }

  public onContextMenu(event: MouseEvent): boolean {
    event.stopPropagation();
    event.cancelBubble = true;

    return false;
  }
}
