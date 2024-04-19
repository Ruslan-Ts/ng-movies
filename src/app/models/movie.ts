export class Movie {
    id!: number;
    poster_path!: string;
    original_title!: string;
    overview!: string;
    release_date!: string;
    vote_average!: number;
    backdrop_path!: string;
    genres!: Genre[];
}
export class Genre {
    id!: number;
    name!: string;
}

export class Cast {
    id!: number;
    original_name!: string;
    profile_path!: string;
    character!: string;
}
export class Review {
    id!: string;
    author!: string;
    content!: string;
}

