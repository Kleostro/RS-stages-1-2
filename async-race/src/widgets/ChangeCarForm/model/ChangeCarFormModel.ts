import type { CarInterface } from '../../../shared/Api/types/interfaces.ts';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import ChangeCarFormView from '../view/ChangeCarFormView.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import formatText from '../../../utils/formatText.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import LoaderModel from '../../../shared/Loader/model/LoaderModel.ts';

class ChangeCarFormModel {
  private singletonMediator: MediatorModel<unknown> =
    MediatorModel.getInstance();

  private selectCar: CarInterface | null = null;

  private changeCarFormView: ChangeCarFormView = new ChangeCarFormView();

  constructor() {
    this.init();
  }

  public getHTML(): HTMLFormElement {
    return this.changeCarFormView.getHTML();
  }

  private getSelectCar(id: number): void {
    const loader = new LoaderModel();
    this.changeCarFormView.getSubmitButton().getHTML().append(loader.getHTML());
    ApiModel.getCarById(id)
      .then((car) => {
        if (car) {
          loader.getHTML().remove();
          this.selectCar = car;
          this.unDisableForm();
          this.singletonMediator.notify(
            MEDIATOR_EVENTS.CHANGE_NAME_PREVIEW_CAR,
            car.name,
          );
          this.singletonMediator.notify(
            MEDIATOR_EVENTS.CHANGE_COLOR_PREVIEW_CAR,
            car.color,
          );
        }
      })
      .catch(() => {});
  }

  private unDisableForm(): void {
    const carNameInput = this.changeCarFormView.getCarNameInput();
    const carColorInput = this.changeCarFormView.getCarColorInput();
    const submitButton = this.changeCarFormView.getSubmitButton();
    carNameInput.setEnabled();
    carColorInput.setEnabled();
    submitButton.setEnabled();

    carNameInput.getHTML().value = this.selectCar?.name || '';
    carColorInput.getHTML().value = this.selectCar?.color || '';
  }

  private checkForm(): void {
    const carNameInput = this.changeCarFormView.getCarNameInput().getHTML();
    const carColorInput = this.changeCarFormView.getCarColorInput().getHTML();
    const submitButton = this.changeCarFormView.getSubmitButton();

    if (!carNameInput.value.length || !carColorInput.value.length) {
      submitButton.setDisabled();
    } else {
      submitButton.setEnabled();
    }
  }

  private async submitHandler(): Promise<void> {
    const carNameInput = this.changeCarFormView.getCarNameInput();
    const carColorInput = this.changeCarFormView.getCarColorInput();
    const submitButton = this.changeCarFormView.getSubmitButton();

    const newCarData: CarInterface = {
      name: formatText(carNameInput.getHTML().value),
      color: formatText(carColorInput.getHTML().value),
    };

    if (!this.selectCar || !this.selectCar.id) {
      return;
    }
    const loader = new LoaderModel();
    this.changeCarFormView.getSubmitButton().getHTML().append(loader.getHTML());

    await ApiModel.updateCarById(this.selectCar.id, newCarData);

    const carWithoutChange = await ApiModel.getCarById(this.selectCar.id);

    loader.getHTML().remove();

    if (!carWithoutChange || !carWithoutChange.id) {
      return;
    }

    const { cars } = StoreModel.getState();

    const updateCar = cars.find((car) => car.id === carWithoutChange.id);
    if (updateCar) {
      updateCar.name = newCarData.name;
      updateCar.color = newCarData.color;
    }

    StoreModel.dispatch({
      type: ACTIONS.ADD_NEW_CAR,
      payload: cars,
    });

    carNameInput.clear();
    const initColor = '#000000';
    carColorInput.getHTML().value = initColor;
    carNameInput.setDisabled();
    carColorInput.setDisabled();
    submitButton.setDisabled();
    this.singletonMediator.notify(MEDIATOR_EVENTS.UPDATE_CAR, updateCar?.id);
  }

  private init(): void {
    const carNameInput = this.changeCarFormView.getCarNameInput().getHTML();
    const carColorInput = this.changeCarFormView.getCarColorInput().getHTML();

    carNameInput.addEventListener(EVENT_NAMES.INPUT, () => {
      this.checkForm();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_NAME_PREVIEW_CAR,
        carNameInput.value,
      );
    });

    carColorInput.addEventListener(EVENT_NAMES.INPUT, () => {
      this.checkForm();
      this.singletonMediator.notify(
        MEDIATOR_EVENTS.CHANGE_COLOR_PREVIEW_CAR,
        carColorInput.value,
      );
    });

    this.getHTML().addEventListener(
      EVENT_NAMES.SUBMIT,
      (event: SubmitEvent) => {
        event.preventDefault();
        this.submitHandler().catch(() => {});
      },
    );

    this.singletonMediator.subscribe(MEDIATOR_EVENTS.SELECT_CAR, (params) => {
      if (typeof params === 'number') {
        this.getSelectCar(params);
      }
    });
  }
}

export default ChangeCarFormModel;
