import { ProductEntity } from '@domain/entities'
import { BadRequestException, ErrorCode } from '@domain/errors'

export class ProductMapper {
  static productEntityFromObject(object: { [key: string]: any }) {
    const { id, name, user_id, description, price, images, status, stock, tags } = object

    if (!id) throw new BadRequestException('Missing id', ErrorCode.MISSING_FIELD)
    if (!name) throw new BadRequestException('Missing name', ErrorCode.MISSING_FIELD)
    if (!description) throw new BadRequestException('Missing name', ErrorCode.MISSING_FIELD)
    if (!price) throw new BadRequestException('Missing price', ErrorCode.MISSING_FIELD)
    if (!images) throw new BadRequestException('Missing images', ErrorCode.MISSING_FIELD)
    if (!status) throw new BadRequestException('Missing status', ErrorCode.MISSING_FIELD)
    if (!stock) throw new BadRequestException('Missing stock', ErrorCode.MISSING_FIELD)
    if (!tags) throw new BadRequestException('Missing tags', ErrorCode.MISSING_FIELD)

    return new ProductEntity(id, user_id, name, description, stock, price, status, tags, images)
  }
}
