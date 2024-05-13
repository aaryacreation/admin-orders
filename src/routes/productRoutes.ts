import express from "express";
import { Container } from "inversify";
import { ProductController } from "../controllers/ProductController";
import { Mailer } from "../external-libraries/mailer";
import { MessageBroker } from "../external-libraries/messageBroker";
import { ProductInteractor } from "../interactor/productInteractor";
import { IMailer } from "../interface/Imailer";
import { ImessageBroker } from "../interface/ImessageBroker";
import { IProductInteractor } from "../interface/IProductInteractor";
import { IProductRepository } from "../interface/IProductRepository";
import { ProductRepostitories } from "../repositories/ProductRepositories";
import { INTERFACE_TYPE } from "../utils/appConstant";

const container = new Container()

container.bind<IProductRepository>(INTERFACE_TYPE.ProductRepository).to(ProductRepostitories)
container.bind<IProductInteractor>(INTERFACE_TYPE.ProductInteractor).to(ProductInteractor)
container.bind<IMailer>(INTERFACE_TYPE.Mailer).to(Mailer)
container.bind<ImessageBroker>(INTERFACE_TYPE.MessageBroker).to(MessageBroker)
container.bind(INTERFACE_TYPE.ProductController).to(ProductController)

const router = express.Router();
const controller =container.get<ProductController>(INTERFACE_TYPE.ProductController)

router.post("/products", controller.onCreateProduct.bind(controller));

router.get("/products", controller.onGetProducts.bind(controller));

router.patch("/products/:id", controller.onUpdateStock.bind(controller));

export default router;
