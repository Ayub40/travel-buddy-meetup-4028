import AdminProfile from "@/components/modules/MyProfile/AdminProfile";
import { getUserInfo } from "@/service/auth/getUserInfo";

const AdminProfilePage = async () => {
    const userInfo = await getUserInfo();
    return <AdminProfile adminInfo={userInfo} />;
};

export default AdminProfilePage;

