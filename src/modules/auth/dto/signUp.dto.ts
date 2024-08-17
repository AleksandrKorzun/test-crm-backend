import { IsNotEmpty, IsString } from 'class-validator';
import { SignInRequestDto } from './signIn.dto';

export class SignUpRequestDto extends SignInRequestDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
