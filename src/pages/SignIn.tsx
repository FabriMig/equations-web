import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { CredentialResponse } from '@react-oauth/google'
import { useToast } from "@/hooks/use-toast"

import { loginUserSchema } from '../schemas/user';
import { googleUserLogin, simpleUserLogin } from "@/services/user.service";
import { routes } from "@/routes";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "@/store/user.store";
import { useApi } from "@/hooks/useApi";
import { SimpleAuth } from "@/types";
import AuthenticationForm from "@/components/AuthenticationForm";

const ErrorToastConfig = {
    title: "Login Error",
    style: {
        backgroundColor: "#D32F2F"
    }
}

export default function SignIn() {
    const navigate = useNavigate();
    const { addLogedUser } = useUserStore();
    const { toast } = useToast();

    const onSuccessLogin = (response: SimpleAuth) => {
        addLogedUser(response.user.email, response.user.accountType);
        navigate(routes.solveEquations.route)
    }

    const { fetch: simpleLogin } = useApi(simpleUserLogin, { onSuccess: onSuccessLogin, onError: (err) => toast({ ...ErrorToastConfig, description: err?.message }) })

    const { fetch: googleLogin } = useApi(googleUserLogin, { onSuccess: onSuccessLogin, onError: (err) => toast({ ...ErrorToastConfig, description: err?.message }) })

    const form = useForm<z.infer<typeof loginUserSchema>>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof loginUserSchema>) => {
        simpleLogin({ email: values.email, password: values.password });
    }

    const handleGoogleSignIn = async (credentialResponse: CredentialResponse) => {
        googleLogin(credentialResponse)
    }

    return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col">

            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">Welcome Back</h2>
                        <p className="text-gray-400">Sign in to your account</p>
                    </div>

                    <AuthenticationForm form={form} handleGoogleAuth={handleGoogleSignIn} onSubmit={onSubmit}/>


                    <p className="text-center text-gray-400">
                        Don't have an account?
                        <Link to={routes.signUp.route} className="ml-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                            Register here
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    )
}