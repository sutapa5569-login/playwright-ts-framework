import type { APIRequestContext } from '@playwright/test';
import { config } from '../config/apiconfig.ts';

export class PostApiPage {
  readonly apiUrl: string;
  //readonly token: string;

  constructor() {
    this.apiUrl = config.apiUrl;
    //this.token = config.token;
  }

  async createuserwithpost(request: APIRequestContext,userData: any) {
    const response = await request.post(this.apiUrl, {
      headers: {
        
        //'x-api-key': this.token,
        'Content-Type': 'application/json',
      },
      data: userData,
    });

    return response;
  }
}