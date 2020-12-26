import { SVGGHTMLElement } from 'src/app/app.types';
import { ICSSOptions } from 'src/interfaces/css-options.interface';
import { Point2D } from '../../math/point2d';
import { EllipseShape } from '../drawable/ellipse';

export class PositionMarkerShape extends EllipseShape {
  protected _defaultStyle: ICSSOptions = {
    fill: 'none',
    stroke: 'blue',
    strokeWidth: '0.5'
  };

  public initialize(position: Point2D, radius: number = 4): void {
    super.initialize(position, radius);
  }

  protected getSVGContainer(): SVGGHTMLElement {
    return this._diagramService.getControlsContainer();
  }
}
