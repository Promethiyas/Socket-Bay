import { IsNotEmpty } from "class-validator";

export class CreateWalletDto {
    @IsNotEmpty()
    balance!: number;

    @IsNotEmpty()
    currency!: string;

}
