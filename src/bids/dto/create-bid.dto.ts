import { IsNotEmpty } from "class-validator";

export class CreateBidDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    initialprice!: number;

    imageb64!: string[];

    
}
