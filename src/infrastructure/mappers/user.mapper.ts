import { BadRequestException, CustomError, ErrorCode } from '@domain/errors'
import { User } from '@domain/entities'

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, name, email, password, role } = object

    if (!id) throw new BadRequestException('Missing id', ErrorCode.MISSING_FIELD)
    if (!name) throw new BadRequestException('Missing name', ErrorCode.MISSING_FIELD)
    if (!password) throw new BadRequestException('Missing password', ErrorCode.MISSING_FIELD)
    if (!role) throw new BadRequestException('Missing role', ErrorCode.MISSING_FIELD)

    return new User(id, name, email, password, role)
  }
}
