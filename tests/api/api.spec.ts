import { test, expect, APIRequestContext } from '@playwright/test';

test('user can perform API CRUD operations successfully', async ({ request }) => {
    // ---------------- CREATE ----------------
    const postId = await createPost(request);
    console.log('\nPassed Post ID:', postId, '\n'); // postId logged = 101
    
    /* ---------------- READ (existing resource) ----------------
    JSONPlaceholder does not persist POST (postId = 101) data,
    so a static ID (10) is used for GET and PUT validation
    */
    await getPost(request, 10);

    // ---------------- UPDATE ----------------
    await updatePost(request, 10);

    // ---------------- Verify Update ----------------
    await verifyUpdatedPost(request, 10);

    // Delete the post using the captured post ID (101)
    // 
    await deletePost(request, postId);

    // ---------------- Verify Deletion ----------------
    await validateDeletedPost(request, postId);
});

async function createPost(request: APIRequestContext) {
    const firstPost = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'My first post',
            body: 'This is the content of my first post.',
            userId: 99,
        },
    });

    // Assert that the status code is 201 (Created) and log the status
    expect(firstPost.status()).toBe(201);
    console.log('Create Post Status [Expected 201 for successful creation]:', firstPost.status());

    // Log the response body to see the created post details
    const responseBody = await firstPost.json();
    console.log('\nCreate Post Response [Expected new post data]:', responseBody);
    
    // Capture the id from the response to use in all subsequent steps
    const postId = responseBody.id;
    // console.log('Created Post ID:', postId);

    return postId;
}

async function getPost(request: APIRequestContext, postId: number) {
    const getResponse = await request.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    
    // Assert that the status code is 200 (OK) and log the status
    expect(getResponse.status()).toBe(200);
    console.log('Get Post Status [Expected 200 for successful retrieval]:', getResponse.status());

    // Log the response body to see the retrieved post details
    const postData = await getResponse.json();
    console.log('\nGet Post Response [Expected existing data]:', postData);

    // Assert that the retrieved post data matches the expected values
    expect(postData.id).toBe(postId);

    return postData;
}

async function updatePost(request: APIRequestContext, postId: number) {
    const updateResponse = await request.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        data: {
            title: 'Now we changing the title',
            body: 'We also changing the content existing in the body.',
            userId: 99,
        },
    });

    // Assert that the status code is 200 (OK) and log the status
    expect(updateResponse.status()).toBe(200);
    console.log('Update Post Status [Expected 200 for successful update]:', updateResponse.status());

    // Log the response body to see the updated post details
    const updatedPostData = await updateResponse.json();
    console.log('\nUpdate Post Response [Expected new updated data]:', updatedPostData);

    // Assert that the retrieved updated post data matches the expected values
    expect(updatedPostData.title).toBe('Now we changing the title');
    expect(updatedPostData.body).toBe('We also changing the content existing in the body.');

    return updatedPostData;
};

async function verifyUpdatedPost(request: APIRequestContext, postId: number) {
    const getUpdatedResponse = await request.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    
    // Assert that the status code is 200 (OK) and log the status
    expect(getUpdatedResponse.status()).toBe(200);
    console.log('Get Updated Post Status [Expected 200 for successful update]:', getUpdatedResponse.status());

    // Log the response body to see the retrieved updated post details
    const updatedPostData = await getUpdatedResponse.json();
    console.log('\nGet Updated Post Response [Expected new updated data, but original data persist due to API limitation]:', updatedPostData);

    // Assert that the retrieved post data matches the expected values
    expect(updatedPostData.id).toBe(postId);

    return updatedPostData;
}

async function deletePost(request: APIRequestContext, postId: number) {
    const deleteResponse = await request.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    
    // Assert that the status code is 200 (OK) and log the status
    expect(deleteResponse.status()).toBe(200);
    console.log('Delete Post Status [Expected 200 for successful deletion]:', deleteResponse.status());

    // Log the response body to see the delete response details
    expect(deleteResponse.ok()).toBeTruthy();

    return deleteResponse;
};

async function validateDeletedPost(request: APIRequestContext, postId: number) {
    const getDeletedResponse = await request.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    
    /* JSONPlaceholder does not persist POST or DELETE operations,
    Since postId (e.g., 101) was never actually stored, GET returns 404.*/
    expect(getDeletedResponse.status()).toBe(404); 
    console.log('Get Deleted Post Status [Expected 404 due to resources never existing]:', getDeletedResponse.status());

    // Log the response body to see the retrieved deleted post details
    const deletedPostData = await getDeletedResponse.json();
    console.log('\nGet Deleted Post Response: [Expected empty object {}]', deletedPostData);

    return deletedPostData;
}