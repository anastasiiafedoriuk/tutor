import {Service} from 'typedi';
import {InjectRepository} from 'typeorm-typedi-extensions';
import {Record} from '../entity/Record';
import {Repository} from 'typeorm';
import {config} from '../config';
import {CarRepository} from '../repository/car.repository';
import {Violation} from '../entity/Violation';
import moment from 'moment';
import {AverageSpeedViolation} from '../entity/AverageSpeedViolation';

@Service()
export class ViolationService {

  constructor(@InjectRepository(Record) private readonly recordRepository: Repository<Record>,
              @InjectRepository(Violation) private readonly violationRepository: Repository<Violation>,
              @InjectRepository(AverageSpeedViolation) private readonly averageSpeedViolationRepository: Repository<AverageSpeedViolation>,
              @InjectRepository(CarRepository) private readonly carRepository: CarRepository) {
  }

  async findViolation(): Promise<void> {
    const records = await this.recordRepository.find({
      where: {
        singleViolationVerification: false
      },
      relations: ['cameraPoint']
    });
    for (const record of records) {
      const car = await this.carRepository.findByPlateOrCreateNew(record.plate);
      if (record.speed > record.cameraPoint.speed + config.speedError) {
        await this.violationRepository.save({
          car,
          record
        });
      }
      await this.recordRepository.save({
        ...record,
        singleViolationVerification: true
      });
    }
  }

  async findAverageSpeedViolations(): Promise<void> {
    const records = await this.recordRepository.find({
      relations: ['cameraPoint', 'cameraPoint.startPoints', 'cameraPoint.startPoints.endPoint', 'cameraPoint.startPoints.endPoint.records'],
      where: {
        averageViolationVerification: false
      }
    });
    for (const record of records) {
      const startPoints = record.cameraPoint.startPoints;
      for (const startPoint of startPoints) {
        const sameCarEndpointRecords = startPoint.endPoint.records.filter(item => record.plate === item.plate);
        const car = await this.carRepository.findByPlateOrCreateNew(record.plate);
        const maxTime = (startPoint.distance / 1000) / (startPoint.averageSpeed + config.speedError) * 60;
        for (const endRecord of sameCarEndpointRecords) {
          const diff = moment(record.created).diff(moment(endRecord.created), 'minutes', true);
          if (diff < maxTime) {
            await this.averageSpeedViolationRepository.save({
              car,
              startRecord: record,
              endRecord
            });
            await this.recordRepository.save({
              ...record,
              averageViolationVerification: true
            });
          }
        }
      }
    }
  }

}
