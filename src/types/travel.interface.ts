export enum TravelType {
    SOLO = "SOLO",
    GROUP = "GROUP",
    BACKPACK = "BACKPACK",
}

export interface ITravelPlan {
    id?: string;
    title: string;
    destination: string;
    country: string;
    startDate: string;
    endDate: string;
    budget?: number;
    description?: string;
    travelType: TravelType;
    photos?: string[];
    visibility?: boolean;


    user?: {
        id: string;
        name: string;
        email: string;
        profileImage?: string;
    };

    createdAt?: string; // Plan create date
}














// export enum TravelType {
//     SOLO = "SOLO",
//     GROUP = "GROUP",
//     BACKPACK = "BACKPACK",
// }

// export interface ITravelPlan {
//     id?: string;
//     title: string;
//     destination: string;
//     country: string;
//     startDate: string;
//     endDate: string;
//     budget?: number;
//     description?: string;
//     travelType: TravelType;
//     photos?: string[];
//     visibility?: boolean;
// }