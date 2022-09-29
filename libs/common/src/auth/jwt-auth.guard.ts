import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { catchError, Observable, tap } from "rxjs"
import { AUTH_SERVICE_NAME } from "./services"

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE_NAME) private authClient: ClientProxy) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const authentication = this.getAuthentication(context)
        return this.authClient.send("validate_user", { Authentication: authentication }).pipe(
            tap((res) => this.addUser(res, context)),
            catchError(() => {
                throw new UnauthorizedException()
            })
        )
    }

    private getAuthentication(context: ExecutionContext) {
        let authentication: string
        switch (context.getType()) {
            case "rpc":
                authentication = context.switchToRpc().getData().Authentication
                break
            case "http":
                authentication = context.switchToHttp().getRequest().cookies?.Authentication
                break
            default:
                break
        }
        if (!authentication) throw new UnauthorizedException("No value was provided for Authentication")
        return authentication
    }

    private addUser(user: any, context: ExecutionContext) {
        switch (context.getType()) {
            case "rpc":
                context.switchToRpc().getData().user = user
                break
            case "http":
                context.switchToHttp().getRequest().user = user
                break
            default:
                break
        }
    }
}
