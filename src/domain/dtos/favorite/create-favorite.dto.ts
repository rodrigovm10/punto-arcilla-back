export class CreateFavoriteDto {
  private constructor(public user_id: string, public product_id: string) {}

  static create(object: { [key: string]: any }): [string?, CreateFavoriteDto?] {
    const { user_id, product_id } = object

    if (!user_id) return ['Missing userId']
    if (!product_id) return ['Missing productId']

    return [undefined, new CreateFavoriteDto(user_id, product_id)]
  }
}
