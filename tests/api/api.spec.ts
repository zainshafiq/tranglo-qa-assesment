import { test, expect } from '@playwright/test';

test('API create post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/');
    expect(response.status()).toBe(200);

    const postResponse = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'My first post',
            body: 'This is the content of my first post.',
            userId: 1,
        },
    });
    expect(postResponse.status()).toBe(201);

    const responseBody= await postResponse.json();
    console.log('Created Post:', responseBody);
});