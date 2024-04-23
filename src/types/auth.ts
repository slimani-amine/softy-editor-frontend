export interface LoginBody {
  email: string;
  code: string ;
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

export interface SendMailBody {
  email: string;
}

export interface ResetPasswordBody {
  password: string;
  hash: string;
}
