import { CustomError } from '@domain/errors'
import { UserEntity } from '@domain/entities'

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, email, password, role } = object

    if (!id) throw CustomError.badRequest('Missing ID')
    if (!password) throw CustomError.badRequest('Missing password')
    if (!role) throw CustomError.badRequest('Missing role')

    return new UserEntity(id, email, password, role)
  }
}
