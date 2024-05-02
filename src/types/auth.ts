export interface LoginBody {
  email: string;
  code?: string;
  password?: string;
}

export interface RegisterBody {
  userName: string;
  email: string;
  password: string;
  confirmPassowrd: string;
}

export interface LoginWithGoogleBody {
  idToken: string;
}

export interface UpdateUserBody {
  id: number;
  photo?: string;
  userName?: string;
  password?: string;
  plan?: { id: number };
  offer?: { id: number};
}

export interface SendMailBody {
  email: string;
}

export interface ProfileBody {
  id?: number;
  photo?: string;
  userName: string;
  password: string;
}

export interface ResetPasswordBody {
  password: string;
  hash: string;
}
