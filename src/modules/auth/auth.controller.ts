import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/signIn.dto';
import { SignUpRequestDto } from './dto/signUp.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() user: SignInRequestDto) {
    return this.authService.signIn(user);
  }
  @Post('/signup')
  signUp(@Body() user: SignUpRequestDto) {
    return this.authService.signUp(user);
  }

  @Post('/signout/:id')
  signOut(@Param('id') id: string) {
    return this.authService.signOut(id);
  }
}
