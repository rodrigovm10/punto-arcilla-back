import { Request, Response } from 'express'

import { CustomError } from '@domain/errors'
import { CreateProductDto } from '@domain/dtos'
import { ProductRepository } from '@domain/repositories'
import { CreateProduct, GetAllProducts } from '@domain/use-cases'

export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

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
}
