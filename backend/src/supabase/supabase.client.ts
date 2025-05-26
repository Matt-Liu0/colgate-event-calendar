import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient;

@Injectable()
export class SupabaseService {
  public readonly client: SupabaseClient;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!url || !key) {
      throw new Error('Missing Supabase environment variables.');
    }

    this.client = createClient(url, key);
    supabase = this.client;
  }
}

export { supabase };
