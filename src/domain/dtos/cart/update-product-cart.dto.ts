export class UpdateProductCartDto {
  private constructor(public quantity: number) {}

  static create(object: { [key: string]: any }): [string?, UpdateProductCartDto?] {
    const { quantity } = object

    if (!quantity) return ['Missing quantity']

    return [undefined, new UpdateProductCartDto(quantity)]
  }
}
