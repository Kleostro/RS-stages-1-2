import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super(process.env.API_URL, {
      apiKey: process.env.API_KEY, // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
