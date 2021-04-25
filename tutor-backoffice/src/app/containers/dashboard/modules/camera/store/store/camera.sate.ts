import {ICamera} from '../../interfaces/camera.interface';

export interface ICameraSate {
  data: ICamera[];
  loading: boolean;
  loaded: boolean;
}
