export class CreateUserDto {
  readonly email: string;     // for Supabase Auth
  readonly password: string;  // for Supabase Auth
  readonly username?: string; // optional, for your own DB
}
