# **List of public endpoints**:

## 1. ENDPOINTS USERS:

◾ **[POST]/user/register** - It receives information from users at their register.

    STATUS 201

◾ **[POST]/user/login** - It receives information from users to ckeck if their account has been created at the database.

    STATUS 200

## 2. ENDPOINTS POSTS:

◾ **[GET]/posts** - Returns an array with all Posts that has been created.

    STATUS: 200

◾ **[GET]/posts/:idPost** - Returns an object with the selected Post.

    STATUS: 200

◾ **[POST]/posts/create** - Receives a Post object without id to can create it in the database and returns the same object with id created.

    STATUS: 201

◾ **[PUT]/posts/update** - Receives a Post object where can make modifications to the database with the same id and returns the modified target object.

    STATUS: 201

◾ **[DELETE]/posts/delete/:idDestino** - Removes the Post by id from the database and returns the deleted id.

    STATUS: 200

# STATUS ERRORS:

**400** - Bad Request.

**401** - Unauthorized.

**403** - Forbbiden.

**404** - Not found.

**409** - Conflicts.

**500** - Internal Server Error.
