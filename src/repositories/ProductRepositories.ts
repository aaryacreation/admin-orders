import { id, injectable } from "inversify";
import { Pool } from "pg";
// import { pgClient } from "../dbConnection";
import db from "../dbConnection"
import { Product } from "../entities/Product";
import { IProductRepository } from "../interface/IProductRepository";
import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({  
}, { strict: false });

const Order = mongoose.model('Order', orderSchema);

@injectable()
export class ProductRepostitories implements IProductRepository {
  private client: any;
  private db: any;
  // private client: Pool;

  constructor() {
    this.db = db;
    this.client = Order;
  }

  // async create(data: Product): Promise<Product> {
  async create(data: any): Promise<Product> {
    await this.db();
    data.createdAt = new Date();
    const product = await this.client.create(data)
    return product;
    // const product = await this.client.query(
    //   `INSERT INTO products (name,description,price,stock) VALUES ($1,$2,$3,$4) RETURNING *`,
    //   [data.name, data.description, data.price, data.stock]
    // );
    // return product.rows[0];
  }
  async update(id: number, stock: number): Promise<Product> {
    const product = await this.client.query(
      `UPDATE products SET stock=$1 WHERE id=$2 RETURNING *`,
      [stock, id]
    );
    return product.rows[0];
  }

  async find(limit: number, offset: number): Promise<any> {
    await this.db();
    const orders:any = await this.client.find({})
    return orders;
    // return [{a:1}];
    // const products = await this.client.find().skip(offset).limit(limit);
    // return products;
    // const products = await this.client.query(`SELECT * FROM products OFFSET $1 LIMIT $2`, [offset, limit]);
    // return products.rows;
  }
}
