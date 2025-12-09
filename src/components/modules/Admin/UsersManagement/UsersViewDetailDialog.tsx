import InfoRow from "@/components/shared/InoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { UserInfo } from "@/types/user.interface";
import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";

interface IUserViewDialogProps {
    open: boolean;
    onClose: () => void;
    user: UserInfo | null;
}

const UserViewDetailDialog = ({ 
    open,
     onClose,
      user }: IUserViewDialogProps) => {
    if (!user) {
    return null;
  };

    // const contactNumber = user.user?.contactNumber || "N/A";
    const address = user.user?.address || "N/A";

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>User Profile</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Profile Header */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                            <AvatarImage src={user.profileImage || ""} alt={user.name} />
                            <AvatarFallback className="text-2xl">
                                {getInitials(user.name || "")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
                            <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                                <Mail className="h-4 w-4" />
                                {user.email}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                <Badge
                                    variant={
                                        user.status === "ACTIVE"
                                            ? "default"
                                            : user.status === "BLOCKED"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                    className="text-sm"
                                >
                                    {user.status}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Account Info */}
                    <div className="space-y-6">
                        {/* Contact Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Phone className="h-5 w-5 text-purple-600" />
                                <h3 className="font-semibold text-lg">Contact Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                                    {/* <InfoRow label="Phone Number" value={contactNumber} /> */}
                                </div>
                                <div className="flex items-start gap-3 md:col-span-2">
                                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Address" value={address} />
                                </div>
                                {user.city && (
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                                        <InfoRow label="City" value={user.city} />
                                    </div>
                                )}
                                {user.country && (
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                                        <InfoRow label="Country" value={user.country} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* Account Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <User className="h-5 w-5 text-orange-600" />
                                <h3 className="font-semibold text-lg">Account Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Created At"
                                        value={formatDateTime(user.createdAt)}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Updated At"
                                        value={formatDateTime(user.updatedAt)}
                                    />
                                </div>
                                {user.bio && (
                                    <div className="flex items-start gap-3 md:col-span-2">
                                        <InfoRow label="Bio" value={user.bio} />
                                    </div>
                                )}
                                {user.interests?.length > 0 && (
                                    <div className="flex items-start gap-3 md:col-span-2">
                                        <InfoRow
                                            label="Interests"
                                            value={user.interests.join(", ")}
                                        />
                                    </div>
                                )}
                                {user.visitedCountries?.length > 0 && (
                                    <div className="flex items-start gap-3 md:col-span-2">
                                        <InfoRow
                                            label="Visited Countries"
                                            value={user.visitedCountries.join(", ")}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserViewDetailDialog;
