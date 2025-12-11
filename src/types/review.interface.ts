export interface IReview {
    id: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
}

/* Create Review DTO (payload for POST) */
export interface IReviewCreate {
    rating: number;
    comment: string;
}
