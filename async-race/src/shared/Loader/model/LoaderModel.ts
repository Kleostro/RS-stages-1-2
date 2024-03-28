import LoaderView from '../view/LoaderView.ts';

class LoaderModel {
  private loaderView: LoaderView;

  constructor() {
    this.loaderView = new LoaderView();
  }

  public getHTML(): HTMLDivElement {
    return this.loaderView.getHTML();
  }
}

export default LoaderModel;
