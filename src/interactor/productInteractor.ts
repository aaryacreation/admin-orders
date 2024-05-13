import { inject, injectable } from "inversify";
import { IMailer } from "../interface/Imailer";
import { ImessageBroker } from "../interface/ImessageBroker";
import { IProductInteractor } from "../interface/IProductInteractor";
import { IProductRepository } from "../interface/IProductRepository";
import { INTERFACE_TYPE } from "../utils/appConstant";

@injectable()
export class ProductInteractor implements IProductInteractor {
  private repository: IProductRepository;
  private mailer: IMailer;
  private broker: ImessageBroker;

  constructor(
    @inject(INTERFACE_TYPE.ProductRepository) repository: IProductRepository,
    @inject(INTERFACE_TYPE.Mailer) mailer: IMailer,
    @inject(INTERFACE_TYPE.MessageBroker) broker: ImessageBroker
  ) {
    this.repository = repository;
    this.mailer = mailer;
    this.broker = broker;
  }
  async createProduct(input: any) {
    const data = await this.repository.create(input);

    //send notification
    await this.broker.NotifyPromotionService(data);
    return data;
  }
  async updateStock(id: number, stock: number) {
    const data = await this.repository.update(id, stock);

    //email
    await this.mailer.sendEmail("someone@mail.co", data);
    return data;
  }
  getProducts(limit: number, offset: number) {
    return this.repository.find(limit, offset);
  }
  getProduct(id: number) {
    throw new Error("Method not implemented.");
  }
}
