export interface IProductInteractor {
    createProduct(input: any): unknown
    updateStock(id: number, stock: number): unknown
    getProducts(limit: number, offset: number ): unknown
    getProduct(id: number): unknown
}