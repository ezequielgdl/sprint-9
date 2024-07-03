// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async getMembers() {
    const { data, error } = await this.supabaseClient.from('members').select();

    if (error) {
      console.error('Error fetching members:', error.message);
      return [];
    }
    return data;
  }

  async getEvents() {
    const { data, error } = await this.supabaseClient.from('events').select();

    if (error) {
      console.error('Error fetching events', error.message);
      return [];
    }
    return data;
  }

  async isLoggedIn(): Promise<User | null> {
    try {
      const response = await this.supabaseClient.auth.getUser();
      if (
        response.error &&
        response.error.message === 'Auth session missing!'
      ) {
        return null;
      }
      return response.data?.user ?? null;
    } catch (error) {
      return null;
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const { data, error } = await this.supabaseClient.auth.signInWithPassword(
        { email, password }
      );
      if (error) {
        return null;
      }
      return data.user ?? null;
    } catch (error) {
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      const { error } = await this.supabaseClient.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
}
