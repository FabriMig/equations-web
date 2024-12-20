import { z } from 'zod';

import { loginUserSchema } from '../schemas/user';
import { api } from '../lib/api';
import { CredentialResponse } from '@react-oauth/google';
import { AxiosResponse } from 'axios';
import { SimpleAuth } from '../types';

export const simpleUserLogin = async (user: z.infer<typeof loginUserSchema>): Promise<AxiosResponse<SimpleAuth>> => {
    return api.post<SimpleAuth>("auth/login", user);
}

export const googleUserLogin = async (googleCredentials: CredentialResponse): Promise<AxiosResponse<SimpleAuth>> => {
    return api.post("/auth/googleSignin", googleCredentials);
}

export const googleUserSignUp = async (googleCredentials: CredentialResponse): Promise<AxiosResponse<SimpleAuth>> => {
    return api.post("auth/googleSignup", googleCredentials)
}

export const simpleUserSignup = async (user: z.infer<typeof loginUserSchema>): Promise<AxiosResponse<SimpleAuth>>=> {
    return api.post<SimpleAuth>("auth/signup", user);
}

export const verifyUserSession = async (): Promise<AxiosResponse<SimpleAuth>> => {
    return api.get("/auth/verifySession")
}

export const logout = async(): Promise<AxiosResponse<object>> => {
    return api.post("/auth/logout");
}
