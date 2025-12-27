/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function getAppStatistics() {
  try {
    const response = await serverFetch.get("/admin/statistics", {
      next: { revalidate: 30 },
    });


    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("Get statistics error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch statistics",
      data: null,
    };
  }
}


export async function getAdminAllStats() {
  try {
    const response = await serverFetch.get("/admin/admin-stats");


    console.log("Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend Error:", errorData);
      return { success: false, data: null };
    }

    return await response.json();
  } catch (error: any) {
    console.error("Fetch Error:", error);
    return { success: false, data: null };
  }
}
