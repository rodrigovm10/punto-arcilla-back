export class UpdateProductDto {
  private constructor(
    public name?: string,
    public description?: string,
    public stock?: number,
    public price?: number,
    public status?: boolean,
    public tags?: string[],
    public images?: string[],
    public imagesToDelete?: string[],
    public tagsToDelete?: string[]
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateProductDto?] {
    const { name, description, stock, price, status, tags, images, imagesToDelete, tagsToDelete } =
      object

    return [
      undefined,
      new UpdateProductDto(
        name,
        description,
        stock,
        price,
        status,
        tags,
        images,
        imagesToDelete,
        tagsToDelete
      )
    ]
  }
}
