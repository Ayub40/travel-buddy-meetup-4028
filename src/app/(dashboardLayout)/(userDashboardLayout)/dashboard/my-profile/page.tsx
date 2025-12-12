import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/service/auth/getUserInfo";

const MyProfilePage = async () => {
    const userInfo = await getUserInfo();
    return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;
