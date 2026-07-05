import { test, expect } from '@playwright/test';
import { PostApiPage } from '../Pages/Post_Api.ts';
import { GetapiPage } from '../Pages/Get_Api.ts';
import { UpdateApiPage } from '../Pages/Update_Api.ts';
import { apiTestData } from '../testdata.ts/apipostdata.ts';

test.describe.configure({ mode: 'serial' });

let userId: string;

test('TC1: Verify POST API request', async ({ request }) => {
  const apiPage = new PostApiPage();

  const response = await apiPage.createuserwithpost(
    request,
    apiTestData.createUser
  );

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  userId = responseBody.id;

  console.log('URL:', apiPage.apiUrl);
  console.log('Status:', response.status());
  console.log('Status Text:', response.statusText());
  console.log('Response Body:', responseBody);
  console.log('Dynamic User ID:', userId);

  expect(responseBody.name).toBe(
    apiTestData.createUser.name
  );

  expect(responseBody.skills).toBe(
    apiTestData.createUser.skills
  );

  expect(responseBody.role).toBe(
    apiTestData.createUser.role
  );

  expect(responseBody.id).toBeTruthy();

  console.log(JSON.stringify(responseBody, null, 2));
});

test('TC2: Verify Get All Users request', async ({ request }) => {
  const apiPage = new GetapiPage();

  const response = await apiPage.getuserwithget(request);

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log('URL:', apiPage.getapiUrl);
  console.log('Status:', response.status());
  console.log('Status Text:', response.statusText());
  console.log('Response Body:', responseBody);

  expect(Array.isArray(responseBody)).toBeTruthy();
});

test('TC3: Verify Update request', async ({ request }) => {
  const apiPage = new UpdateApiPage();

  const response =
    await apiPage.updateuserwithput(
      request,
      userId,
      apiTestData.updateUser
    );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log('URL:', `${apiPage.updateapiUrl}/${userId}`);
  console.log('Status:', response.status());
  console.log('Status Text:', response.statusText());
  console.log('Response Body:', responseBody);

  expect(responseBody.id).toBe(userId);

  expect(responseBody.name).toBe(
    apiTestData.updateUser.name
  );

  expect(responseBody.skills).toBe(
    apiTestData.updateUser.skills
  );

  expect(responseBody.role).toBe(
    apiTestData.updateUser.role
  );

  console.log(JSON.stringify(responseBody, null, 2));
});

test('TC4: Verify updated data', async ({ request }) => {
  const apiPage = new GetapiPage();

  const response = await request.get(
    `${apiPage.getapiUrl}/${userId}`
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log(
    'URL:',
    `${apiPage.getapiUrl}/${userId}`
  );

  console.log('Status:', response.status());
  console.log('Status Text:', response.statusText());
  console.log('Response Body:', responseBody);

  expect(responseBody.id).toBe(userId);

  expect(responseBody.name).toBe(
    apiTestData.updateUser.name
  );

  expect(responseBody.skills).toBe(
    apiTestData.updateUser.skills
  );

  expect(responseBody.role).toBe(
    apiTestData.updateUser.role
  );

  console.log(JSON.stringify(responseBody, null, 2));
});