import './index.scss';
import AppModel from './app/App/model/AppModel.ts';

const myApp = new AppModel();
document.body.append(myApp.getHTML());
