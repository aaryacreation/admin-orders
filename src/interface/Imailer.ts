export interface IMailer {
    sendEmail(to: string, product: unknown):void
}