import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/role.decorator";

/**
 * Authorization Guard: RolesGuard
 * * * Purpose:
 * This guard handles Role-Based Access Control (RBAC). It evaluates whether the 
 * currently authenticated user possesses the required privileges to access a 
 * route or controller.
 * * * Prerequisites:
 * 1. Must run AFTER an authentication guard (like `JwtAuthGuard`) so that `request.user` is populated.
 * 2. Relies on the `@Roles()` decorator to attach metadata to routes.
 */
@Injectable()
export class RolesGuard implements CanActivate {

    /**
     * The constructor injects the NestJS `Reflector` helper class.
     * `Reflector` is used to retrieve metadata that was attached to classes 
     * or handlers via decorators (like your custom `@Roles()` decorator).
     */
    constructor(
        private readonly reflector: Reflector
    ) { }

    /**
     * Core guard method required by the `CanActivate` interface.
     * * @param context - The ExecutionContext providing metadata about the current request execution pipeline.
     * @returns boolean | Promise<boolean> | Observable<boolean> - True allows the request to pass; False triggers a 403 Forbidden exception.
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        /**
         * 1. Retrieve the allowed roles for this specific endpoint.
         * * `getAllAndOverride` looks for metadata under the `ROLES_KEY` ('roles') in two places:
         * - `context.getHandler()`: The specific method handling the route (e.g., `getDashboard()`).
         * - `context.getClass()`: The parent controller class containing the route (e.g., `AdminController`).
         * * Note: If a `@Roles()` decorator is defined on both the controller AND the method, 
         * `getAllAndOverride` will favor (override with) the method-level metadata.
         */
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [
                context.getHandler(), // Checks method-level metadata first
                context.getClass()    // Checks controller-level metadata second
            ]
        );

        // 2. If no roles are explicitly required for this route, skip authorization and allow public access.
        if (!requiredRoles) return true;

        // 3. Extract the request object from the HTTP context, and destructure the 'user' payload.
        //    CRITICAL: For this line to work safely, an authentication guard must have executed prior to this guard.
        const { user } = context.switchToHttp().getRequest();

        // 4. Validate permissions.
        //    Checks if the user's assigned role exists within the array of allowed `requiredRoles`.
        //    Returns `true` (Access Granted) or `false` (Access Denied -> Automatic 403 Forbidden Error).
        return requiredRoles.includes(user.role);
    }
}