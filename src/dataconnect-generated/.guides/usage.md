# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createOrganization, getOrganization, listOrganizations, updateOrganization, deleteOrganization, createUser, getUser, listUsers, updateUser, deleteUser } from '@dataconnect/generated';


// Operation CreateOrganization: 
const { data } = await CreateOrganization(dataConnect);

// Operation GetOrganization:  For variables, look at type GetOrganizationVars in ../index.d.ts
const { data } = await GetOrganization(dataConnect, getOrganizationVars);

// Operation ListOrganizations: 
const { data } = await ListOrganizations(dataConnect);

// Operation UpdateOrganization:  For variables, look at type UpdateOrganizationVars in ../index.d.ts
const { data } = await UpdateOrganization(dataConnect, updateOrganizationVars);

// Operation DeleteOrganization:  For variables, look at type DeleteOrganizationVars in ../index.d.ts
const { data } = await DeleteOrganization(dataConnect, deleteOrganizationVars);

// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation GetUser:  For variables, look at type GetUserVars in ../index.d.ts
const { data } = await GetUser(dataConnect, getUserVars);

// Operation ListUsers: 
const { data } = await ListUsers(dataConnect);

// Operation UpdateUser:  For variables, look at type UpdateUserVars in ../index.d.ts
const { data } = await UpdateUser(dataConnect, updateUserVars);

// Operation DeleteUser:  For variables, look at type DeleteUserVars in ../index.d.ts
const { data } = await DeleteUser(dataConnect, deleteUserVars);


```