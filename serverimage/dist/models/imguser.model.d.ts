import { Model } from '@loopback/repository';
export declare class Imguser extends Model {
    id?: string;
    imgname?: string;
    constructor(data?: Partial<Imguser>);
}
export interface ImguserRelations {
}
export declare type ImguserWithRelations = Imguser & ImguserRelations;
