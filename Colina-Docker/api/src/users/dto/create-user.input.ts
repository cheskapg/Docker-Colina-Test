import { IsEmail } from 'class-validator';

export class CreateUserInput {
  uuid: string;
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
  password: string;
  fname: string;
  lname: string;
  status: string;
}
