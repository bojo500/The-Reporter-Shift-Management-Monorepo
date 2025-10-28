import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'اسم المستخدم', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'البريد الإلكتروني', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'كلمة المرور', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: 'رقم الهاتف', required: false })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
