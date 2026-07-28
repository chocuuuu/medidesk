import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateMessageData {
  message_insert: Message_Key;
}

export interface CreateMessageVariables {
  content: string;
  senderId: UUIDString;
  ticketId: UUIDString;
}

export interface CreateOrganizationData {
  organization_insert: Organization_Key;
}

export interface CreateTicketData {
  ticket_insert: Ticket_Key;
}

export interface CreateTicketVariables {
  title: string;
  status: string;
  orgId: UUIDString;
  custId: UUIDString;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  email: string;
  role: string;
  orgId: UUIDString;
}

export interface CreateWidgetData {
  widgetConfig_insert: WidgetConfig_Key;
}

export interface CreateWidgetVariables {
  pos: string;
  color: string;
  orgId: UUIDString;
}

export interface DeleteMessageData {
  message_delete?: Message_Key | null;
}

export interface DeleteMessageVariables {
  id: UUIDString;
}

export interface DeleteOrganizationData {
  organization_delete?: Organization_Key | null;
}

export interface DeleteOrganizationVariables {
  id: UUIDString;
}

export interface DeleteTicketData {
  ticket_delete?: Ticket_Key | null;
}

export interface DeleteTicketVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface DeleteUserVariables {
  id: UUIDString;
}

export interface DeleteWidgetData {
  widgetConfig_delete?: WidgetConfig_Key | null;
}

export interface DeleteWidgetVariables {
  id: UUIDString;
}

export interface GetMessageData {
  message?: {
    content: string;
    timestamp: TimestampString;
  };
}

export interface GetMessageVariables {
  id: UUIDString;
}

export interface GetOrganizationData {
  organization?: {
    name: string;
    subscriptionTier: string;
  };
}

export interface GetOrganizationVariables {
  id: UUIDString;
}

export interface GetTicketData {
  ticket?: {
    title: string;
    status: string;
  };
}

export interface GetTicketVariables {
  id: UUIDString;
}

export interface GetUserData {
  user?: {
    email: string;
    displayName?: string | null;
  };
}

export interface GetUserVariables {
  id: UUIDString;
}

export interface GetWidgetData {
  widgetConfig?: {
    primaryColor: string;
    widgetPosition: string;
  };
}

export interface GetWidgetVariables {
  id: UUIDString;
}

export interface ListMessagesData {
  messages: ({
    content: string;
    sender: {
      email: string;
    };
  })[];
}

export interface ListOrganizationsData {
  organizations: ({
    id: UUIDString;
    name: string;
  } & Organization_Key)[];
}

export interface ListTicketsData {
  tickets: ({
    title: string;
    createdAt: TimestampString;
  })[];
}

export interface ListUsersData {
  users: ({
    email: string;
    role: string;
  })[];
}

export interface ListWidgetsData {
  widgetConfigs: ({
    widgetPosition: string;
    primaryColor: string;
  })[];
}

export interface Message_Key {
  id: UUIDString;
  __typename?: 'Message_Key';
}

export interface Organization_Key {
  id: UUIDString;
  __typename?: 'Organization_Key';
}

export interface Ticket_Key {
  id: UUIDString;
  __typename?: 'Ticket_Key';
}

export interface UpdateMessageData {
  message_update?: Message_Key | null;
}

export interface UpdateMessageVariables {
  id: UUIDString;
  content?: string | null;
}

export interface UpdateOrganizationData {
  organization_update?: Organization_Key | null;
}

export interface UpdateOrganizationVariables {
  id: UUIDString;
  name?: string | null;
}

export interface UpdateTicketData {
  ticket_update?: Ticket_Key | null;
}

export interface UpdateTicketVariables {
  id: UUIDString;
  status?: string | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  id: UUIDString;
  displayName?: string | null;
}

export interface UpdateWidgetData {
  widgetConfig_update?: WidgetConfig_Key | null;
}

export interface UpdateWidgetVariables {
  id: UUIDString;
  color?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WidgetConfig_Key {
  id: UUIDString;
  __typename?: 'WidgetConfig_Key';
}

interface CreateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateOrganizationData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateOrganizationData, undefined>;
  operationName: string;
}
export const createOrganizationRef: CreateOrganizationRef;

export function createOrganization(): MutationPromise<CreateOrganizationData, undefined>;
export function createOrganization(dc: DataConnect): MutationPromise<CreateOrganizationData, undefined>;

interface GetOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrganizationVariables): QueryRef<GetOrganizationData, GetOrganizationVariables>;
  operationName: string;
}
export const getOrganizationRef: GetOrganizationRef;

export function getOrganization(vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;
export function getOrganization(dc: DataConnect, vars: GetOrganizationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrganizationData, GetOrganizationVariables>;

interface ListOrganizationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOrganizationsData, undefined>;
  operationName: string;
}
export const listOrganizationsRef: ListOrganizationsRef;

export function listOrganizations(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;
export function listOrganizations(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsData, undefined>;

interface UpdateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrganizationVariables): MutationRef<UpdateOrganizationData, UpdateOrganizationVariables>;
  operationName: string;
}
export const updateOrganizationRef: UpdateOrganizationRef;

export function updateOrganization(vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;
export function updateOrganization(dc: DataConnect, vars: UpdateOrganizationVariables): MutationPromise<UpdateOrganizationData, UpdateOrganizationVariables>;

interface DeleteOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOrganizationVariables): MutationRef<DeleteOrganizationData, DeleteOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteOrganizationVariables): MutationRef<DeleteOrganizationData, DeleteOrganizationVariables>;
  operationName: string;
}
export const deleteOrganizationRef: DeleteOrganizationRef;

export function deleteOrganization(vars: DeleteOrganizationVariables): MutationPromise<DeleteOrganizationData, DeleteOrganizationVariables>;
export function deleteOrganization(dc: DataConnect, vars: DeleteOrganizationVariables): MutationPromise<DeleteOrganizationData, DeleteOrganizationVariables>;

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;
export function getUser(dc: DataConnect, vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;
export function deleteUser(dc: DataConnect, vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;

interface CreateTicketRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTicketVariables): MutationRef<CreateTicketData, CreateTicketVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTicketVariables): MutationRef<CreateTicketData, CreateTicketVariables>;
  operationName: string;
}
export const createTicketRef: CreateTicketRef;

export function createTicket(vars: CreateTicketVariables): MutationPromise<CreateTicketData, CreateTicketVariables>;
export function createTicket(dc: DataConnect, vars: CreateTicketVariables): MutationPromise<CreateTicketData, CreateTicketVariables>;

interface GetTicketRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTicketVariables): QueryRef<GetTicketData, GetTicketVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTicketVariables): QueryRef<GetTicketData, GetTicketVariables>;
  operationName: string;
}
export const getTicketRef: GetTicketRef;

export function getTicket(vars: GetTicketVariables, options?: ExecuteQueryOptions): QueryPromise<GetTicketData, GetTicketVariables>;
export function getTicket(dc: DataConnect, vars: GetTicketVariables, options?: ExecuteQueryOptions): QueryPromise<GetTicketData, GetTicketVariables>;

interface ListTicketsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTicketsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTicketsData, undefined>;
  operationName: string;
}
export const listTicketsRef: ListTicketsRef;

export function listTickets(options?: ExecuteQueryOptions): QueryPromise<ListTicketsData, undefined>;
export function listTickets(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTicketsData, undefined>;

interface UpdateTicketRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTicketVariables): MutationRef<UpdateTicketData, UpdateTicketVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTicketVariables): MutationRef<UpdateTicketData, UpdateTicketVariables>;
  operationName: string;
}
export const updateTicketRef: UpdateTicketRef;

export function updateTicket(vars: UpdateTicketVariables): MutationPromise<UpdateTicketData, UpdateTicketVariables>;
export function updateTicket(dc: DataConnect, vars: UpdateTicketVariables): MutationPromise<UpdateTicketData, UpdateTicketVariables>;

interface DeleteTicketRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTicketVariables): MutationRef<DeleteTicketData, DeleteTicketVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTicketVariables): MutationRef<DeleteTicketData, DeleteTicketVariables>;
  operationName: string;
}
export const deleteTicketRef: DeleteTicketRef;

export function deleteTicket(vars: DeleteTicketVariables): MutationPromise<DeleteTicketData, DeleteTicketVariables>;
export function deleteTicket(dc: DataConnect, vars: DeleteTicketVariables): MutationPromise<DeleteTicketData, DeleteTicketVariables>;

interface CreateMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMessageVariables): MutationRef<CreateMessageData, CreateMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMessageVariables): MutationRef<CreateMessageData, CreateMessageVariables>;
  operationName: string;
}
export const createMessageRef: CreateMessageRef;

export function createMessage(vars: CreateMessageVariables): MutationPromise<CreateMessageData, CreateMessageVariables>;
export function createMessage(dc: DataConnect, vars: CreateMessageVariables): MutationPromise<CreateMessageData, CreateMessageVariables>;

interface GetMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMessageVariables): QueryRef<GetMessageData, GetMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMessageVariables): QueryRef<GetMessageData, GetMessageVariables>;
  operationName: string;
}
export const getMessageRef: GetMessageRef;

export function getMessage(vars: GetMessageVariables, options?: ExecuteQueryOptions): QueryPromise<GetMessageData, GetMessageVariables>;
export function getMessage(dc: DataConnect, vars: GetMessageVariables, options?: ExecuteQueryOptions): QueryPromise<GetMessageData, GetMessageVariables>;

interface ListMessagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMessagesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMessagesData, undefined>;
  operationName: string;
}
export const listMessagesRef: ListMessagesRef;

export function listMessages(options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, undefined>;
export function listMessages(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMessagesData, undefined>;

interface UpdateMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMessageVariables): MutationRef<UpdateMessageData, UpdateMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMessageVariables): MutationRef<UpdateMessageData, UpdateMessageVariables>;
  operationName: string;
}
export const updateMessageRef: UpdateMessageRef;

export function updateMessage(vars: UpdateMessageVariables): MutationPromise<UpdateMessageData, UpdateMessageVariables>;
export function updateMessage(dc: DataConnect, vars: UpdateMessageVariables): MutationPromise<UpdateMessageData, UpdateMessageVariables>;

interface DeleteMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMessageVariables): MutationRef<DeleteMessageData, DeleteMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMessageVariables): MutationRef<DeleteMessageData, DeleteMessageVariables>;
  operationName: string;
}
export const deleteMessageRef: DeleteMessageRef;

export function deleteMessage(vars: DeleteMessageVariables): MutationPromise<DeleteMessageData, DeleteMessageVariables>;
export function deleteMessage(dc: DataConnect, vars: DeleteMessageVariables): MutationPromise<DeleteMessageData, DeleteMessageVariables>;

interface CreateWidgetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWidgetVariables): MutationRef<CreateWidgetData, CreateWidgetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateWidgetVariables): MutationRef<CreateWidgetData, CreateWidgetVariables>;
  operationName: string;
}
export const createWidgetRef: CreateWidgetRef;

export function createWidget(vars: CreateWidgetVariables): MutationPromise<CreateWidgetData, CreateWidgetVariables>;
export function createWidget(dc: DataConnect, vars: CreateWidgetVariables): MutationPromise<CreateWidgetData, CreateWidgetVariables>;

interface GetWidgetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWidgetVariables): QueryRef<GetWidgetData, GetWidgetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetWidgetVariables): QueryRef<GetWidgetData, GetWidgetVariables>;
  operationName: string;
}
export const getWidgetRef: GetWidgetRef;

export function getWidget(vars: GetWidgetVariables, options?: ExecuteQueryOptions): QueryPromise<GetWidgetData, GetWidgetVariables>;
export function getWidget(dc: DataConnect, vars: GetWidgetVariables, options?: ExecuteQueryOptions): QueryPromise<GetWidgetData, GetWidgetVariables>;

interface ListWidgetsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListWidgetsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListWidgetsData, undefined>;
  operationName: string;
}
export const listWidgetsRef: ListWidgetsRef;

export function listWidgets(options?: ExecuteQueryOptions): QueryPromise<ListWidgetsData, undefined>;
export function listWidgets(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListWidgetsData, undefined>;

interface UpdateWidgetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWidgetVariables): MutationRef<UpdateWidgetData, UpdateWidgetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateWidgetVariables): MutationRef<UpdateWidgetData, UpdateWidgetVariables>;
  operationName: string;
}
export const updateWidgetRef: UpdateWidgetRef;

export function updateWidget(vars: UpdateWidgetVariables): MutationPromise<UpdateWidgetData, UpdateWidgetVariables>;
export function updateWidget(dc: DataConnect, vars: UpdateWidgetVariables): MutationPromise<UpdateWidgetData, UpdateWidgetVariables>;

interface DeleteWidgetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWidgetVariables): MutationRef<DeleteWidgetData, DeleteWidgetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteWidgetVariables): MutationRef<DeleteWidgetData, DeleteWidgetVariables>;
  operationName: string;
}
export const deleteWidgetRef: DeleteWidgetRef;

export function deleteWidget(vars: DeleteWidgetVariables): MutationPromise<DeleteWidgetData, DeleteWidgetVariables>;
export function deleteWidget(dc: DataConnect, vars: DeleteWidgetVariables): MutationPromise<DeleteWidgetData, DeleteWidgetVariables>;

