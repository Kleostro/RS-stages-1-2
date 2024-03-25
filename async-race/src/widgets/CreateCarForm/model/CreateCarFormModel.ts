import type { CarInterface } from '../../../shared/Api/types/interfaces.ts';
import ApiModel from '../../../shared/Api/model/ApiModel.ts';
import { EVENT_NAMES } from '../../../shared/types/enums.ts';
import CreateCarFormView from '../view/CreateCarFormView.ts';
import StoreModel from '../../../shared/Store/model/StoreModel.ts';
import ACTIONS from '../../../shared/Store/actions/types/enums.ts';
import formatText from '../../../utils/formatText.ts';
import MediatorModel from '../../../shared/Mediator/model/MediatorModel.ts';
import MEDIATOR_EVENTS from '../../../shared/Mediator/types/enums.ts';
import LoaderModel from '../../../shared/Loader/model/LoaderModel.ts';

class CreateCarFormModel {
  private singletonMediator: MediatorModel<unknown>;

  private createCarFormView: CreateCarFormView;

  private form: HTMLFormElement;

  constructor() {
    this.singletonMediator = MediatorModel.getInstance();
    this.createCarFormView = new CreateCarFormView();
    this.form = this.createCarFormView.getHTML();
    this.init();
  }

  public getHTML(): HTMLFormElement {
    return this.form;
  }

  private checkForm(): void {
    const carNameInput = this.createCarFormView.getCarNameInput().getHTML();
    const carColorInput = this.createCarFormView.getCarColorInput().getHTML();
    const submitButton = this.createCarFormView.getSubmitButton();

    if (!carNameInput.value.length || !carColorInput.value.length) {
      submitButton.setDisabled();
    } else {
      submitButton.setEnabled();
    }
  }

  private async submitHandler(): Promise<void> {
    const carNameInput = this.createCarFormView.getCarNameInput();
    const carColorInput = this.createCarFormView.getCarColorInput();
    const submitButton = this.createCarFormView.getSubmitButton();

    const newCarData: CarInterface = {
      name: formatText(carNameInput.getHTML().value),
      color: formatText(carColorInput.getHTML().value),
    };

    const loader = new LoaderModel();

    submitButton.getHTML().append(loader.getHTML());

    await ApiModel.createCar(newCarData);

    const carsWithoutCreated = await ApiModel.getCars(new Map());

    loader.getHTML().remove();

    if (!carsWithoutCreated) {
      return;
    }

    StoreModel.dispatch({
      type: ACTIONS.GET_CARS,
      payload: carsWithoutCreated,
    });

    carNameInput.clear();
    const initColor = '#000000';
    carColorInput.getHTML().value = initColor;
    submitButton.setDisabled();
    this.singletonMediator.notify(MEDIATOR_EVENTS.CREATE_CAR, '');
  }

  private init(): void {
    const carNameInput = this.createCarFormView.getCarNameInput().getHTML();
    const carColorInput = this.createCarFormView.getCarColorInput().getHTML();

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
  }
}

export default CreateCarFormModel;
