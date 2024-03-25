import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  address!: string;

  @IsNotEmpty()
  age!: number;

  @IsNotEmpty()
  phone!: string;
}
