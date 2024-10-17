import { Request, Response } from 'express'

import { CustomError } from '@domain/errors'
import { CreateProductDto, UpdateProductDto } from '@domain/dtos'
import { ProductRepository } from '@domain/repositories'
import { CreateProduct, GetAllProducts, GetProductById, DeleteProduct } from '@domain/use-cases'
import { UpdateProduct } from '@domain/use-cases/products/update-product.use-case'

export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(error)

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createProduct = (req: Request, res: Response) => {
    const [error, productDto] = CreateProductDto.create(req.body)

    if (error) return res.status(400).json({ error })

    new CreateProduct(this.productRepository)
      .execute(productDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getAllProducts = (req: Request, res: Response) => {
    new GetAllProducts(this.productRepository)
      .execute()
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getProductsById = (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) return res.status(400).json({ error: 'Missing required parameter: id' })

    new GetProductById(this.productRepository)
      .execute(id)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  updateProduct = (req: Request, res: Response) => {
    const id = req.params.id
    const [error, productDto] = UpdateProductDto.create(req.body)

    if (error) return res.status(400).json({ error })

    if (!id) return res.status(400).json({ error: 'Missing required parameter: id' })

    new UpdateProduct(this.productRepository)
      .execute(id, productDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  deleteProduct = (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) return res.status(400).json({ error: 'Missing required parameter: id' })

    new DeleteProduct(this.productRepository)
      .execute(id)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
