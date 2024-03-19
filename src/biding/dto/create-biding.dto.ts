import { IsNotEmpty } from "class-validator";

export class CreateBidingDto {
    @IsNotEmpty()
    user_id!: string;
    @IsNotEmpty()
    biding_amount!: number;

}
