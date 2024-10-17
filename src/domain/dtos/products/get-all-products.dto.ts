export class GetProductsDto {
  private constructor(
    public id: string,
    public name: string,
    public description: string,
    public stock: number,
    public price: number,
    public status: boolean,
    public tags: string[],
    public images: string[]
  ) {}

  static getProducts(object: { [key: string]: any }): [string?, GetProductsDto?] {
    const { id, name, description, stock, price, status, tags, images } = object

    if (!id) return ['Missing id']
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
      new GetProductsDto(id, name, description, stock, price, status, tags, images)
    ]
  }
}
