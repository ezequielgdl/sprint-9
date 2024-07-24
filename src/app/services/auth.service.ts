// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
// import { environment } from '../../environments/environment';
import { Contact, Evento, Member } from '../interface';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      'https://urwoyvvnhifonnlijugv.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyd295dnZuaGlmb25ubGlqdWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5MDkxNTgsImV4cCI6MjAzNTQ4NTE1OH0.mERmdT3gfd-KXDGdPcyBz865OePuBCEgbQl8CYpSQCE'
    );
  }

  // CRUD

  async getMembers() {
    const { data, error } = await this.supabaseClient.from('members').select();

    if (error) {
      console.error('Error fetching members:', error.message);
      return [];
    }
    return data;
  }

  async getEvents(category: string) {
    const { data, error } = await this.supabaseClient
      .from('events')
      .select()
      .eq('category', category);

    if (error) {
      console.error('Error fetching events', error.message);
      return [];
    }
    return data;
  }

  async getById(id: string, category: string) {
    const { data, error } = await this.supabaseClient
      .from(category)
      .select()
      .eq('id', id);

    if (error) {
      console.error('Error', error);
      return error.message;
    }
    return data;
  }

  async delete(table: string, id: number, bucket: string, column: string) {
    try {
      console.log(
        `Fetching record from table: ${table}, id: ${id}, column: ${column}`
      );

      const { data: record, error } = await this.supabaseClient
        .from(table)
        .select(column)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching record:', error.message);
        return { error };
      }

      if (!record) {
        console.error(`Record with ID ${id} not found.`);
        return { error: { message: `Record with ID ${id} not found.` } };
      }

      console.log('Record fetched:', record);

      const url = (record as { [key: string]: any })[column];
      if (url) {
        const filename = url.split('/').pop();
        if (filename) {
          console.log(`Deleting file: ${filename} from bucket: ${bucket}`);

          const { data: deleteData, error: deleteError } =
            await this.supabaseClient.storage.from(bucket).remove([filename]);

          if (deleteError) {
            console.error('Error deleting file:', deleteError.message);
            return { error: deleteError };
          }

          console.log('File deleted:', deleteData);
        } else {
          console.error(`Failed to extract filename from URL: ${url}`);
        }
      } else {
        console.log(
          `Column ${column} is empty in record, skipping file deletion.`
        );
      }

      const { data: deleteRecord, error: deleteRecordError } =
        await this.supabaseClient.from(table).delete().eq('id', id);

      if (deleteRecordError) {
        console.error('Error deleting record:', deleteRecordError.message);
        return { error: deleteRecordError };
      }

      console.log('Record deleted:', deleteRecord);
      return { data: deleteRecord };
    } catch (err) {
      console.error('Unexpected error:', err);
      return { error: err };
    }
  }

  async createMember(member: Member) {
    const { data, error } = await this.supabaseClient
      .from('members')
      .insert(member)
      .select();
    if (error) {
      console.error('Error', error);
      return error.message;
    }
    return data;
  }

  async createContact(contact: Contact) {
    const response = await this.supabaseClient.from('contacts').insert(contact);
    return response;
  }

  async createEvent(event: Evento) {
    const { data, error } = await this.supabaseClient
      .from('events')
      .insert(event);
    if (error) {
      console.error('Error', error);
      return error.message;
    }
    return data;
  }

  async update(data: any, id: string, category: string) {
    const { error } = await this.supabaseClient
      .from(category)
      .update(data)
      .eq('id', id);
    if (error) {
      console.error('Error', error);
      return error.message;
    }
    return data;
  }

  async uploadImage(fileName: string, file: File, bucket: string) {
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .upload(fileName, file, {
        upsert: true,
      });

    if (error) {
      return { error };
    }
    const { data: publicUrl } = this.supabaseClient.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return { data: publicUrl.publicUrl, error: null };
  }

  // AUTH

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
