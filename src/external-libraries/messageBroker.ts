import { injectable } from "inversify";
import { ImessageBroker } from "../interface/ImessageBroker";

@injectable()
export class MessageBroker implements ImessageBroker {
    NotifyPromotionService(product: unknown) {
        
        console.log("notification service")
        return true
    }
}