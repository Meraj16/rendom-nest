import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(reflector: Reflector) {
    super(reflector);  // Pass the reflector to the superclass
  }

  canActivate(context: ExecutionContext): boolean {
    try {
      // First, ensure the user is authenticated
      const isAuthenticated = super.canActivate(context) as boolean;

      if (!isAuthenticated) {
        return false;
      }

      // if (!isAuthenticated) {
      //   throw new UnauthorizedException('User is not authenticated');
      // }

      // Then, check for role-based access
      const roles = this.getRoles(context);

      console.log("==========?", roles);

      if (!roles.length) {
        return true; // No roles specified, allow access
      }

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      // if (!roles.includes(user.role)) {
      //   throw new ForbiddenException('User does not have the required role');
      // }

      return roles.includes(user.role);

    } catch (error) {
      console.error('Error in RolesGuard:', error);
      throw error;
    }
  }
}