import { IsUUID } from 'class-validator';

export class IDParam {
  @IsUUID('4')
  id: string;
}
