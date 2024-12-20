import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { CredentialResponse } from '@react-oauth/google'

import { loginUserSchema } from '../schemas/user';
import { googleUserSignUp, simpleUserSignup } from "@/services/user.service";
import { Link, useNavigate } from 'react-router-dom';
import { routes } from "@/routes";
import { useApi } from "@/hooks/useApi";
import useUserStore from "@/store/user.store";
import { SimpleAuth } from "@/types";
import AuthenticationForm from "@/components/AuthenticationForm";
import { useToast } from '@/hooks/use-toast';

const ErrorToastConfig = {
    title: "Login Error",
    style: {
        backgroundColor: "#D32F2F"
    }
}

export default function SignUp() {
    const navigate = useNavigate();
    const { addLogedUser } = useUserStore();
    const { toast } = useToast();

    const onSuccessLogin = (response: SimpleAuth) => {
        addLogedUser(response.user.email, response.user.accountType);
        navigate(routes.solveEquations.route)
    }

    const { fetch: simpleSignup } = useApi(simpleUserSignup, { onSuccess: onSuccessLogin, onError: (err) => toast({ ...ErrorToastConfig, description: err?.message }) })

    const { fetch: googleSignup } = useApi(googleUserSignUp, { onSuccess: onSuccessLogin, onError: (err) => toast({ ...ErrorToastConfig, description: err?.message }) })

    const form = useForm<z.infer<typeof loginUserSchema>>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof loginUserSchema>) => {
        simpleSignup(values)
    }

    const handleGoogleSignUn = async (credentialResponse: CredentialResponse) => {
        googleSignup(credentialResponse);
    }

    return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col">

            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text">Welcome</h2>
                        <p className="text-gray-400">Sign up to your account</p>
                    </div>
                    <AuthenticationForm form={form} handleGoogleAuth={handleGoogleSignUn} onSubmit={onSubmit}/>

                    <p className="text-center text-gray-400">
                        Do you have an account?
                        <Link to={routes.login.route} className="ml-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                            Login here
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    )
}