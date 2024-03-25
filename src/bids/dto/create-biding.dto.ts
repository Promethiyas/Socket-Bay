import { IsNumber } from 'class-validator';

export class CreateBidingDto {
  @IsNumber()
  amount: number;
}
