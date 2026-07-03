declare const process: { env: { Base_URL?: string } };

export const config = {
    baseUrl: process.env.Base_URL || 'https://automationexercise.com',
}