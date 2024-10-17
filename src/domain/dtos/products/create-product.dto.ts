export class CreateProductDto {
  private constructor(
    public user_id: string,
    public name: string,
    public description: string,
    public stock: number,
    public price: number,
    public status: boolean,
    public tags: string[],
    public images: string[]
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { user_id, name, description, stock, price, status, tags, images } = object

    if (!user_id) return ['Missing user_id']
    if (!name) return ['Missing name']
    if (!description) return ['Missing description']
    if (!stock) return ['Missing stock']
    if (stock === 0) return ['The stock can not be 0']
    if (!price) return ['Missing price']
    if (!status) return ['Missing status']
    if (!tags) return ['Missing tags']
    if (!images) return ['Missing images']

    return [
      undefined,
      new CreateProductDto(user_id, name, description, stock, price, status, tags, images)
    ]
  }
}
