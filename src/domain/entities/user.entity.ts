export class User {
  constructor(
    public id: string,
    public email: string,
    public username: string,
    public password: string,
    public role: string,
    public avatar?: string,
    public business_description?: string
  ) {}
}
