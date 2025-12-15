// import MyProfile from "@/components/modules/MyProfile/MyProfile";
import MyProfile from "@/components/modules/MyProfile/AdminProfile";
import { getUserInfo } from "@/service/auth/getUserInfo";

const MyProfilePage = async () => {
    const userInfo = await getUserInfo();
    return <MyProfile adminInfo={userInfo} />;
};

export default MyProfilePage;
