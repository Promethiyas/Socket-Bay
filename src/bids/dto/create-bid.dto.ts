import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateBidDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  initialPrice!: number;

  @IsArray()
  images!: string[];
}
