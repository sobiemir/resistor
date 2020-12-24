import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { PolyLineShape } from './shapes/polyline.shape';
import { Shape } from './shapes/base/shape';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  // public shapesContainer: HTMLElement | null = null;

  public shapes: Shape[] = [];
  public currentShape: Shape | null = null;

  // @ViewChildren('shapeTemplate', { read: ViewContainerRef })
  // public shapeTemplates: QueryList<ViewContainerRef> = new QueryList();
  @ViewChild('resistorShapesContainer', { read: ElementRef })
  public shapesContainer: ElementRef | null = null;

  @ViewChild('resistorViewport', { read: ElementRef })
  public viewport: ElementRef | null = null;

  public constructor(
    private renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    // this.viewport = document.getElementById('resistorViewport') as SVGHTMLElement;
    // this.shapesContainer = document.getElementById('resistorShapesContainer') as HTMLElement;
  }

  public ngAfterViewInit(): void {
    // this.shapeTemplates.changes.subscribe((next: QueryList<ViewContainerRef>) => {
    //   console.log(next);
    // });
  }

  public onMouseDown(event: MouseEvent): void {
    if (this.shapesContainer == null || this.viewport == null) {
      return;
    }

    if (this.currentShape == null) {
      const polyline = new PolyLineShape(
        this.renderer,
        this.viewport.nativeElement,
        this.shapesContainer.nativeElement
      );
      this.currentShape = polyline.onMouseDown(event);
      if (this.currentShape != null) {
        this.shapes.push(this.currentShape);
      }
    } else {
      this.currentShape = this.currentShape.onMouseDown(event);
    }
  }

  public onMouseMove(event: MouseEvent): void {
    if (this.currentShape == null) {
      return;
    }
    this.currentShape.onMouseMove(event);
  }

  public onContextMenu(event: MouseEvent): boolean {
    event.stopPropagation();
    event.cancelBubble = true;

    return false;
  }
}
