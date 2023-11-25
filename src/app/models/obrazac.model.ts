import { ZakList } from './zakList.model';
import { ObrazacIO } from './obrazac-io.model';
import { Obrazac5 } from './obrazac5.model';

export class Obrazac {
  public id?: number;
  public date?: Date;
  public kvartal?: number;
  public year?: number;
  public version?: number;
  public jbbk?: number;
  public status?: number;
  public obrazacType?: string;
  public storno?: string;
  zakljucniListDtos: ZakList[] = [];
  obrazacIo: ObrazacIO[] = [];
  obrazac5: Obrazac5[] = [];

  constructor() {}
}
