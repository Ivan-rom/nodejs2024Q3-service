import { Optional } from '@nestjs/common';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsUUID()
  @Optional()
  artistId: string | null;
}
