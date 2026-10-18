import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

/**
 * Authentication Strategy: JwtStrategy
 * * * Purpose:
 * This class defines how Passport should verify JSON Web Tokens (JWT) provided in 
 * the headers of incoming requests. It handles the extraction, cryptographic 
 * verification, and parsing of the token.
 * * * How it integrates:
 * When a route is protected by `JwtAuthGuard`, NestJS routes the request through this 
 * strategy. If the token is valid, the data returned by the `validate()` method is 
 * automatically attached to the request object as `request.user`.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    /**
     * Constructor configures the underlying passport-jwt options.
     * @param configService - Injected NestJS ConfigService to safely retrieve environment variables.
     */
    constructor(
        private readonly configService: ConfigService
    ) {
        // Pass configuration options to the parent PassportStrategy class via super()
        super({
            // 1. Where to look for the JWT: This configures Passport to extract the token 
            //    from the HTTP 'Authorization' header as a Bearer token (e.g., "Bearer <token>").
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            // 2. Security setting: Enforce token expiration checking. 
            //    If set to true, Passport will accept expired tokens (dangerous for production!).
            ignoreExpiration: false,

            // 3. Cryptographic Key: The secret key used to verify the signature of the JWT.
            //    Using configService ensures we pull this securely from our environment variables.
            //    The '!' is a TypeScript non-null assertion operator, telling TS we guarantee this key exists.
            secretOrKey: configService.get<string>('jwt.secret')!
        });
    }

    /**
     * The validation hook invoked automatically by Passport *only* after the JWT signature 
     * and expiration have been successfully and cryptographically verified.
     * * * Why this matters:
     * Whatever this function returns is what gets injected into `request.user`. This data 
     * becomes instantly accessible to your custom decorators (like `@CurrentUser()`) and guards (like `RolesGuard`).
     * * @param payload - The decoded JSON payload contained within the validated JWT.
     * @returns An object containing the core user properties needed for downstream authorization.
     */
    async validate(payload: any) {
        // Map the JWT payload fields to a clean user object.
        // Standard JWTs typically store the user's primary database ID inside the 'sub' (subject) claim.
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role // This property is critical for the RolesGuard to check permissions
        };
    }
}