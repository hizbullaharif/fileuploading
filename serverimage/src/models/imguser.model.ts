import {Model, model, property} from '@loopback/repository';

@model()
export class Imguser extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  imgname?: string;


  constructor(data?: Partial<Imguser>) {
    super(data);
  }
}

export interface ImguserRelations {
  // describe navigational properties here
}

export type ImguserWithRelations = Imguser & ImguserRelations;
