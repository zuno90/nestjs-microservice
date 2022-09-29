import { Injectable, Logger } from "@nestjs/common"

@Injectable()
export class BillingService {
    private readonly logger = new Logger(BillingService.name)

    getHello(): string {
        return "Hello World from billing service!"
    }

    bill(data: any) {
        this.logger.log("Billing... is", data)
    }
}

