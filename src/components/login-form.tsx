"use client";
import { loginUser } from "@/service/auth/loginUser";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const LoginForm = ({ redirect }: { redirect?: string }) => {
    const [state, formAction, isPending] = useActionState(loginUser, null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);


    // const handleAutoFill = (role: "admin" | "manager" | "user") => {
    const handleAutoFill = (role: "admin" | "user") => {
        let selectedEmail = "";
        let selectedPass = "";

        if (role === "admin") {
            selectedEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";
            selectedPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";
        }
        // else if (role === "manager") {
        //     selectedEmail = process.env.NEXT_PUBLIC_MANAGER_EMAIL || "";
        //     selectedPass = process.env.NEXT_PUBLIC_MANAGER_PASSWORD || "";
        // }
        else if (role === "user") {
            selectedEmail = process.env.NEXT_PUBLIC_USER_EMAIL || "";
            selectedPass = process.env.NEXT_PUBLIC_USER_PASSWORD || "";
        }

        setEmail(selectedEmail);
        setPassword(selectedPass);

        if (selectedEmail) {
        } else {
            toast.error("Credentials not found in .env file!");
        }
    };

    return (
        <div className="space-y-6">
            {/* Quick Login Buttons */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
                <Button
                    type="button" variant="outline" size="sm"
                    className="bg-blue-50 text-blue-600 border-blue-200"
                    onClick={() => handleAutoFill("admin")}
                >
                    Admin Access
                </Button>
                {/* <Button
                    type="button" variant="outline" size="sm"
                    className="bg-green-50 text-green-600 border-green-200"
                    onClick={() => handleAutoFill("manager")}
                >
                    Manager Access
                </Button> */}
                <Button
                    type="button" variant="outline" size="sm"
                    className="bg-pink-50 text-pink-600 border-pink-200"
                    onClick={() => handleAutoFill("user")}
                >
                    User Access
                </Button>
            </div>

            <form action={formAction}>
                {redirect && <input type="hidden" name="redirect" value={redirect} />}
                <FieldGroup>
                    <div className="grid grid-cols-1 gap-4">
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email" name="email" type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="m@example.com"
                            />
                            <InputFieldError field="email" state={state} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password" name="password" type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                            <InputFieldError field="password" state={state} />
                        </Field>
                    </div>

                    <div className="mt-6 space-y-4">
                        <Button className="w-full py-6 text-lg" type="submit" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                        </Button>

                        <p className="text-center text-sm text-gray-500">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="text-blue-600 font-semibold hover:underline">Sign up</a>
                        </p>
                    </div>
                </FieldGroup>
            </form>
        </div>
    );
};

export default LoginForm;













// "use client";
// import { loginUser } from "@/service/auth/loginUser";
// import { useActionState, useEffect } from "react";
// import { toast } from "sonner";
// import InputFieldError from "./shared/InputFieldError";
// import { Button } from "./ui/button";
// import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
// import { Input } from "./ui/input";

// const LoginForm = ({ redirect }: { redirect?: string }) => {
//     const [state, formAction, isPending] = useActionState(loginUser, null);
//     console.log(state);

//     useEffect(() => {
//         if (state && !state.success && state.message) {
//             toast.error(state.message);
//         }
//     }, [state]);

//     return (
//         <form action={formAction}>
//             {redirect && <input type="hidden" name="redirect" value={redirect} />}
//             <FieldGroup>
//                 <div className="grid grid-cols-1 gap-4">
//                     {/* Email */}
//                     <Field>
//                         <FieldLabel htmlFor="email">Email</FieldLabel>
//                         <Input
//                             id="email"
//                             name="email"
//                             type="email"
//                             placeholder="m@example.com"
//                         //   required
//                         />

//                         <InputFieldError field="email" state={state} />
//                     </Field>

//                     {/* Password */}
//                     <Field>
//                         <FieldLabel htmlFor="password">Password</FieldLabel>
//                         <Input
//                             id="password"
//                             name="password"
//                             type="password"
//                             placeholder="Enter your password"
//                         //   required
//                         />
//                         <InputFieldError field="password" state={state} />
//                     </Field>
//                 </div>
//                 <FieldGroup className="mt-4">
//                     <Field>
//                         <Button type="submit" disabled={isPending}>
//                             {isPending ? "Logging in..." : "Login"}
//                         </Button>

//                         <FieldDescription className="px-6 text-center">
//                             Don&apos;t have an account?{" "}
//                             <a href="/register" className="text-blue-600 hover:underline">
//                                 Sign up
//                             </a>
//                         </FieldDescription>
//                         <FieldDescription className="px-6 text-center">
//                             <a
//                                 href="/forget-password"
//                                 className="text-blue-600 hover:underline"
//                             >
//                                 Forgot password?
//                             </a>
//                         </FieldDescription>
//                     </Field>
//                 </FieldGroup>
//             </FieldGroup>
//         </form>
//     );
// };

// export default LoginForm;
