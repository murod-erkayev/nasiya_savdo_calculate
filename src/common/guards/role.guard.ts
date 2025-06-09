import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new ForbiddenException('Foydalanuvchi aniqlanmadi');
    }
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(`Bu amal uchun ruxsat yo‘q: ${user.role}`);
    }
    if (user.is_active === false) {
      throw new ForbiddenException(`Foydalanuvchi faol emas`);
    }

    return true;
  }
}
