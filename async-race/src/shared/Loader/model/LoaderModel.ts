import LoaderView from '../view/LoaderView.ts';

class LoaderModel {
  private loaderView: LoaderView;

  private loader: HTMLDivElement;

  constructor() {
    this.loaderView = new LoaderView();
    this.loader = this.loaderView.getHTML();
  }

  public getHTML(): HTMLDivElement {
    return this.loader;
  }
}

export default LoaderModel;
