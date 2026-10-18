import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Global/Route Guard: JwtAuthGuard
 * * * Purpose:
 * This guard secures endpoints by verifying incoming JSON Web Tokens (JWT).
 * It acts as the first line of defense for protected routes.
 * * * How it works under the hood:
 * 1. Extends NestJS Passport's built-in `AuthGuard`.
 * 2. The string 'jwt' tells Passport to look for a strategy registered with the name 'jwt'
 * (usually defined in a corresponding `JwtStrategy` file).
 * 3. Passport automatically extracts the token, validates its signature, checks expiration,
 * and—if valid—attaches the decoded payload to the Request object as `request.user`.
 * * * Usage in a Controller:
 * @UseGuards(JwtAuthGuard)
 * @Get('protected-data')
 * getPrivateData() { ... }
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard(
    'jwt' // This string must match the identifier used in your Passport JWT Strategy
) { 
    // Leaving the class body empty inherits all the default behavior from Passport's AuthGuard.
    // You can override methods here like `canActivate()` or `handleRequest()` if you need
    // custom error handling or logging logic.
}