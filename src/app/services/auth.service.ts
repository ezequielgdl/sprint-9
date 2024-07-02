// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async isLoggedIn(): Promise<User | null> {
    try {
      console.log('Checking if user is logged in...');
      const response = await this.supabaseClient.auth.getUser();
      console.log('Response from Supabase:', response);
      if (
        response.error &&
        response.error.message === 'Auth session missing!'
      ) {
        // Handle session missing error gracefully
        console.log('Auth session missing or expired.');
        return null;
      }
      return response.data?.user ?? null;
    } catch (error) {
      console.error('Error checking login status:', error);
      return null;
    }
  }
}
