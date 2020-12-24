import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { EMouseButton } from './enums/mouse-button.enum';
import { PolyLineShape } from './shapes/polyline.shape';
import { Shape } from './shapes/shape';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  // public shapesContainer: HTMLElement | null = null;

  public shapes: Shape[] = [];
  public currentElement: Shape | null = null;

  // @ViewChildren('shapeTemplate', { read: ViewContainerRef })
  // public shapeTemplates: QueryList<ViewContainerRef> = new QueryList();
  @ViewChild('resistorShapesContainer', { read: ElementRef })
  public shapesContainer: ElementRef | null = null;

  @ViewChild('resistorViewport', { read: ElementRef })
  public viewport: ElementRef | null = null;

  public constructor(
    private renderer: Renderer2
  ) {}

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
    if (event.button === EMouseButton.Right) {
      this.currentElement = null;
      return;
    }
    if (this.shapesContainer == null || this.viewport == null) {
      return;
    }

    const polyline = new PolyLineShape(this.renderer, this.viewport.nativeElement);
    polyline.create(event, this.shapesContainer.nativeElement);

    // const componentFac = this.componentFactoryResolver.resolveComponentFactory(PolyLineComponent);
    // const componentRef = this.shapesContainer.createComponent(componentFac);

    // componentRef.instance.initialize(event, this.viewport.nativeElement);

    // console.log(componentRef);

    // this.shapes.push({
    //   event,
    //   id: Guid.create().toString()
    // });

    // if (this.currentElement != null) {
    //   this.currentElement.addPoint({
    //     x: xs,
    //     y: ys
    //   });
    // } else {
    //   this.currentElement = new PolyLineElement({
    //     x: xs,
    //     y: ys
    //   });
    //   this.elements.push(this.currentElement);
    // }
  }

  public onMouseMove(event: MouseEvent): void {
  }

  public onContextMenu(event: MouseEvent): boolean {
    event.stopPropagation();
    event.cancelBubble = true;

    return false;
  }
}
