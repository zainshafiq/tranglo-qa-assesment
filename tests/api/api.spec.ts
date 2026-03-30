import { test, expect, APIRequestContext } from '@playwright/test';

test('API create post', async ({ request }) => {
    const postId = await createPost(request);
    console.log('\nPassed Post ID:', postId, '\n');
});

async function createPost(request: APIRequestContext) {
    const firstPost = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'My first post',
            body: 'This is the content of my first post.',
            userId: 1,
        },
    });

    // Assert that the status code is 201 (Created) and log the response body
    expect(firstPost.status()).toBe(201);
    const responseBody = await firstPost.json();
    console.log('\nCreate Post Response:', responseBody);
    
    // Capture the id from the response to use in all subsequent steps
    const postId = responseBody.id;
    // console.log('Created Post ID:', postId);

    return postId;
}