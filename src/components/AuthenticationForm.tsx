import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from 'zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { UseFormReturn } from "react-hook-form"
import { loginUserSchema } from '../schemas/user';
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

interface AuthFormProps {
    form: UseFormReturn<z.infer<typeof loginUserSchema>>
    onSubmit: (params: z.infer<typeof loginUserSchema>) => void
    handleGoogleAuth: (params: CredentialResponse) => void
}

function AuthenticationForm({ form, onSubmit, handleGoogleAuth,  }: AuthFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full py-3 px-4 bg-gray-900 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                            placeholder="Enter your username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <div className="relative">
                                        <Button onClick={() => setShowPassword(!showPassword)} type="button" variant="ghost" className="absolute right-0">
                                            {showPassword ? <Eye/> : <EyeClosed/>}
                                        </Button>

                                        <FormControl>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                className="w-full py-3 px-4 bg-gray-900 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                        Sign In
                    </Button>
                </form>
            </Form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-gray-400">Or continue with</span>
                </div>
            </div>
            <GoogleLogin
                onSuccess={handleGoogleAuth}
                // width={"fit-content"}
                size="large"
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </>
    )
}

export default AuthenticationForm