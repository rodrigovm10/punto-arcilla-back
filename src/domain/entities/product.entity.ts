export class ProductEntity {
  constructor(
    public id: string,
    public user_id: string,
    public name: string,
    public description: string,
    public stock: number,
    public price: number,
    public status: boolean,
    public tags: string[],
    public images: string[]
  ) {}
}

export class ProductUpdatedEntity {
  constructor(
    public id: string,
    public user_id: string,
    public name?: string,
    public description?: string,
    public stock?: number,
    public price?: number,
    public status?: boolean,
    public tags?: string[],
    public images?: string[]
  ) {}
}
