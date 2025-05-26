// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    const userId = data.user?.id;

    // Optional: store in your DB for profile/custom fields
    await this.usersService.create(userId, email);

    return { message: 'User created with Supabase', userId };
  }

  async login(_: any) {
    // Supabase login happens on frontend (client-side SDK)
    return { message: 'Login via frontend using Supabase client' };
  }

  async validateUser(email: string, pass: string): Promise<null> {
    return null; // Disable for now; Supabase manages auth
  }
}
