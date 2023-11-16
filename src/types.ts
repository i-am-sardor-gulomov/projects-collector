import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

// For Create User
export interface IUserCreate {
  username: string
  fullname: string
  phone: string
  password: string
  password_confirm: string
  status: string
}

// For Retrieve User
export interface IUserData {
  id: number
  username: string
  fullname: string
  phone: string
  status: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// For Update User
export interface IUserUpdate {
  id: number
  username: string
  fullname: string
  phone: string
  password: string
  password_confirm: string
  status: string
  super_password: string
}

// For Delete User
export interface IUserDelete {
  super_password: string
}

// For Create | Update App
export interface IApp {
  id: number | null
  name: string
  description: string
  url: string
  icon: string
}

// For Retrieve App
export interface IAppData {
  id: number
  name: string
  description: string
  url: string
  icon: string
  status: boolean
  created_at: string
  updated_at: string
  is_active: boolean
}

// For Create Credential
export interface ICredentialCreate {
  login: string
  password: string
  app_id: number
}

// For Retrieve Credential
export interface ICredentialData {
  login: string
  password: string
  app_id: number
}

// For Update Credential
export interface ICredentialUpdate {
  login: string
  password: string
  app_id: number
  super_password: string
}

// For Retrieve Profile Info
export interface IProfileData {
  id: number
  username: string
  fullname: string
  phone: string
  status: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// For Update Profile Info
export interface IProfileUpdate {
  username: string
  fullname: string
  phone: string
  password: string
  password_confirm: string
  super_password: string
}

// For Update App | User Activeness
export interface IIsActive {
  is_active: boolean
}

// For Login
export interface ILogin {
  username: string
  password: string
}

// For Enter To App
export interface IEnter {
  id: number
  username: string
  password: string
  urlBackend?: string
  urlFrontend: string
}
