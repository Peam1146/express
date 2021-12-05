export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id = 0,
    email = "",
    password = "",
    name = "",
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toString(): string {
    return `User { id: ${this.id}, email: ${this.email}, password: ${this.password}, name: ${this.name}, createdAt: ${this.createdAt}, updatedAt: ${this.updatedAt} }`;
  }

  public toJson(): string {
    return JSON.stringify(this);
  }
}
