import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import { changeSVGFill } from '../../../utils/createCarImg.ts';
import PreviewCarView from '../view/PreviewCarView.ts';

class PreviewCarModel {
  private previewCarView: PreviewCarView;

  private singletonMediator: MediatorModel<unknown>;

  private previewCar: HTMLDivElement;

  constructor() {
    this.previewCarView = new PreviewCarView();
    this.singletonMediator = MediatorModel.getInstance();
    this.previewCar = this.previewCarView.getHTML();
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.previewCar;
  }

  private setColorCar(color: string): void {
    const carSvg = this.previewCarView.getCarSVG();
    changeSVGFill(carSvg, color);
  }

  private setNameCar(name: string): void {
    this.previewCarView.getCarName().textContent = name;
  }

  private init(): void {
    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_COLOR_PREVIEW_CAR,
      (params) => {
        if (typeof params === 'string') {
          this.setColorCar(params);
        }
      },
    );

    this.singletonMediator.subscribe(
      MEDIATOR_EVENTS.CHANGE_NAME_PREVIEW_CAR,
      (params) => {
        if (typeof params === 'string') {
          this.setNameCar(params);
        }
      },
    );
  }
}

export default PreviewCarModel;
