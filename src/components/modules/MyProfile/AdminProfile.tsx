/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/service/auth/auth.service";
import { IAdmin } from "@/types/admin.interface";
import { UserInfo } from "@/types/user.interface";
import { Camera, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { email } from "zod";
// import PaymentsHistory from "./PaymentsHistory";

interface AdminProfileProps {
    adminInfo: IAdmin;
}

const MyProfile = ({ adminInfo }: AdminProfileProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const profilePhoto = adminInfo.profilePhoto;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const formData = new FormData(e.currentTarget);

        // Create `data` JSON for complex fields
        const data: any = {
            name: formData.get("name"),
            email: formData.get("email"),
            contactNumber: formData.get("contactNumber"),
            // bio: formData.get("bio"),
            // location: formData.get("location"),
            // interests: formData.get("interests")?.toString().split(",").map((s) => s.trim()),
            // visitedCountries: formData.get("visitedCountries")?.toString().split(",").map((s) => s.trim()),
        };

        const uploadFormData = new FormData();
        uploadFormData.append("data", JSON.stringify(data));

        const file = formData.get("file");
        if (file && file instanceof File && file.size > 0) {
            uploadFormData.append("file", file);
        }

        startTransition(async () => {
            try {
                const result = await updateMyProfile(uploadFormData);

                if (result.success) {
                    toast.success(result.message || "Profile updated successfully!");
                    setPreviewImage(null);
                    router.refresh();
                } else {
                    toast.error(result.message || "Something went wrong!");
                }
            } catch (err: any) {
                console.error(err);
                toast.error(err?.message || "Unexpected error occurred!");
            }
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your personal information</p>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Profile Image */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <Avatar className="h-32 w-32">
                                    {previewImage || profilePhoto ? (
                                        <AvatarImage src={previewImage || profilePhoto} alt={adminInfo.name} />
                                    ) : (
                                        <AvatarFallback className="text-3xl">{getInitials(adminInfo.name || "USER")}</AvatarFallback>
                                    )}
                                </Avatar>
                                <label htmlFor="file" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                                    <Camera className="h-4 w-4" />
                                    <Input type="file" id="file" name="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isPending} />
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Details */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {error && <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">{error}</div>}
                            {success && <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">{success}</div>}

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" name="name" defaultValue={adminInfo.name} required disabled={isPending} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" value={adminInfo.email} disabled className="bg-muted" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name">Contact Number</Label>
                                    <Input id="contactNumber" name="contactNumber" defaultValue={adminInfo.contactNumber} required disabled={isPending} />
                                </div>



                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" /> Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
            {/* <div className="space-y-6">
                <PaymentsHistory />
            </div> */}
        </div>
    );
};

export default MyProfile;












// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { getInitials } from "@/lib/formatters";
// import { updateMyProfile } from "@/service/auth/auth.service"; // email-based update
// import { IAdmin } from "@/types/admin.interface";
// import { Camera, Loader2, Save } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState, useTransition } from "react";
// import { toast } from "sonner";

// interface AdminProfileProps {
//     adminInfo: IAdmin;
// }

// const AdminProfile = ({ adminInfo }: AdminProfileProps) => {
//     const router = useRouter();
//     const [isPending, startTransition] = useTransition();
//     const [previewImage, setPreviewImage] = useState<string | null>(null);

//     const profilePhoto = adminInfo.profilePhoto;

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => setPreviewImage(reader.result as string);
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const formData = new FormData(e.currentTarget);

//         // Prepare update payload
//         const data: any = {
//             name: formData.get("name"),
//             contactNumber: formData.get("contactNumber"),
//         };

//         const uploadFormData = new FormData();
//         uploadFormData.append("data", JSON.stringify(data));

//         const file = formData.get("file");
//         if (file && file instanceof File && file.size > 0) {
//             uploadFormData.append("file", file);
//         }

//         startTransition(async () => {
//             try {
//                 const result = await updateMyProfile(uploadFormData); // email-based update
//                 if (result.success) {
//                     toast.success(result.message || "Admin profile updated successfully!");
//                     setPreviewImage(null);
//                     router.refresh();
//                 } else {
//                     toast.error(result.message || "Something went wrong!");
//                 }
//             } catch (err: unknown) {
//                 console.error(err);
//                 toast.error(err instanceof Error ? err.message : "Unexpected error occurred!");
//             }
//         });
//     };

//     return (
//         <div className="space-y-6">
//             <h1 className="text-3xl font-bold">Admin Profile</h1>
//             <p className="text-muted-foreground mt-1">Manage your admin information</p>

//             <form onSubmit={handleSubmit}>
//                 <div className="grid gap-6 lg:grid-cols-3">
//                     {/* Profile Image */}
//                     <Card className="lg:col-span-1">
//                         <CardHeader>
//                             <CardTitle>Profile Picture</CardTitle>
//                         </CardHeader>
//                         <CardContent className="flex flex-col items-center space-y-4">
//                             <div className="relative">
//                                 <Avatar className="h-32 w-32">
//                                     {previewImage || profilePhoto ? (
//                                         <AvatarImage src={previewImage || profilePhoto} alt={adminInfo.name} />
//                                     ) : (
//                                         <AvatarFallback className="text-3xl">{getInitials(adminInfo.name || "ADMIN")}</AvatarFallback>
//                                     )}
//                                 </Avatar>
//                                 <label
//                                     htmlFor="file"
//                                     className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
//                                 >
//                                     <Camera className="h-4 w-4" />
//                                     <Input
//                                         type="file"
//                                         id="file"
//                                         name="file"
//                                         accept="image/*"
//                                         className="hidden"
//                                         onChange={handleImageChange}
//                                         disabled={isPending}
//                                     />
//                                 </label>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* Admin Details */}
//                     <Card className="lg:col-span-2">
//                         <CardHeader>
//                             <CardTitle>Personal Information</CardTitle>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             <div className="grid gap-4 md:grid-cols-2">
//                                 <div className="space-y-2">
//                                     <Label htmlFor="name">Full Name</Label>
//                                     <Input id="name" name="name" defaultValue={adminInfo.name || ""} required disabled={isPending} />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="email">Email</Label>
//                                     <Input id="email" name="email" type="email" value={adminInfo.email} disabled className="bg-muted" />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="contactNumber">Contact Number</Label>
//                                     <Input
//                                         id="contactNumber"
//                                         name="contactNumber"
//                                         defaultValue={adminInfo.contactNumber || ""}
//                                         disabled={isPending}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex justify-end pt-4">
//                                 <Button type="submit" disabled={isPending}>
//                                     {isPending ? (
//                                         <>
//                                             <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <Save className="mr-2 h-4 w-4" /> Save Changes
//                                         </>
//                                     )}
//                                 </Button>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AdminProfile;
