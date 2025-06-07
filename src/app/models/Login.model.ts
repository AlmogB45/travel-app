export interface LoginResponse {
  message: string;
  session: { access_token: string; [key: string]: any };
}
