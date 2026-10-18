import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from './strategies/jwt.strategy';

/**
 * Feature Module: AuthModule
 * * Purpose:
 * This module orchestrates all authentication and authorization processes across the application.
 * It ties together Passport, JWT tokens, configuration variables, and user data management.
 * It serves as the architectural boundary that registers the controllers, services, and 
 * strategy dependencies required to validate users and issue tokens.
 */
@Module({
    imports: [
        // ConfigModule: Made available here to ensure that environment configuration data 
        // can be parsed and resolved within this module's context.
        ConfigModule,
        
        // JwtModule (Asynchronous Registration):
        // Configures NestJS's internal JwtService wrapper. `.registerAsync()` is used instead of 
        // `.register()` to prevent race conditions during initialization. This ensures that the 
        // application's environment variables (via ConfigService) are fully loaded into memory 
        // before Nest attempts to evaluate and sign tokens with the secret key.
        JwtModule.registerAsync({
            // inject: Declares that the ConfigService provider must be resolved from the 
            // dependency injection container and passed as an argument to the useFactory function.
            inject: [ConfigService],
            // useFactory: A factory function that dynamically builds and returns the 
            // configuration options object needed to initialize the JwtService instance.
            useFactory: (config: ConfigService) => ({
                // secret: Retrieves the cryptographic key used to sign and verify JWT signatures.
                secret: config.get('jwt.secret'),
                signOptions: {
                    // expiresIn: Controls the lifespan of issued tokens (e.g., '1h', '7d').
                    expiresIn: config.get('jwt.expiresIn')
                }
            })
        }),
        
        // PassportModule:
        // Initializes the core passport library ecosystem inside NestJS. By setting 
        // `defaultStrategy` to 'jwt', any AuthGuard that doesn't explicitly specify a strategy 
        // name will fall back to using the 'jwt' extraction and verification pipeline.
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        
        // UsersModule:
        // Imports the module responsible for user record state. This allows AuthService to 
        // safely utilize exported services (like a UsersService) to locate records by criteria 
        // such as email addresses during the authentication handshake.
        UsersModule
    ],
    
    // providers: 
    // The set of private or shared instances instantiated by the NestJS injector. 
    // These handle the application's heavy lifting, data parsing, and business rule evaluation.
    providers: [
        // AuthService: Houses your domain logic (e.g., hash comparisons, checking user states).
        AuthService,
        // JwtStrategy: Handles structural token validation, parsing, and request decoration.
        JwtStrategy
    ],
    
    // exports:
    // Makes specific providers visible and usable to other external modules that import 
    // AuthModule. Exporting AuthService allows features outside this block to manually sign, 
    // decode, or inspect tokens.
    exports: [AuthService],
    
    // controllers:
    // Instantiates the inbound API endpoints (e.g., POST /auth/login) defined inside the 
    // AuthController, mapping routing URLs directly to underlying execution logic.
    controllers: [AuthController]
})
export class AuthModule { }