import type { APIRequestContext } from "@playwright/test";
import { config } from "../config/apiconfig.ts";

export class GetapiPage{
    readonly getapiUrl: string;

    constructor(){
        this.getapiUrl = config.apigetUrl;
    }
async getuserwithget(request: APIRequestContext){
    const response = await request.get(this.getapiUrl, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
    }
}