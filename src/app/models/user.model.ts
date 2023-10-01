import { Role } from './role.model';

export class User {
  constructor(
    public sifraradnika?: number,
    public email?: string,
    public role?: Role
  ) {}

  get roleString(): string | undefined {
    return this.role !== undefined ? Role[this.role] : undefined;
  }
}
