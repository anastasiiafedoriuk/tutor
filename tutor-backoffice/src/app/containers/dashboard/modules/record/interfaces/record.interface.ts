import {ICamera} from '../../camera/interfaces/camera.interface';

export interface IRecord {
  id: number;
  plate: string;
  speed: number;
  image: string;
  created: string;
  cameraPoint: ICamera
}
