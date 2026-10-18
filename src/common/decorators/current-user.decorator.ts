import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Custom Route Parameter Decorator: @CurrentUser
 * * Purpose:
 * This decorator provides a clean, reusable way to extract the authenticated 
 * user object directly from the incoming HTTP request and inject it into 
 * controller route handlers.
 * * Usage in a Controller:
 * @Get('profile')
 * getProfile(@CurrentUser() user: UserEntity) {
 * return user;
 * }
 */
export const CurrentUser = createParamDecorator(
  /**
   * The factory function that defines the decorator's behavior.
   * * @param data - Any arguments passed into the decorator (e.g., @CurrentUser('email')).
   * Typed as 'unknown' here because we aren't expecting specific arguments.
   * @param ctx - The ExecutionContext, which provides metadata about the current 
   * execution pipeline (HTTP, RPC, or WebSockets).
   * @returns The authenticated user object attached to the request, or undefined.
   */
  (data: unknown, ctx: ExecutionContext) => {
    // 1. Switch the generic execution context to the HTTP context.
    //    This allows us to access native Express or Fastify request/response objects.
    const request = ctx.switchToHttp().getRequest();

    // 2. Extract and return the 'user' property from the request object.
    //    Note: This assumes an authentication Guard (like Passport or a custom JWT Guard)
    //    has already run, validated the token, and attached the user to `request.user`.
    return request.user;
  }
);