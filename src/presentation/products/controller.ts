import { NextFunction, Request, Response } from 'express'

import { CreateProductDto } from '@domain/dtos'
import { ErrorCode, UnprocessableEntity } from '@domain/errors'
import { ProductRepository } from '@domain/repositories'
import { CreateProduct, GetAllProducts } from '@domain/use-cases'

export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  createProduct = (req: Request, res: Response, next: NextFunction) => {
    const [error, productDto] = CreateProductDto.create(req.body)

    if (error)
      next(new UnprocessableEntity(error, 'Unprocessable entity', ErrorCode.UNPROCESSABLE_ENTITY))

    new CreateProduct(this.productRepository)
      .execute(productDto!)
      .then(data => res.json(data))
      .catch(error => next(error))
  }

  getAllProducts = (req: Request, res: Response, next: NextFunction) => {
    new GetAllProducts(this.productRepository)
      .execute()
      .then(data => res.json(data))
      .catch(error => next(error))
  }
}
