import { RmqService } from "@app/common"
import { NestFactory } from "@nestjs/core"
import { MailModule } from "./mail.module"

async function bootstrap() {
    const app = await NestFactory.create(MailModule)
    const rmqService = app.get<RmqService>(RmqService)
    app.connectMicroservice(rmqService.getOptions("MAIL"))
    await app.startAllMicroservices()
}
bootstrap()
