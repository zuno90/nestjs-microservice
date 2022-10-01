import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import * as Joi from "joi"
import { AuthModule, DatabaseModule, RmqModule } from "@app/common"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"
import { OrderRepository } from "./order.repository"
import { Order, OrderSchema } from "./schemas/order.schema"
import { BILLING_SERVICE_NAME, MAIL_SERVICE_NAME } from "./constants/services"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({ MONGODB_URI: Joi.string().required(), PORT: Joi.number().required() }),
            envFilePath: "./apps/orders/.env",
        }),
        DatabaseModule,
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
        AuthModule,
        RmqModule.register({ name: BILLING_SERVICE_NAME }),
        RmqModule.register({ name: MAIL_SERVICE_NAME }),
    ],
    controllers: [OrdersController],
    providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
