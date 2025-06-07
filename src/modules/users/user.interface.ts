export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: number;
  country: string;
  city: string;
}

export interface UserModify {
  name?: string;
  email?: string;
  address?: string;
  phone?: number;
  country?: string;
  city?: string;
}
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone?: number;
  country?: string;
  city?: string;
  address?: string;
  orders: { id: string; date: Date }[];
}

export interface UserWithoutPassword {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: number;
  country: string;
  city: string;
}
