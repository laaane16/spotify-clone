import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { GetUserDto } from './dto/get-user.dto';

interface RequestWithUser extends Request {
  user: GetUserDto;
}
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  getUserByToken(@Req() req: RequestWithUser) {
    return this.userService.getUserByToken(req.user);
  }
}
