import { Injectable, Inject, Logger } from "@nestjs/common"
import { MailerService } from "@nestjs-modules/mailer"

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name)
    constructor(private readonly mailerService: MailerService) {}

    getHello(): string {
        return "Hello World from mail service!"
    }

    async sendMailOrdered(data: any) {
        this.logger.log("Order successfully, mail will be transfered to", data)

        // action to send mail
        await this.mailerService.sendMail({
            to: data.user.email, // change with data.user.email
            subject: "Mail test from nestjs",
            template: "./test",
            context: {
                name: "ZUNO",
                url: "https://tinhte.vn",
            },
        })

        // update status
    }
}
