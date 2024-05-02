export interface Plan {
  id: number;
  name?: string;
}
export interface Status {
  id: number;
  name?: string;
}

export interface Role {
  id: number;
  name?: string;
}


export interface Offer {
  id: number;
  name?: string;
}

export interface User {
  id: number | string;
  email: string | null;
  password?: string;
  previousPassword?: string;
  provider: string;
  socialId?: string | null;
  userName?: string | null;
  photo?: string | null;
  role?: Role | null;
  status?: Status;
  plan?: Plan;
  offer:Offer
}
