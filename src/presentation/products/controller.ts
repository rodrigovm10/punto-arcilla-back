import { Request, Response } from 'express'

import { CustomError } from '@domain/errors'
import { CreateProductDto, UpdateProductDto } from '@domain/dtos'
import { ProductRepository } from '@domain/repositories'
import {
  CreateProduct,
  GetAllProducts,
  GetProductById,
  DeleteProduct,
  UpdateProduct
} from '@domain/use-cases'

export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  // private helperImg = (filePath: string, fileName: string, size = 300) => {
  //   const outputDir = path.join(__dirname, 'optimize/') // Ruta de la carpeta de salida
  //   const outputPath = path.join(outputDir, `${fileName}.avif`) // Ruta completa del archivo
  //   console.log(outputPath)
  //   if (!fs.existsSync(outputDir)) {
  //     fs.mkdirSync(outputDir, { recursive: true })
  //   }

  //   sharp(filePath).resize(size).toFile(outputPath)
  //   return outputPath.split('\\').pop()
  // }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(error)

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createProduct = (req: Request, res: Response) => {
    // console.log(req.body.images)
    const files = req.body.images

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No se subieron imágenes.' })
    }
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
