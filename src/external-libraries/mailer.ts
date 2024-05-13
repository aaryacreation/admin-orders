import { injectable } from "inversify";
import { IMailer } from "../interface/Imailer";

@injectable()
export class Mailer implements IMailer {
    sendEmail(to: string, product: unknown) {
        console.log("sending email")
        return true
    }

}