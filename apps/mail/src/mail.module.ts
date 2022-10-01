import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AuthModule, RmqModule } from "@app/common"
import { MailController } from "./mail.controller"
import { MailService } from "./mail.service"
import * as Joi from "joi"
import { MailerModule } from "@nestjs-modules/mailer"
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { join } from "path"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_MAIL_QUEUE: Joi.string().required(),
                // email var
                SENDGRID_HOST: Joi.string().required(),
                SENDGRID_PORT: Joi.number().required(),
                SENDGRID_USER: Joi.string().required(),
                SENDGRID_PASS: Joi.string().required(),
            }),
            envFilePath: "./apps/mail/.env",
        }),
        RmqModule,
        AuthModule,
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: configService.get<string>("SENDGRID_HOST"),
                    port: +configService.get<string>("SENDGRID_PORT"),
                    ignoreTLS: true,
                    secure: false,
                    auth: {
                        user: configService.get<string>("SENDGRID_USER"),
                        pass: configService.get<string>("SENDGRID_PASS"),
                    },
                },
                defaults: { from: '"No Reply" <noreply@example.com>' },
                template: {
                    dir: join(__dirname, "/templates"),
                    adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                    options: { strict: true },
                },
            }),
            inject: [ConfigService],
            // useFactory: async () => ({
            //     transport: {
            //         host: "smtp.sendgrid.net",
            //         port: 25,
            //         ignoreTLS: true,
            //         secure: false,
            //         auth: {
            //             user: "apikey",
            //             pass: "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",
            //         },
            //     },
            //     defaults: { from: '"No Reply" <noreply@example.com>' },
            //     template: {
            //         dir: join(__dirname, "/templates"),
            //         adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
            //         options: { strict: true },
            //     },
            // }),
        }),
    ],
    controllers: [MailController],
    providers: [MailService],
})
export class MailModule {}
