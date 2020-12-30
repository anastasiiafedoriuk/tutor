import {Service} from 'typedi';
import axios from 'axios';
import {ICar} from '../interfaces/car.interface';
import {layers, losses, Sequential, sequential, Tensor, tensor2d, tidy, train, util, History} from '@tensorflow/tfjs';
import {show} from '@tensorflow/tfjs-vis';

@Service()
export class CarService {

  getCars(): Promise<Partial<ICar>[]> {
    return new Promise((resolve, rejects) => {
      axios.get<ICar[]>('https://storage.googleapis.com/tfjs-tutorials/carsData.json')
        .then(res => {
          const data: Partial<ICar>[] = res.data.map(car => ({
            Miles_per_Gallon: car.Miles_per_Gallon,
            Horsepower: car.Horsepower
          })).filter(car => (car.Miles_per_Gallon != null && car.Horsepower != null));
          resolve(data);
        })
        .catch(err => rejects(err));
    })
  }

  model(): Sequential {
    const model = sequential();
    model.add(layers.dense({inputShape: [1], units: 1, useBias: true}));
    model.add(layers.dense({units: 1, useBias: true}))
    return model;
  }

  convertToTensor(data: Partial<ICar>[]) {
    return tidy(() => {
      util.shuffle(data);

      const inputs = data.map(d => d.Horsepower);
      const labels = data.map(d => d.Miles_per_Gallon);
      const inputTensor = tensor2d(inputs, [inputs.length, 1]);
      const labelTensor = tensor2d(labels, [labels.length, 1]);

      const inputMax = inputTensor.max();
      const inputMin = inputTensor.min();
      const labelMax = labelTensor.max();
      const labelMin = labelTensor.min();

      const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
      const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

      return {
        inputs: normalizedInputs,
        labels: normalizedLabels,
        inputMax,
        inputMin,
        labelMax,
        labelMin
      };
    });
  }

  trainModel(model: Sequential, inputs: Tensor, labels: Tensor): Promise<History> {
    model.compile({
      optimizer: train.adam(),
      loss: losses.meanSquaredError,
      metrics: ['mse']
    });

    const batchSize = 32;
    const epochs = 50;

    return model.fit(inputs, labels, {
      batchSize,
      epochs,
      shuffle: true,
      callbacks: show.fitCallbacks(
        {name: 'Training Performance'},
        ['loss', 'mse'],
        {height: 200, callbacks: ['onEpochEnd']}
      )
    });
  }
}
