import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { UserModel } from 'src/user/user.model';

interface IRequest {
  headers: Record<string, undefined | string>;
  user: unknown;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      const req = context.switchToHttp().getRequest<IRequest>();

      const headerAuth = req.headers?.authorization;
      if (!headerAuth) {
        throw new Error('');
      }

      const [bearer, token] = headerAuth.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new Error('');
      }

      const user = this.jwtService.verify<Omit<UserModel, 'password'>>(token);
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'User are unathorized' });
    }
  }
}
