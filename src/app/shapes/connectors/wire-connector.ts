import { SVGGHTMLElement } from 'src/app/app.types';
import { ICSSOptions } from 'src/interfaces/css-options.interface';
import { Point2D } from '../../math/point2d';
import { EllipseShape } from '../drawable/ellipse';

export class WireConnectorShape extends EllipseShape {
  protected _defaultStyle: ICSSOptions = {
    fill: 'black'
  };

  public initialize(position: Point2D, radius: number = 3): void {
    super.initialize(position, radius);
  }

  protected getSVGContainer(): SVGGHTMLElement {
    return this._diagramService.getConnectorsContainer();
  }
}
