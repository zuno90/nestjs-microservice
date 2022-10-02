import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AuthModule, RmqModule } from "@app/common"
import { MailController } from "./mail.controller"
import { MailService } from "./mail.service"
import { MailerModule } from "@nestjs-modules/mailer"
import * as Joi from "joi"
import { join } from "path"
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"

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
        AuthModule,
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    service: "gmail",
                    // host: configService.get<string>("GMAIL_HOST"),
                    port: +configService.get<string>("GMAIL_PORT"),
                    ignoreTLS: true,
                    secure: false,
                    auth: {
                        // type: "oauth2",
                        // clientId: configService.get<string>("GMAIL_CLIENT_ID"),
                        // clientSecret: configService.get<string>("GMAIL_CLIENT_SECRET"),
                        // refreshToken: configService.get<string>("GMAIL_REFRESH_TOKEN"),
                        // accessUrl: configService.get<string>("GMAIL_REDIRECT_URI"),
                        user: configService.get<string>("GMAIL_USER_NAME"),
                        pass: configService.get<string>("GMAIL_PASSWORD"),
                    },
                },

                defaults: { from: "pnlan1406@gmail.com" },
                template: {
                    dir: join(__dirname, "templates"),
                    adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                    options: { strict: true },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [MailController],
    providers: [MailService],
})
export class MailModule {}
