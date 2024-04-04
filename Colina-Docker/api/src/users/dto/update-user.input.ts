import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserInput {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  fname?: string;

  @IsOptional()
  lname?: string;

  @IsOptional()
  status?: string;
}
