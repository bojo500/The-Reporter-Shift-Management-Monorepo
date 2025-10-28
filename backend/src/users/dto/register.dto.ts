import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @ApiProperty({type: IsEmail})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 128)
  @Matches(/[A-Z]/, { message: 'password must contain at least one uppercase letter' })
  @Matches(/[a-z]/, { message: 'password must contain at least one lowercase letter' })
  @Matches(/\d/, { message: 'password must contain at least one number' })
  @Matches(/[^A-Za-z0-9]/, { message: 'password must contain at least one special character' })
  password: string;
}