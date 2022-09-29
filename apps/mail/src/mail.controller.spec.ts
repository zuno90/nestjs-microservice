import { Test, TestingModule } from "@nestjs/testing"
import { MailController } from "./mail.controller"
import { MailService } from "./mail.service"

describe("MailController", () => {
    let mailController: MailController

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [MailController],
            providers: [MailService],
        }).compile()

        mailController = app.get<MailController>(MailController)
    })

    describe("root", () => {
        it('should return "Hello World!"', () => {
            expect(mailController.getHello()).toBe("Hello World!")
        })
    })
})
