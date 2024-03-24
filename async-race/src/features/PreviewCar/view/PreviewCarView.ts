import createBaseElement from '../../../utils/createBaseElement.ts';
import PREVIEW_CAR_STYLES from './previewCarView.module.scss';
import { TAG_NAMES } from '../../../shared/types/enums.ts';
import { createSVGUse } from '../../../utils/createCarImg.ts';

class PreviewCarView {
  private carName: HTMLSpanElement;

  private carSVG: SVGSVGElement;

  private previewCar: HTMLDivElement;

  constructor() {
    this.carName = this.createCarName();
    this.carSVG = this.createCarSVG();
    this.previewCar = this.createHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.previewCar;
  }

  public getCarSVG(): SVGSVGElement {
    return this.carSVG;
  }

  public getCarName(): HTMLSpanElement {
    return this.carName;
  }

  private createCarName(): HTMLSpanElement {
    this.carName = createBaseElement({
      tag: TAG_NAMES.SPAN,
      cssClasses: [PREVIEW_CAR_STYLES['preview-car_name']],
    });

    return this.carName;
  }

  private createCarSVG(): SVGSVGElement {
    const svgURL = 'http://www.w3.org/2000/svg';
    const carID = 'car';
    this.carSVG = document.createElementNS(svgURL, TAG_NAMES.SVG);
    this.carSVG.classList.add(PREVIEW_CAR_STYLES['preview-car_img']);
    this.carSVG.appendChild(createSVGUse(carID));
    return this.carSVG;
  }

  private createHTML(): HTMLDivElement {
    this.previewCar = createBaseElement({
      tag: TAG_NAMES.DIV,
      cssClasses: [PREVIEW_CAR_STYLES['preview-car']],
    });

    this.previewCar.append(this.carSVG, this.carName);

    return this.previewCar;
  }
}

export default PreviewCarView;
