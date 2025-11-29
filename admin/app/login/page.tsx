import React from 'react'
import LoginForm from '@/module/admin/components/login-form'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Typography } from '@/components/ui/typography'


const LoginPage: React.FC = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
               <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col items-center text-center">
                                <Typography variant="h2">Welcome back</Typography>
                                <Typography variant="lead">
                                    Login to your account
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <LoginForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default LoginPage