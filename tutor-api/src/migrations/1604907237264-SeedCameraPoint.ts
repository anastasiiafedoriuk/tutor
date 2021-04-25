import {getRepository, MigrationInterface} from 'typeorm';
import cameraPoints from '../seed/camera-point.seed.json';

export class SeedCameraPoint1604907237264 implements MigrationInterface {

  public async up(): Promise<void> {
    await getRepository('camera_point').save(cameraPoints);
  }

  public async down(): Promise<void> {
  }

}
