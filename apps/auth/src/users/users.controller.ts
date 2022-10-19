import { Body, Controller, Post } from "@nestjs/common"
import { CreateUserRequest } from "./dto/create-user.request"
import { UsersService } from "./users.service"

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("auth/register")
    async createUser(@Body() request: CreateUserRequest) {
        return this.usersService.createUser(request)
    }
}
