export class UpdateProductDto {
  private constructor(
    public name?: string,
    public description?: string,
    public stock?: number,
    public price?: number,
    public status?: boolean,
    public tags?: string[],
    public images?: string[]
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateProductDto?] {
    const { name, description, stock, price, status, tags, images } = object

    if (name && !name) return ['Name can not be undefined']

    return [undefined, new UpdateProductDto(name, description, stock, price, status, tags, images)]
  }
}
