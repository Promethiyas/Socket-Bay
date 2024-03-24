import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateWalletDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;
}
