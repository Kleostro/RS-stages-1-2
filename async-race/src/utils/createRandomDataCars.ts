import type { CarInterface } from '../shared/Api/types/interfaces.ts';
import getRandomIndex from './getRandomIndex.ts';

enum CarModel {
  'Model 3' = 'Model 3',
  'Model S' = 'Model S',
  'Model X' = 'Model X',
  'Model Y' = 'Model Y',
  'Roadster' = 'Roadster',
  'Cybertruck' = 'Cybertruck',
  'Bolt EV' = 'Bolt EV',
  'I-Pace' = 'I-Pace',
  'Kona Electric' = 'Kona Electric',
  'Taycan Turbo' = 'Taycan Turbo',
  'Taycan Turbo S' = 'Taycan Turbo S',
  'e-Golf' = 'e-Golf',
  'Soul Electric' = 'Soul Electric',
  'e6' = 'e6',
  'Leaf' = 'Leaf',
  'Zoe' = 'Zoe',
  'i3' = 'i3',
  'dolphin' = 'dolphin',
  'eQ' = 'eQ',
}

enum CarBrand {
  'Tesla' = 'Tesla',
  'Chevrolet' = 'Chevrolet',
  'Hyundai' = 'Hyundai',
  'Kia' = 'Kia',
  'Jaguar' = 'Jaguar',
  'Porche' = 'Porche',
  'BYD' = 'BYD',
  'Volkswagen' = 'Volkswagen',
  'Nissan' = 'Nissan',
  'Renault' = 'Renault',
  'Chery' = 'Chery',
  'BMW' = 'BMW',
}

const createRandomDataCars = (countCars: number): CarInterface[] => {
  const cars: CarInterface[] = [];
  const getRandomBrand = (): string =>
    Object.keys(CarBrand)[getRandomIndex(Object.keys(CarBrand).length)];
  const getRandomModel = (): string =>
    Object.keys(CarModel)[getRandomIndex(Object.keys(CarModel).length)];
  const getRandomColor = (): string =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  for (let i = 0; i < countCars; i += 1) {
    cars.push({
      name: `${getRandomBrand()} ${getRandomModel()}`,
      color: getRandomColor(),
    });
  }
  return cars;
};

export default createRandomDataCars;
