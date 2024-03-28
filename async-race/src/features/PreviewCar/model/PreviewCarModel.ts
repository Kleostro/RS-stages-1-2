import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import { changeSVGFill } from '../../../utils/createCarImg.ts';
import PreviewCarView from '../view/PreviewCarView.ts';

class PreviewCarModel {
  private previewCarView: PreviewCarView = new PreviewCarView();

  private singletonMediator: MediatorModel<unknown> =
    MediatorModel.getInstance();

  constructor() {
    this.init();
  }

  public getHTML(): HTMLDivElement {
    return this.previewCarView.getHTML();
  }

  private setColorCar(color: string): void {
    const carSvg = this.previewCarView.getCarSVG();
    changeSVGFill(carSvg, color);
  }

  private setNameCar(name: string): void {
    this.previewCarView.getCarName().textContent = name;
  }

  private setInitialStateFields(): void {
    this.previewCarView.getCarName().textContent = '';
    const attr = 'fill';
    this.previewCarView.getCarSVG().removeAttribute(attr);
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

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.CREATE_CAR, () => {
      this.setInitialStateFields();
    });

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.UPDATE_CAR, () => {
      this.setInitialStateFields();
    });
  }
}

export default PreviewCarModel;
