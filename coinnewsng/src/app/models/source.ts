import {updatedModelWithValues} from '../utils/common.utils';

export class Source {
  id: string;
  name: string;

  constructor(data?: any) {
    updatedModelWithValues(this, data);
  }
}
