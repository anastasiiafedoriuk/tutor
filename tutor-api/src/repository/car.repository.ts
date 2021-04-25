import {EntityRepository, Repository} from 'typeorm';
import {Car} from '../entity/Car';

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {

  async findByPlateOrCreateNew(plate: string): Promise<Car> {
    let car = await this.findOne({
      where: {
        plate
      }
    });
    if (!car) {
      car = await this.save({
        plate
      });
    }
    return car;
  }
}
