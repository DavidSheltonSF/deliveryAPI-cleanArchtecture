export interface BaseUserProps {
  username: string;
  email: string;
  authentication: {
    passwordHash: string;
    sessionToken?: string;
  };
}
