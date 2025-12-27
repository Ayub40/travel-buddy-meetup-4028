/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyReviews } from "@/service/review/reviews.services";
import { getUserInfo } from "@/service/auth/getUserInfo";
import MyReviewsClient from "@/components/modules/Review/MyReviewsClient";

const MyReviewsPage = async () => {
  const user = await getUserInfo();
  const userEmail = user?.email || "";

  const result = await getMyReviews();
  const reviews = result.success
    ? (result.data || []).map((r: any) => ({
      ...r,
      isOwn: r.user?.email === userEmail,
    }))
    : [];

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <MyReviewsClient initialReviews={reviews} />
    </div>
  );
};

export default MyReviewsPage;




// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { getMyReviews } from "@/service/review/reviews.services";
// import { getUserInfo } from "@/service/auth/getUserInfo";
// import MyReviewsClient from "@/components/modules/Review/MyReviewsClient";

// const MyReviewsPage = async () => {
//   // server-side fetch user info
//   const user = await getUserInfo();
//   const userEmail = user?.email || "";

//   // server-side fetch reviews
//   const result = await getMyReviews();
//   const reviews = result.success
//     ? (result.data || []).map((r: any) => ({
//         ...r,
//         isOwn: r.user?.email === userEmail,
//       }))
//     : [];

//   return (
//     <MyReviewsClient initialReviews={reviews} />
//   );
// };

// export default MyReviewsPage;



