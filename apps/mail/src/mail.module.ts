import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule, RmqModule } from "@app/common"
import { MailController } from "./mail.controller"
import { MailService } from "./mail.service"
import * as Joi from "joi"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_MAIL_QUEUE: Joi.string().required(),
            }),
            envFilePath: "./apps/mail/.env",
        }),
        RmqModule,
        AuthModule
    ],
    controllers: [MailController],
    providers: [MailService],
})
export class MailModule {}
