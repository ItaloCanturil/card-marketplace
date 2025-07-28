export type IAuthForm = {
  name?: string;
  email: string;
  password: string;
  mode: 'login' | 'register';
}