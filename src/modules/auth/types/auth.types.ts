export type LoginRequest = {
   username: string
   password: string
}

export type LoginResponse = {
   id: number

   username: string
   email: string

   firstName: string
   lastName: string
   gender: 'male' | 'female'

   image: string

   accessToken: string
   refreshToken: string

}

export interface AuthState {
   accessToken: string | null
   refreshToken: string | null

   setTokens: (accessToken: string, refreshToken: string) => void
   logout: () => void
}