POST

Entities

    Users
    Posts
    Comments

APIS Required

    Create
    Read
    Update
    Delete

    http://localhost:3000
    users

        GET: /users/
        POST: /users/
        DELETE: /users/:userid
        PUT: /users/:userid
    
    posts
        GET /posts/
        GET /posts/:postid
        POST /posts/
        DELETE /posts/:postid
        PUT /posts/:postid

        GET /posts/:postid/comments
        POST /posts/:postid/comments
        DELETE /posts/:postid/comments/:commentid
        PUT /posts/:postid/comments/:commentid
        

        

