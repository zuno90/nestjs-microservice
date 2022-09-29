import { IsString, IsNotEmpty, IsPositive, IsPhoneNumber } from "class-validator"

export class CreateOrderRequest {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsPositive()
    price: number

    @IsPhoneNumber()
    phone: string
}
