export interface BaseUserDTO {
  username: string;
  email: string;
  authentication: {
    password: string;
    sessionToken?: string;
  };
}
