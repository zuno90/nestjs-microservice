import { Injectable, Logger } from "@nestjs/common"

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name)

    getHello(): string {
        return "Hello World from mail service!"
    }

    sendMailOrdered(data: any) {
        this.logger.log("Order successfully, mail will be transfered to", data)

        // action to send mail
    }
}
