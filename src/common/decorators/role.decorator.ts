import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../enums/user-role.enum";

/**
 * The metadata key used to store and retrieve role configurations.
 * This string acts as an identifier when the Reflector class reads 
 * metadata inside Guards or Interceptors.
 */
export const ROLES_KEY = 'roles';

/**
 * Custom Method/Class Decorator: @Roles
 * * * Purpose:
 * This decorator attaches specific authorization roles as metadata to route handlers 
 * or entire controllers. A RolesGuard will later read this metadata to determine 
 * if the authenticated user has permission to access the resource.
 * * * Usage in a Controller:
 * @Roles(UserRole.ADMIN, UserRole.MANAGER)
 * @Get('admin-dashboard')
 * getDashboard() { ... }
 * * @param roles - A spread array of allowed roles passed to the decorator.
 * @returns A NestJS custom metadata configurator.
 */
export const Roles = (
    ...roles: UserRole[]
) => SetMetadata(
    ROLES_KEY,
    roles
);