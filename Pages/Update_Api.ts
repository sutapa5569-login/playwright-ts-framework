import type { APIRequestContext } from '@playwright/test';
import { config } from '../config/apiconfig.ts';

export class UpdateApiPage {
  readonly updateapiUrl: string;

  constructor() {
    this.updateapiUrl = config.apiUpdateUrl;
  }

  async updateuserwithput(
    request: APIRequestContext,
    userId: string,
    userData: any
  ) {
    const response = await request.put(
      `${this.updateapiUrl}/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        data: userData,
      }
    );

    return response;
  }
}