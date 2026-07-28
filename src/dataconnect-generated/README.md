# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetOrganization*](#getorganization)
  - [*ListOrganizations*](#listorganizations)
  - [*GetUser*](#getuser)
  - [*ListUsers*](#listusers)
  - [*GetTicket*](#getticket)
  - [*ListTickets*](#listtickets)
  - [*GetMessage*](#getmessage)
  - [*ListMessages*](#listmessages)
  - [*GetWidget*](#getwidget)
  - [*ListWidgets*](#listwidgets)
- [**Mutations**](#mutations)
  - [*CreateOrganization*](#createorganization)
  - [*UpdateOrganization*](#updateorganization)
  - [*DeleteOrganization*](#deleteorganization)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateTicket*](#createticket)
  - [*UpdateTicket*](#updateticket)
  - [*DeleteTicket*](#deleteticket)
  - [*CreateMessage*](#createmessage)
  - [*UpdateMessage*](#updatemessage)
  - [*DeleteMessage*](#deletemessage)
  - [*CreateWidget*](#createwidget)
  - [*UpdateWidget*](#updatewidget)
  - [*DeleteWidget*](#deletewidget)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetOrganization
You can execute the `GetOrganization` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getOrganization(vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface GetOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
}
export const getOrganizationRef: GetOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface GetOrganizationRef {
  ...
  (dc: DataConnect, vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
}
export const getOrganizationRef: GetOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrganizationRef:
```typescript
const name = getOrganizationRef.operationName;
console.log(name);
```

### Variables
The `GetOrganization` query requires an argument of type `GetOrganizationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrganizationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrganization` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrganizationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOrganizationData {
  organization?: {
    name: string;
    subscriptionTier: string;
  };
}
```
### Using `GetOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrganization, GetOrganizationVariables } from '@dataconnect/generated';

// The `GetOrganization` query requires an argument of type `GetOrganizationVariables`:
const getOrganizationVars: GetOrganizationVariables = {
  id: ..., 
};

// Call the `getOrganization()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrganization(getOrganizationVars);
// Variables can be defined inline as well.
const { data } = await getOrganization({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrganization(dataConnect, getOrganizationVars);

console.log(data.organization);

// Or, you can use the `Promise` API.
getOrganization(getOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization);
});
```

### Using `GetOrganization`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrganizationRef, GetOrganizationVariables } from '@dataconnect/generated';

// The `GetOrganization` query requires an argument of type `GetOrganizationVariables`:
const getOrganizationVars: GetOrganizationVariables = {
  id: ..., 
};

// Call the `getOrganizationRef()` function to get a reference to the query.
const ref = getOrganizationRef(getOrganizationVars);
// Variables can be defined inline as well.
const ref = getOrganizationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrganizationRef(dataConnect, getOrganizationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organization);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organization);
});
```

## ListOrganizations
You can execute the `ListOrganizations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listOrganizations(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;

interface ListOrganizationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsData, undefined>;
}
export const listOrganizationsRef: ListOrganizationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrganizations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;

interface ListOrganizationsRef {
  ...
  (dc: DataConnect): QueryRef<ListOrganizationsData, undefined>;
}
export const listOrganizationsRef: ListOrganizationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrganizationsRef:
```typescript
const name = listOrganizationsRef.operationName;
console.log(name);
```

### Variables
The `ListOrganizations` query has no variables.
### Return Type
Recall that executing the `ListOrganizations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrganizationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOrganizationsData {
  organizations: ({
    id: UUIDString;
    name: string;
  } & Organization_Key)[];
}
```
### Using `ListOrganizations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrganizations } from '@dataconnect/generated';


// Call the `listOrganizations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrganizations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrganizations(dataConnect);

console.log(data.organizations);

// Or, you can use the `Promise` API.
listOrganizations().then((response) => {
  const data = response.data;
  console.log(data.organizations);
});
```

### Using `ListOrganizations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrganizationsRef } from '@dataconnect/generated';


// Call the `listOrganizationsRef()` function to get a reference to the query.
const ref = listOrganizationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrganizationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizations);
});
```

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query requires an argument of type `GetUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    email: string;
    displayName?: string | null;
  };
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser, GetUserVariables } from '@dataconnect/generated';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser(getUserVars);
// Variables can be defined inline as well.
const { data } = await getUser({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect, getUserVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser(getUserVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef, GetUserVariables } from '@dataconnect/generated';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef(getUserVars);
// Variables can be defined inline as well.
const ref = getUserRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect, getUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    email: string;
    role: string;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetTicket
You can execute the `GetTicket` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTicket(vars: GetTicketVariables, options?: ExecuteQueryOptions): QueryPromise<GetTicketData, GetTicketVariables>;

interface GetTicketRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTicketVariables): QueryRef<GetTicketData, GetTicketVariables>;
}
export const getTicketRef: GetTicketRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTicket(dc: DataConnect, vars: GetTicketVariables, options?: ExecuteQueryOptions): QueryPromise<GetTicketData, GetTicketVariables>;

interface GetTicketRef {
  ...
  (dc: DataConnect, vars: GetTicketVariables): QueryRef<GetTicketData, GetTicketVariables>;
}
export const getTicketRef: GetTicketRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTicketRef:
```typescript
const name = getTicketRef.operationName;
console.log(name);
```

### Variables
The `GetTicket` query requires an argument of type `GetTicketVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTicketVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTicket` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTicketData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTicketData {
  ticket?: {
    title: string;
    status: string;
  };
}
```
### Using `GetTicket`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTicket, GetTicketVariables } from '@dataconnect/generated';

// The `GetTicket` query requires an argument of type `GetTicketVariables`:
const getTicketVars: GetTicketVariables = {
  id: ..., 
};

// Call the `getTicket()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTicket(getTicketVars);
// Variables can be defined inline as well.
const { data } = await getTicket({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTicket(dataConnect, getTicketVars);

console.log(data.ticket);

// Or, you can use the `Promise` API.
getTicket(getTicketVars).then((response) => {
  const data = response.data;
  console.log(data.ticket);
});
```

### Using `GetTicket`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTicketRef, GetTicketVariables } from '@dataconnect/generated';

// The `GetTicket` query requires an argument of type `GetTicketVariables`:
const getTicketVars: GetTicketVariables = {
  id: ..., 
};

// Call the `getTicketRef()` function to get a reference to the query.
const ref = getTicketRef(getTicketVars);
// Variables can be defined inline as well.
const ref = getTicketRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTicketRef(dataConnect, getTicketVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.ticket);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.ticket);
});
```

## ListTickets
You can execute the `ListTickets` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTickets(options?: ExecuteQueryOptions): QueryPromise<ListTicketsData, undefined>;

interface ListTicketsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTicketsData, undefined>;
}
export const listTicketsRef: ListTicketsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTickets(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTicketsData, undefined>;

interface ListTicketsRef {
  ...
  (dc: DataConnect): QueryRef<ListTicketsData, undefined>;
}
export const listTicketsRef: ListTicketsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTicketsRef:
```typescript
const name = listTicketsRef.operationName;
console.log(name);
```

### Variables
The `ListTickets` query has no variables.
### Return Type
Recall that executing the `ListTickets` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTicketsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTicketsData {
  tickets: ({
    title: string;
    createdAt: TimestampString;
  })[];
}
```
### Using `ListTickets`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTickets } from '@dataconnect/generated';


// Call the `listTickets()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTickets();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTickets(dataConnect);

console.log(data.tickets);

// Or, you can use the `Promise` API.
listTickets().then((response) => {
  const data = response.data;
  console.log(data.tickets);
});
```

### Using `ListTickets`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTicketsRef } from '@dataconnect/generated';


// Call the `listTicketsRef()` function to get a reference to the query.
const ref = listTicketsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTicketsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tickets);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tickets);
});
```

## GetMessage
You can execute the `GetMessage` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMessage(vars: GetMessageVariables, options?: ExecuteQueryOptions): QueryPromise<GetMessageData, GetMessageVariables>;

interface GetMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMessageVariables): QueryRef<GetMessageData, GetMessageVariables>;
}
export const getMessageRef: GetMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMessage(dc: DataConnect, vars: GetMessageVariables, options?: ExecuteQueryOptions): QueryPromise<GetMessageData, GetMessageVariables>;

interface GetMessageRef {
  ...
  (dc: DataConnect, vars: GetMessageVariables): QueryRef<GetMessageData, GetMessageVariables>;
}
export const getMessageRef: GetMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMessageRef:
```typescript
const name = getMessageRef.operationName;
console.log(name);
```

### Variables
The `GetMessage` query requires an argument of type `GetMessageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMessageVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMessage` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMessageData {
  message?: {
    content: string;
    timestamp: TimestampString;
  };
}
```
### Using `GetMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMessage, GetMessageVariables } from '@dataconnect/generated';

// The `GetMessage` query requires an argument of type `GetMessageVariables`:
const getMessageVars: GetMessageVariables = {
  id: ..., 
};

// Call the `getMessage()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMessage(getMessageVars);
// Variables can be defined inline as well.
const { data } = await getMessage({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMessage(dataConnect, getMessageVars);

console.log(data.message);

// Or, you can use the `Promise` API.
getMessage(getMessageVars).then((response) => {
  const data = response.data;
  console.log(data.message);
});
```

### Using `GetMessage`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMessageRef, GetMessageVariables } from '@dataconnect/generated';

// The `GetMessage` query requires an argument of type `GetMessageVariables`:
const getMessageVars: GetMessageVariables = {
  id: ..., 
};

// Call the `getMessageRef()` function to get a reference to the query.
const ref = getMessageRef(getMessageVars);
// Variables can be defined inline as well.
const ref = getMessageRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMessageRef(dataConnect, getMessageVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.message);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.message);
});
```

## ListMessages
You can execute the `ListMessages` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMessages(options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, undefined>;

interface ListMessagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMessagesData, undefined>;
}
export const listMessagesRef: ListMessagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMessages(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, undefined>;

interface ListMessagesRef {
  ...
  (dc: DataConnect): QueryRef<ListMessagesData, undefined>;
}
export const listMessagesRef: ListMessagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMessagesRef:
```typescript
const name = listMessagesRef.operationName;
console.log(name);
```

### Variables
The `ListMessages` query has no variables.
### Return Type
Recall that executing the `ListMessages` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMessagesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMessagesData {
  messages: ({
    content: string;
    sender: {
      email: string;
    };
  })[];
}
```
### Using `ListMessages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMessages } from '@dataconnect/generated';


// Call the `listMessages()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMessages();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMessages(dataConnect);

console.log(data.messages);

// Or, you can use the `Promise` API.
listMessages().then((response) => {
  const data = response.data;
  console.log(data.messages);
});
```

### Using `ListMessages`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMessagesRef } from '@dataconnect/generated';


// Call the `listMessagesRef()` function to get a reference to the query.
const ref = listMessagesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMessagesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.messages);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.messages);
});
```

## GetWidget
You can execute the `GetWidget` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getWidget(vars: GetWidgetVariables, options?: ExecuteQueryOptions): QueryPromise<GetWidgetData, GetWidgetVariables>;

interface GetWidgetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWidgetVariables): QueryRef<GetWidgetData, GetWidgetVariables>;
}
export const getWidgetRef: GetWidgetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getWidget(dc: DataConnect, vars: GetWidgetVariables, options?: ExecuteQueryOptions): QueryPromise<GetWidgetData, GetWidgetVariables>;

interface GetWidgetRef {
  ...
  (dc: DataConnect, vars: GetWidgetVariables): QueryRef<GetWidgetData, GetWidgetVariables>;
}
export const getWidgetRef: GetWidgetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getWidgetRef:
```typescript
const name = getWidgetRef.operationName;
console.log(name);
```

### Variables
The `GetWidget` query requires an argument of type `GetWidgetVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetWidgetVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetWidget` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetWidgetData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetWidgetData {
  widgetConfig?: {
    primaryColor: string;
    widgetPosition: string;
  };
}
```
### Using `GetWidget`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getWidget, GetWidgetVariables } from '@dataconnect/generated';

// The `GetWidget` query requires an argument of type `GetWidgetVariables`:
const getWidgetVars: GetWidgetVariables = {
  id: ..., 
};

// Call the `getWidget()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getWidget(getWidgetVars);
// Variables can be defined inline as well.
const { data } = await getWidget({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getWidget(dataConnect, getWidgetVars);

console.log(data.widgetConfig);

// Or, you can use the `Promise` API.
getWidget(getWidgetVars).then((response) => {
  const data = response.data;
  console.log(data.widgetConfig);
});
```

### Using `GetWidget`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getWidgetRef, GetWidgetVariables } from '@dataconnect/generated';

// The `GetWidget` query requires an argument of type `GetWidgetVariables`:
const getWidgetVars: GetWidgetVariables = {
  id: ..., 
};

// Call the `getWidgetRef()` function to get a reference to the query.
const ref = getWidgetRef(getWidgetVars);
// Variables can be defined inline as well.
const ref = getWidgetRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getWidgetRef(dataConnect, getWidgetVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.widgetConfig);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.widgetConfig);
});
```

## ListWidgets
You can execute the `ListWidgets` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listWidgets(options?: ExecuteQueryOptions): QueryPromise<ListWidgetsData, undefined>;

interface ListWidgetsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListWidgetsData, undefined>;
}
export const listWidgetsRef: ListWidgetsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listWidgets(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListWidgetsData, undefined>;

interface ListWidgetsRef {
  ...
  (dc: DataConnect): QueryRef<ListWidgetsData, undefined>;
}
export const listWidgetsRef: ListWidgetsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listWidgetsRef:
```typescript
const name = listWidgetsRef.operationName;
console.log(name);
```

### Variables
The `ListWidgets` query has no variables.
### Return Type
Recall that executing the `ListWidgets` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListWidgetsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListWidgetsData {
  widgetConfigs: ({
    widgetPosition: string;
    primaryColor: string;
  })[];
}
```
### Using `ListWidgets`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listWidgets } from '@dataconnect/generated';


// Call the `listWidgets()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listWidgets();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listWidgets(dataConnect);

console.log(data.widgetConfigs);

// Or, you can use the `Promise` API.
listWidgets().then((response) => {
  const data = response.data;
  console.log(data.widgetConfigs);
});
```

### Using `ListWidgets`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listWidgetsRef } from '@dataconnect/generated';


// Call the `listWidgetsRef()` function to get a reference to the query.
const ref = listWidgetsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listWidgetsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.widgetConfigs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.widgetConfigs);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateOrganization
You can execute the `CreateOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createOrganization(): MutationPromise<CreateOrganizationData, undefined>;

interface CreateOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateOrganizationData, undefined>;
}
export const createOrganizationRef: CreateOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrganization(dc: DataConnect): MutationPromise<CreateOrganizationData, undefined>;

interface CreateOrganizationRef {
  ...
  (dc: DataConnect): MutationRef<CreateOrganizationData, undefined>;
}
export const createOrganizationRef: CreateOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrganizationRef:
```typescript
const name = createOrganizationRef.operationName;
console.log(name);
```

### Variables
The `CreateOrganization` mutation has no variables.
### Return Type
Recall that executing the `CreateOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrganizationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrganizationData {
  organization_insert: Organization_Key;
}
```
### Using `CreateOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrganization } from '@dataconnect/generated';


// Call the `createOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrganization();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrganization(dataConnect);

console.log(data.organization_insert);

// Or, you can use the `Promise` API.
createOrganization().then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
});
```

### Using `CreateOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrganizationRef } from '@dataconnect/generated';


// Call the `createOrganizationRef()` function to get a reference to the mutation.
const ref = createOrganizationRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrganizationRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
});
```

## UpdateOrganization
You can execute the `UpdateOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateOrganization(vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface UpdateOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
}
export const updateOrganizationRef: UpdateOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrganization(dc: DataConnect, vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface UpdateOrganizationRef {
  ...
  (dc: DataConnect, vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
}
export const updateOrganizationRef: UpdateOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrganizationRef:
```typescript
const name = updateOrganizationRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrganizationVariables {
  id: UUIDString;
  name?: string | null;
}
```
### Return Type
Recall that executing the `UpdateOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrganizationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
}
```
### Using `UpdateOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrganization, UpdateOrganizationVariables } from '@dataconnect/generated';

// The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`:
const updateOrganizationVars: UpdateOrganizationVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrganization(updateOrganizationVars);
// Variables can be defined inline as well.
const { data } = await updateOrganization({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrganization(dataConnect, updateOrganizationVars);

console.log(data.organization_update);

// Or, you can use the `Promise` API.
updateOrganization(updateOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization_update);
});
```

### Using `UpdateOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrganizationRef, UpdateOrganizationVariables } from '@dataconnect/generated';

// The `UpdateOrganization` mutation requires an argument of type `UpdateOrganizationVariables`:
const updateOrganizationVars: UpdateOrganizationVariables = {
  id: ..., 
  name: ..., // optional
};

// Call the `updateOrganizationRef()` function to get a reference to the mutation.
const ref = updateOrganizationRef(updateOrganizationVars);
// Variables can be defined inline as well.
const ref = updateOrganizationRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrganizationRef(dataConnect, updateOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_update);
});
```

## DeleteOrganization
You can execute the `DeleteOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteOrganization(vars: DeleteOrganizationVariables): MutationPromise<DeleteOrganizationData, DeleteOrganizationVariables>;

interface DeleteOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOrganizationVariables): MutationRef<DeleteOrganizationData, DeleteOrganizationVariables>;
}
export const deleteOrganizationRef: DeleteOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteOrganization(dc: DataConnect, vars: DeleteOrganizationVariables): MutationPromise<DeleteOrganizationData, DeleteOrganizationVariables>;

interface DeleteOrganizationRef {
  ...
  (dc: DataConnect, vars: DeleteOrganizationVariables): MutationRef<DeleteOrganizationData, DeleteOrganizationVariables>;
}
export const deleteOrganizationRef: DeleteOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteOrganizationRef:
```typescript
const name = deleteOrganizationRef.operationName;
console.log(name);
```

### Variables
The `DeleteOrganization` mutation requires an argument of type `DeleteOrganizationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteOrganizationVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteOrganizationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteOrganizationData {
  organization_delete?: Organization_Key | null;
}
```
### Using `DeleteOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteOrganization, DeleteOrganizationVariables } from '@dataconnect/generated';

// The `DeleteOrganization` mutation requires an argument of type `DeleteOrganizationVariables`:
const deleteOrganizationVars: DeleteOrganizationVariables = {
  id: ..., 
};

// Call the `deleteOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteOrganization(deleteOrganizationVars);
// Variables can be defined inline as well.
const { data } = await deleteOrganization({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteOrganization(dataConnect, deleteOrganizationVars);

console.log(data.organization_delete);

// Or, you can use the `Promise` API.
deleteOrganization(deleteOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization_delete);
});
```

### Using `DeleteOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteOrganizationRef, DeleteOrganizationVariables } from '@dataconnect/generated';

// The `DeleteOrganization` mutation requires an argument of type `DeleteOrganizationVariables`:
const deleteOrganizationVars: DeleteOrganizationVariables = {
  id: ..., 
};

// Call the `deleteOrganizationRef()` function to get a reference to the mutation.
const ref = deleteOrganizationRef(deleteOrganizationVars);
// Variables can be defined inline as well.
const ref = deleteOrganizationRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteOrganizationRef(dataConnect, deleteOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_delete);
});
```

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  email: string;
  role: string;
  orgId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  role: ..., 
  orgId: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ email: ..., role: ..., orgId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  role: ..., 
  orgId: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ email: ..., role: ..., orgId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  id: UUIDString;
  displayName?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  id: ..., 
  displayName: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ id: ..., displayName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation requires an argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  id: ..., 
  displayName: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ id: ..., displayName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect, vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;

interface DeleteUserRef {
  ...
  (dc: DataConnect, vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation requires an argument of type `DeleteUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteUserVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser, DeleteUserVariables } from '@dataconnect/generated';

// The `DeleteUser` mutation requires an argument of type `DeleteUserVariables`:
const deleteUserVars: DeleteUserVariables = {
  id: ..., 
};

// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser(deleteUserVars);
// Variables can be defined inline as well.
const { data } = await deleteUser({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect, deleteUserVars);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser(deleteUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef, DeleteUserVariables } from '@dataconnect/generated';

// The `DeleteUser` mutation requires an argument of type `DeleteUserVariables`:
const deleteUserVars: DeleteUserVariables = {
  id: ..., 
};

// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef(deleteUserVars);
// Variables can be defined inline as well.
const ref = deleteUserRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect, deleteUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateTicket
You can execute the `CreateTicket` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTicket(vars: CreateTicketVariables): MutationPromise<CreateTicketData, CreateTicketVariables>;

interface CreateTicketRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTicketVariables): MutationRef<CreateTicketData, CreateTicketVariables>;
}
export const createTicketRef: CreateTicketRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTicket(dc: DataConnect, vars: CreateTicketVariables): MutationPromise<CreateTicketData, CreateTicketVariables>;

interface CreateTicketRef {
  ...
  (dc: DataConnect, vars: CreateTicketVariables): MutationRef<CreateTicketData, CreateTicketVariables>;
}
export const createTicketRef: CreateTicketRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTicketRef:
```typescript
const name = createTicketRef.operationName;
console.log(name);
```

### Variables
The `CreateTicket` mutation requires an argument of type `CreateTicketVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTicketVariables {
  title: string;
  status: string;
  orgId: UUIDString;
  custId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateTicket` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTicketData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTicketData {
  ticket_insert: Ticket_Key;
}
```
### Using `CreateTicket`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTicket, CreateTicketVariables } from '@dataconnect/generated';

// The `CreateTicket` mutation requires an argument of type `CreateTicketVariables`:
const createTicketVars: CreateTicketVariables = {
  title: ..., 
  status: ..., 
  orgId: ..., 
  custId: ..., 
};

// Call the `createTicket()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTicket(createTicketVars);
// Variables can be defined inline as well.
const { data } = await createTicket({ title: ..., status: ..., orgId: ..., custId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTicket(dataConnect, createTicketVars);

console.log(data.ticket_insert);

// Or, you can use the `Promise` API.
createTicket(createTicketVars).then((response) => {
  const data = response.data;
  console.log(data.ticket_insert);
});
```

### Using `CreateTicket`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTicketRef, CreateTicketVariables } from '@dataconnect/generated';

// The `CreateTicket` mutation requires an argument of type `CreateTicketVariables`:
const createTicketVars: CreateTicketVariables = {
  title: ..., 
  status: ..., 
  orgId: ..., 
  custId: ..., 
};

// Call the `createTicketRef()` function to get a reference to the mutation.
const ref = createTicketRef(createTicketVars);
// Variables can be defined inline as well.
const ref = createTicketRef({ title: ..., status: ..., orgId: ..., custId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTicketRef(dataConnect, createTicketVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.ticket_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.ticket_insert);
});
```

## UpdateTicket
You can execute the `UpdateTicket` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTicket(vars: UpdateTicketVariables): MutationPromise<UpdateTicketData, UpdateTicketVariables>;

interface UpdateTicketRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTicketVariables): MutationRef<UpdateTicketData, UpdateTicketVariables>;
}
export const updateTicketRef: UpdateTicketRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTicket(dc: DataConnect, vars: UpdateTicketVariables): MutationPromise<UpdateTicketData, UpdateTicketVariables>;

interface UpdateTicketRef {
  ...
  (dc: DataConnect, vars: UpdateTicketVariables): MutationRef<UpdateTicketData, UpdateTicketVariables>;
}
export const updateTicketRef: UpdateTicketRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTicketRef:
```typescript
const name = updateTicketRef.operationName;
console.log(name);
```

### Variables
The `UpdateTicket` mutation requires an argument of type `UpdateTicketVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTicketVariables {
  id: UUIDString;
  status?: string | null;
}
```
### Return Type
Recall that executing the `UpdateTicket` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTicketData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTicketData {
  ticket_update?: Ticket_Key | null;
}
```
### Using `UpdateTicket`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTicket, UpdateTicketVariables } from '@dataconnect/generated';

// The `UpdateTicket` mutation requires an argument of type `UpdateTicketVariables`:
const updateTicketVars: UpdateTicketVariables = {
  id: ..., 
  status: ..., // optional
};

// Call the `updateTicket()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTicket(updateTicketVars);
// Variables can be defined inline as well.
const { data } = await updateTicket({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTicket(dataConnect, updateTicketVars);

console.log(data.ticket_update);

// Or, you can use the `Promise` API.
updateTicket(updateTicketVars).then((response) => {
  const data = response.data;
  console.log(data.ticket_update);
});
```

### Using `UpdateTicket`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTicketRef, UpdateTicketVariables } from '@dataconnect/generated';

// The `UpdateTicket` mutation requires an argument of type `UpdateTicketVariables`:
const updateTicketVars: UpdateTicketVariables = {
  id: ..., 
  status: ..., // optional
};

// Call the `updateTicketRef()` function to get a reference to the mutation.
const ref = updateTicketRef(updateTicketVars);
// Variables can be defined inline as well.
const ref = updateTicketRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTicketRef(dataConnect, updateTicketVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.ticket_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.ticket_update);
});
```

## DeleteTicket
You can execute the `DeleteTicket` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTicket(vars: DeleteTicketVariables): MutationPromise<DeleteTicketData, DeleteTicketVariables>;

interface DeleteTicketRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTicketVariables): MutationRef<DeleteTicketData, DeleteTicketVariables>;
}
export const deleteTicketRef: DeleteTicketRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTicket(dc: DataConnect, vars: DeleteTicketVariables): MutationPromise<DeleteTicketData, DeleteTicketVariables>;

interface DeleteTicketRef {
  ...
  (dc: DataConnect, vars: DeleteTicketVariables): MutationRef<DeleteTicketData, DeleteTicketVariables>;
}
export const deleteTicketRef: DeleteTicketRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTicketRef:
```typescript
const name = deleteTicketRef.operationName;
console.log(name);
```

### Variables
The `DeleteTicket` mutation requires an argument of type `DeleteTicketVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTicketVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTicket` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTicketData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTicketData {
  ticket_delete?: Ticket_Key | null;
}
```
### Using `DeleteTicket`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTicket, DeleteTicketVariables } from '@dataconnect/generated';

// The `DeleteTicket` mutation requires an argument of type `DeleteTicketVariables`:
const deleteTicketVars: DeleteTicketVariables = {
  id: ..., 
};

// Call the `deleteTicket()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTicket(deleteTicketVars);
// Variables can be defined inline as well.
const { data } = await deleteTicket({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTicket(dataConnect, deleteTicketVars);

console.log(data.ticket_delete);

// Or, you can use the `Promise` API.
deleteTicket(deleteTicketVars).then((response) => {
  const data = response.data;
  console.log(data.ticket_delete);
});
```

### Using `DeleteTicket`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTicketRef, DeleteTicketVariables } from '@dataconnect/generated';

// The `DeleteTicket` mutation requires an argument of type `DeleteTicketVariables`:
const deleteTicketVars: DeleteTicketVariables = {
  id: ..., 
};

// Call the `deleteTicketRef()` function to get a reference to the mutation.
const ref = deleteTicketRef(deleteTicketVars);
// Variables can be defined inline as well.
const ref = deleteTicketRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTicketRef(dataConnect, deleteTicketVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.ticket_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.ticket_delete);
});
```

## CreateMessage
You can execute the `CreateMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMessage(vars: CreateMessageVariables): MutationPromise<CreateMessageData, CreateMessageVariables>;

interface CreateMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMessageVariables): MutationRef<CreateMessageData, CreateMessageVariables>;
}
export const createMessageRef: CreateMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMessage(dc: DataConnect, vars: CreateMessageVariables): MutationPromise<CreateMessageData, CreateMessageVariables>;

interface CreateMessageRef {
  ...
  (dc: DataConnect, vars: CreateMessageVariables): MutationRef<CreateMessageData, CreateMessageVariables>;
}
export const createMessageRef: CreateMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMessageRef:
```typescript
const name = createMessageRef.operationName;
console.log(name);
```

### Variables
The `CreateMessage` mutation requires an argument of type `CreateMessageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMessageVariables {
  content: string;
  senderId: UUIDString;
  ticketId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMessageData {
  message_insert: Message_Key;
}
```
### Using `CreateMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMessage, CreateMessageVariables } from '@dataconnect/generated';

// The `CreateMessage` mutation requires an argument of type `CreateMessageVariables`:
const createMessageVars: CreateMessageVariables = {
  content: ..., 
  senderId: ..., 
  ticketId: ..., 
};

// Call the `createMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMessage(createMessageVars);
// Variables can be defined inline as well.
const { data } = await createMessage({ content: ..., senderId: ..., ticketId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMessage(dataConnect, createMessageVars);

console.log(data.message_insert);

// Or, you can use the `Promise` API.
createMessage(createMessageVars).then((response) => {
  const data = response.data;
  console.log(data.message_insert);
});
```

### Using `CreateMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMessageRef, CreateMessageVariables } from '@dataconnect/generated';

// The `CreateMessage` mutation requires an argument of type `CreateMessageVariables`:
const createMessageVars: CreateMessageVariables = {
  content: ..., 
  senderId: ..., 
  ticketId: ..., 
};

// Call the `createMessageRef()` function to get a reference to the mutation.
const ref = createMessageRef(createMessageVars);
// Variables can be defined inline as well.
const ref = createMessageRef({ content: ..., senderId: ..., ticketId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMessageRef(dataConnect, createMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.message_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.message_insert);
});
```

## UpdateMessage
You can execute the `UpdateMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMessage(vars: UpdateMessageVariables): MutationPromise<UpdateMessageData, UpdateMessageVariables>;

interface UpdateMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMessageVariables): MutationRef<UpdateMessageData, UpdateMessageVariables>;
}
export const updateMessageRef: UpdateMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMessage(dc: DataConnect, vars: UpdateMessageVariables): MutationPromise<UpdateMessageData, UpdateMessageVariables>;

interface UpdateMessageRef {
  ...
  (dc: DataConnect, vars: UpdateMessageVariables): MutationRef<UpdateMessageData, UpdateMessageVariables>;
}
export const updateMessageRef: UpdateMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMessageRef:
```typescript
const name = updateMessageRef.operationName;
console.log(name);
```

### Variables
The `UpdateMessage` mutation requires an argument of type `UpdateMessageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMessageVariables {
  id: UUIDString;
  content?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMessageData {
  message_update?: Message_Key | null;
}
```
### Using `UpdateMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMessage, UpdateMessageVariables } from '@dataconnect/generated';

// The `UpdateMessage` mutation requires an argument of type `UpdateMessageVariables`:
const updateMessageVars: UpdateMessageVariables = {
  id: ..., 
  content: ..., // optional
};

// Call the `updateMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMessage(updateMessageVars);
// Variables can be defined inline as well.
const { data } = await updateMessage({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMessage(dataConnect, updateMessageVars);

console.log(data.message_update);

// Or, you can use the `Promise` API.
updateMessage(updateMessageVars).then((response) => {
  const data = response.data;
  console.log(data.message_update);
});
```

### Using `UpdateMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMessageRef, UpdateMessageVariables } from '@dataconnect/generated';

// The `UpdateMessage` mutation requires an argument of type `UpdateMessageVariables`:
const updateMessageVars: UpdateMessageVariables = {
  id: ..., 
  content: ..., // optional
};

// Call the `updateMessageRef()` function to get a reference to the mutation.
const ref = updateMessageRef(updateMessageVars);
// Variables can be defined inline as well.
const ref = updateMessageRef({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMessageRef(dataConnect, updateMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.message_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.message_update);
});
```

## DeleteMessage
You can execute the `DeleteMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMessage(vars: DeleteMessageVariables): MutationPromise<DeleteMessageData, DeleteMessageVariables>;

interface DeleteMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMessageVariables): MutationRef<DeleteMessageData, DeleteMessageVariables>;
}
export const deleteMessageRef: DeleteMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMessage(dc: DataConnect, vars: DeleteMessageVariables): MutationPromise<DeleteMessageData, DeleteMessageVariables>;

interface DeleteMessageRef {
  ...
  (dc: DataConnect, vars: DeleteMessageVariables): MutationRef<DeleteMessageData, DeleteMessageVariables>;
}
export const deleteMessageRef: DeleteMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMessageRef:
```typescript
const name = deleteMessageRef.operationName;
console.log(name);
```

### Variables
The `DeleteMessage` mutation requires an argument of type `DeleteMessageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMessageVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMessageData {
  message_delete?: Message_Key | null;
}
```
### Using `DeleteMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMessage, DeleteMessageVariables } from '@dataconnect/generated';

// The `DeleteMessage` mutation requires an argument of type `DeleteMessageVariables`:
const deleteMessageVars: DeleteMessageVariables = {
  id: ..., 
};

// Call the `deleteMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMessage(deleteMessageVars);
// Variables can be defined inline as well.
const { data } = await deleteMessage({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMessage(dataConnect, deleteMessageVars);

console.log(data.message_delete);

// Or, you can use the `Promise` API.
deleteMessage(deleteMessageVars).then((response) => {
  const data = response.data;
  console.log(data.message_delete);
});
```

### Using `DeleteMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMessageRef, DeleteMessageVariables } from '@dataconnect/generated';

// The `DeleteMessage` mutation requires an argument of type `DeleteMessageVariables`:
const deleteMessageVars: DeleteMessageVariables = {
  id: ..., 
};

// Call the `deleteMessageRef()` function to get a reference to the mutation.
const ref = deleteMessageRef(deleteMessageVars);
// Variables can be defined inline as well.
const ref = deleteMessageRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMessageRef(dataConnect, deleteMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.message_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.message_delete);
});
```

## CreateWidget
You can execute the `CreateWidget` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createWidget(vars: CreateWidgetVariables): MutationPromise<CreateWidgetData, CreateWidgetVariables>;

interface CreateWidgetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWidgetVariables): MutationRef<CreateWidgetData, CreateWidgetVariables>;
}
export const createWidgetRef: CreateWidgetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createWidget(dc: DataConnect, vars: CreateWidgetVariables): MutationPromise<CreateWidgetData, CreateWidgetVariables>;

interface CreateWidgetRef {
  ...
  (dc: DataConnect, vars: CreateWidgetVariables): MutationRef<CreateWidgetData, CreateWidgetVariables>;
}
export const createWidgetRef: CreateWidgetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createWidgetRef:
```typescript
const name = createWidgetRef.operationName;
console.log(name);
```

### Variables
The `CreateWidget` mutation requires an argument of type `CreateWidgetVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateWidgetVariables {
  pos: string;
  color: string;
  orgId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateWidget` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateWidgetData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateWidgetData {
  widgetConfig_insert: WidgetConfig_Key;
}
```
### Using `CreateWidget`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createWidget, CreateWidgetVariables } from '@dataconnect/generated';

// The `CreateWidget` mutation requires an argument of type `CreateWidgetVariables`:
const createWidgetVars: CreateWidgetVariables = {
  pos: ..., 
  color: ..., 
  orgId: ..., 
};

// Call the `createWidget()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createWidget(createWidgetVars);
// Variables can be defined inline as well.
const { data } = await createWidget({ pos: ..., color: ..., orgId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createWidget(dataConnect, createWidgetVars);

console.log(data.widgetConfig_insert);

// Or, you can use the `Promise` API.
createWidget(createWidgetVars).then((response) => {
  const data = response.data;
  console.log(data.widgetConfig_insert);
});
```

### Using `CreateWidget`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createWidgetRef, CreateWidgetVariables } from '@dataconnect/generated';

// The `CreateWidget` mutation requires an argument of type `CreateWidgetVariables`:
const createWidgetVars: CreateWidgetVariables = {
  pos: ..., 
  color: ..., 
  orgId: ..., 
};

// Call the `createWidgetRef()` function to get a reference to the mutation.
const ref = createWidgetRef(createWidgetVars);
// Variables can be defined inline as well.
const ref = createWidgetRef({ pos: ..., color: ..., orgId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createWidgetRef(dataConnect, createWidgetVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.widgetConfig_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.widgetConfig_insert);
});
```

## UpdateWidget
You can execute the `UpdateWidget` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateWidget(vars: UpdateWidgetVariables): MutationPromise<UpdateWidgetData, UpdateWidgetVariables>;

interface UpdateWidgetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWidgetVariables): MutationRef<UpdateWidgetData, UpdateWidgetVariables>;
}
export const updateWidgetRef: UpdateWidgetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateWidget(dc: DataConnect, vars: UpdateWidgetVariables): MutationPromise<UpdateWidgetData, UpdateWidgetVariables>;

interface UpdateWidgetRef {
  ...
  (dc: DataConnect, vars: UpdateWidgetVariables): MutationRef<UpdateWidgetData, UpdateWidgetVariables>;
}
export const updateWidgetRef: UpdateWidgetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateWidgetRef:
```typescript
const name = updateWidgetRef.operationName;
console.log(name);
```

### Variables
The `UpdateWidget` mutation requires an argument of type `UpdateWidgetVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateWidgetVariables {
  id: UUIDString;
  color?: string | null;
}
```
### Return Type
Recall that executing the `UpdateWidget` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateWidgetData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateWidgetData {
  widgetConfig_update?: WidgetConfig_Key | null;
}
```
### Using `UpdateWidget`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateWidget, UpdateWidgetVariables } from '@dataconnect/generated';

// The `UpdateWidget` mutation requires an argument of type `UpdateWidgetVariables`:
const updateWidgetVars: UpdateWidgetVariables = {
  id: ..., 
  color: ..., // optional
};

// Call the `updateWidget()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateWidget(updateWidgetVars);
// Variables can be defined inline as well.
const { data } = await updateWidget({ id: ..., color: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateWidget(dataConnect, updateWidgetVars);

console.log(data.widgetConfig_update);

// Or, you can use the `Promise` API.
updateWidget(updateWidgetVars).then((response) => {
  const data = response.data;
  console.log(data.widgetConfig_update);
});
```

### Using `UpdateWidget`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateWidgetRef, UpdateWidgetVariables } from '@dataconnect/generated';

// The `UpdateWidget` mutation requires an argument of type `UpdateWidgetVariables`:
const updateWidgetVars: UpdateWidgetVariables = {
  id: ..., 
  color: ..., // optional
};

// Call the `updateWidgetRef()` function to get a reference to the mutation.
const ref = updateWidgetRef(updateWidgetVars);
// Variables can be defined inline as well.
const ref = updateWidgetRef({ id: ..., color: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateWidgetRef(dataConnect, updateWidgetVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.widgetConfig_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.widgetConfig_update);
});
```

## DeleteWidget
You can execute the `DeleteWidget` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteWidget(vars: DeleteWidgetVariables): MutationPromise<DeleteWidgetData, DeleteWidgetVariables>;

interface DeleteWidgetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWidgetVariables): MutationRef<DeleteWidgetData, DeleteWidgetVariables>;
}
export const deleteWidgetRef: DeleteWidgetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteWidget(dc: DataConnect, vars: DeleteWidgetVariables): MutationPromise<DeleteWidgetData, DeleteWidgetVariables>;

interface DeleteWidgetRef {
  ...
  (dc: DataConnect, vars: DeleteWidgetVariables): MutationRef<DeleteWidgetData, DeleteWidgetVariables>;
}
export const deleteWidgetRef: DeleteWidgetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteWidgetRef:
```typescript
const name = deleteWidgetRef.operationName;
console.log(name);
```

### Variables
The `DeleteWidget` mutation requires an argument of type `DeleteWidgetVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteWidgetVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteWidget` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteWidgetData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteWidgetData {
  widgetConfig_delete?: WidgetConfig_Key | null;
}
```
### Using `DeleteWidget`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteWidget, DeleteWidgetVariables } from '@dataconnect/generated';

// The `DeleteWidget` mutation requires an argument of type `DeleteWidgetVariables`:
const deleteWidgetVars: DeleteWidgetVariables = {
  id: ..., 
};

// Call the `deleteWidget()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteWidget(deleteWidgetVars);
// Variables can be defined inline as well.
const { data } = await deleteWidget({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteWidget(dataConnect, deleteWidgetVars);

console.log(data.widgetConfig_delete);

// Or, you can use the `Promise` API.
deleteWidget(deleteWidgetVars).then((response) => {
  const data = response.data;
  console.log(data.widgetConfig_delete);
});
```

### Using `DeleteWidget`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteWidgetRef, DeleteWidgetVariables } from '@dataconnect/generated';

// The `DeleteWidget` mutation requires an argument of type `DeleteWidgetVariables`:
const deleteWidgetVars: DeleteWidgetVariables = {
  id: ..., 
};

// Call the `deleteWidgetRef()` function to get a reference to the mutation.
const ref = deleteWidgetRef(deleteWidgetVars);
// Variables can be defined inline as well.
const ref = deleteWidgetRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteWidgetRef(dataConnect, deleteWidgetVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.widgetConfig_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.widgetConfig_delete);
});
```

