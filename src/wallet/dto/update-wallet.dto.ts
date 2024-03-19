import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
    @IsNotEmpty()
    newbalance!: number;
}
