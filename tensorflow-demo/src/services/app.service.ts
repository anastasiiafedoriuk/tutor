import {Service} from 'typedi';
import {CarService} from './car.service';
import {Point2D, render, show, XYPlotOptions} from '@tensorflow/tfjs-vis';

@Service()
export class AppService {

  constructor(private readonly carService: CarService) {
    console.log(this.carService);
  }

  init(): void {
    console.log('app init');
    this.carService.getCars().then(data => {
      const values: Point2D[] = data.map(car => ({
        x: car.Horsepower,
        y: car.Miles_per_Gallon
      }));
      const config: XYPlotOptions = {
        xLabel: 'Horsepower',
        yLabel: 'MPG',
        height: 300
      };
      const carModel = this.carService.model();
      const tensorData = this.carService.convertToTensor(data);

      render.scatterplot({name: 'Horsepower v MPG'}, {values}, config);
      show.modelSummary({name: 'Model Summary'}, carModel);
      this.carService.trainModel(carModel, tensorData.inputs, tensorData.labels)
        .then(res => {
          console.log(res);
          console.log('Done Training');
        });
    });
  }
}
