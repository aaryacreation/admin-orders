import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { ProductInteractor } from "../interactor/productInteractor";
import { IProductInteractor } from "../interface/IProductInteractor";
import { INTERFACE_TYPE } from "../utils/appConstant";
     
@injectable()
export class ProductController {
  private interactor: IProductInteractor;

  constructor(
    @inject(INTERFACE_TYPE.ProductInteractor) interactor: ProductInteractor){
    this.interactor = interactor;
  }
  async onCreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body, "req.body")
      const body = req.body;
      const data = await this.interactor.createProduct(body);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async onUpdateStock(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const stock = req.body.stock || 0;
      const data = await this.interactor.updateStock(parseInt(productId.toString()), parseInt(stock.toString()));

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async onGetProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit || 0;
      const offset = req.query.offset || 0;

      const data = await this.interactor.getProducts(
        parseFloat(limit.toString()),
        parseInt(offset.toString())
      );

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
