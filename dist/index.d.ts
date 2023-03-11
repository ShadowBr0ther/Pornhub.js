import { RequestInit, Response } from 'node-fetch';
import { URLSearchParams } from 'url';

declare class Request {
    _agent: RequestInit['agent'];
    _headers: Record<string, string>;
    _cookie: Map<any, any>;
    setAgent(agent: RequestInit['agent']): void;
    setHeader(key: string, value: string): void;
    get cookie(): string;
    setCookie(key: string, value: any): void;
    checkStatus(res: Response): Promise<Response>;
    parseCookieItem(str: string): string[];
    handleSetCookie(res: Response): Response;
    toJson(res: Response): Promise<any>;
    buildParams<U extends Record<string, any>>(data: U): URLSearchParams;
    buildRequest<U extends Record<string, any>, T>(method: 'get' | 'post' | 'post-form', url: string, data?: U): Promise<T>;
    get<T>(url: string): Promise<T>;
    post<T, U extends object = any>(url: string, data: U): Promise<T>;
    postForm<T, U extends object = any>(url: string, data: U): Promise<T>;
    raw(url: string): Promise<string>;
}

declare class Engine {
    BASE_URL: string;
    request: Request;
    warmedUp: boolean;
    constructor();
}

interface Counting {
    from: number;
    to: number;
    total: number;
}

type LowerLetter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

interface Paging {
    current: number;
    maxPage: number;
    isEnd: boolean;
}

type WebmasterSearchOrdering = 'newest' | 'mostviewed' | 'rating';
type VideoSearchOrdering = 'Most Relevant' | 'Most Recent' | 'Most Viewed' | 'Top Rated' | 'Longest';
type GifSearchOrdering = 'Most Relevant' | 'Most Recent' | 'Most Viewed' | 'Top Rated';
type AlbumSearchOrdering = 'Most Relevant' | 'Most Recent' | 'Most Viewed' | 'Top Rated';
type PornstarSearchOrdering = 'Most Relevant' | 'Most Popular' | 'Most Viewed' | 'No. of Video';
declare const VideoOrderingMapping: Record<VideoSearchOrdering, string>;
declare const GifOrderingMapping: Record<GifSearchOrdering, string>;
declare const AlbumOrderingMapping: Record<AlbumSearchOrdering, string>;
declare const PornstarOrderingMapping: Record<PornstarSearchOrdering, string>;

interface WebmasterSearchOptions {
    page?: number;
    period?: SearchPeriod;
    ordering?: WebmasterSearchOrdering;
    thumbsize?: ThumbSize;
    tags?: string[];
    stars?: string[];
    category?: string[];
}
interface AlbumSearchOptions {
    page?: number;
    order?: AlbumSearchOrdering;
    verified?: boolean;
    segments?: Segment | Segment[];
}
interface GifSearchOptions {
    page?: number;
    order?: GifSearchOrdering;
    sexualOrientation?: SexualOrientation;
}
interface PornstarSearchOptions {
    page?: number;
    order?: PornstarSearchOrdering;
}
interface VideoSearchOptions {
    page?: number;
    order?: VideoSearchOrdering;
    hd?: boolean;
    production?: 'all' | 'professional' | 'homemade';
    durationMin?: 10 | 20 | 30;
    durationMax?: 10 | 20 | 30;
    /** Category id */
    filterCategory?: number;
}
interface AutoCompleteOptions {
    token?: string;
    sexualOrientation?: SexualOrientation;
}

type SearchPeriod = 'weekly' | 'monthly' | 'alltime';

type Segment = 'female' | 'gay' | 'male' | 'misc' | 'straight' | 'transgender' | 'uncategorized' | (string & {});

type SexualOrientation = 'straight' | 'gay' | 'transgender';

type ThumbSize = 'small' | 'medium' | 'large' | 'small_hd' | 'medium_hd' | 'large_hd';

interface VideoDetail {
    duration: string;
    views: number;
    video_id: string;
    vote: {
        up: number;
        down: number;
        total: number;
        rating: number;
    };
    title: string;
    url: string;
    default_thumb: string;
    thumb: string;
    publish_date: string;
    thumbs: {
        width: string;
        height: string;
        src: string;
    }[];
    tags: string[];
    pornstars: string[];
    categories: string[];
    segment: Segment;
}

interface VideoResponse {
    duration: string;
    views: number;
    video_id: string;
    rating: number;
    ratings: number;
    title: string;
    url: string;
    default_thumb: string;
    thumb: string;
    publish_date: string;
    thumbs: {
        size: string;
        width: string;
        height: string;
        src: string;
    }[];
    tags: {
        tag_name: string;
    }[];
    pornstars: {
        pornstar_name: string;
    }[];
    categories: {
        category: string;
    }[];
    segment: Segment;
}

interface VideoSearchResult {
    title: string;
    url: string;
    views: string;
    duration: string;
    /** @deprecated This is no longer valid in pornhub's new version. We don't have a way to tell */
    hd: boolean;
    /** @deprecated This is no longer valid in pornhub's new version, use `freePremium` instead */
    premium: boolean;
    freePremium: boolean;
    preview: string;
}

interface AutoCompleteItem<T extends number | string> {
    name: string;
    slug: string;
    rank: T;
}
interface AutoCompleteResultItem<T extends number | string> extends AutoCompleteItem<T> {
    url: string;
}

interface PornstarSearchResult {
    name: string;
    url: string;
    views: string;
    videoNum: number;
    rank: number;
    photo: string;
}

interface GifSearchResult {
    title: string;
    url: string;
    mp4: string;
    webm: string;
}

interface AlbumSearchResult {
    title: string;
    url: string;
    rating: string;
    preview: string;
}

interface ModelPage {
    name: string;
    about: string;
    bio: string;
    avatar: string;
    cover: string;
    rank: number;
    weeklyRank: number;
    verified: boolean;
    awarded: boolean;
    premium: boolean;
    subscribers: number;
    videosFrontpage: {
        link: string;
        thumb: string;
    }[];
    featuredIn: {
        name: string;
        url: string;
    }[];
    uploadedVideoCount: number;
    taggedVideoCount: number;
    gender?: string;
    born?: string;
    birthPlace?: string;
    starSign?: string;
    measurements?: string;
    endowment?: string;
    relationship?: 'Open' | 'Taken' | 'Single' | (string & {});
    interestedIn?: string;
    cityAndCountry?: string;
    careerStatus?: string;
    careerStartAndEnd?: string;
    height?: string;
    weight?: string;
    ethnicity?: string;
    background?: string;
    hairColor?: string;
    eyeColor?: string;
    fakeBoobs?: string;
    tattoos?: string;
    piercings?: string;
    interests?: string;
    videoWatched?: number;
    turnOns?: string;
    turnOffs?: string;
    videoViews?: number;
    profileViews?: number;
    socials: {
        website?: string;
        twitter?: string;
        instagram?: string;
        snapchat?: string;
        modelhub?: string;
        amazonWishList?: string;
    };
}

interface PornstarPage {
    name: string;
    about: string;
    bio: string;
    avatar: string;
    cover: string;
    rank: number;
    verified: boolean;
    awarded: boolean;
    premium: boolean;
    subscribers: number;
    featuredIn: {
        name: string;
        url: string;
    }[];
    uploadedVideoCount: number;
    taggedVideoCount: number;
    gender?: string;
    born?: string;
    birthPlace?: string;
    starSign?: string;
    measurements?: string;
    endowment?: string;
    relationship?: 'Open' | 'Taken' | 'Single' | (string & {});
    interestedIn?: string;
    cityAndCountry?: string;
    pornstarProfileViews?: number;
    careerStatus?: string;
    careerStartAndEnd?: string;
    height?: string;
    weight?: string;
    ethnicity?: string;
    background?: string;
    hairColor?: string;
    eyeColor?: string;
    fakeBoobs?: string;
    tattoos?: string;
    piercings?: string;
    interests?: string;
    videoWatched?: number;
    turnOns?: string;
    turnOffs?: string;
    videoViews?: number;
    profileViews?: number;
    socials: {
        website?: string;
        twitter?: string;
        instagram?: string;
        snapchat?: string;
        modelhub?: string;
        amazonWishList?: string;
    };
}

interface PhotoPage {
    info: {
        title: string;
        views: number;
        rating: string;
        albumID: string;
        url: string;
    };
    provider: {
        id: number;
        username: string;
        url: string;
    };
    tags: string[];
}

interface AlbumPage {
    photos: {
        url: string;
        views: string;
        rating: string;
        preview: string;
    }[];
    provider: {
        id: string;
        username: string;
        url: string;
    };
    tags: string[];
}

interface VideoPage {
    id: string;
    title: string;
    views: number;
    vote: {
        up: number;
        down: number;
        total: number;
        rating: number;
    };
    premium: boolean;
    thumb: string;
    videos: {
        url: string;
        quality: string;
        filename: string;
        extension: string;
    }[];
    provider: {
        username: string;
        url: string;
    } | null;
    /** video duration (in second) */
    duration: number;
    /** video duration formatted in "(HH:)mm:ss". eg. "32:09", "01:23:05" */
    durationFormatted: string;
    tags: string[];
    pornstars: string[];
    categories: string[];
}

interface WebmasterCategory {
    categories: Category[];
}
interface Category {
    id: string;
    category: string;
}

interface WebmasterDeleted {
    videos: DeletedVideo[];
}
interface DeletedVideo {
    vkey: string;
    deleted_on: string;
}

type WebmasterEmbed = {
    embed: {
        code: string;
    };
} | {
    code: string;
    message: string;
    example: string;
};

interface WebmasterSearch {
    videos: VideoResponse[];
}

interface WebmasterStars {
    stars: WebmasterStar[];
}
interface WebmasterStar {
    star: {
        star_name: string;
    };
}

interface WebmasterStarsDetailed {
    stars: {
        star: DetailedStar;
    }[];
}
interface DetailedStar {
    star_name: string;
    star_thumb: string;
    star_url: string;
    gender: 'male' | 'female' | (string & {});
    videos_count_all: string;
}

interface WebmasterTags {
    tagsCount: number;
    tags: string[];
}

interface WebmasterVideoById {
    video: VideoResponse;
}

type WebmasterVideoIsActive = {
    active: {
        video_id: string;
        is_active: '1' | '0';
    };
} | {
    code: string;
    message: string;
    example: string;
};

declare class WebMaster {
    private engine;
    constructor(engine: Engine);
    /**
     * Search video by keyword
     * @url https://www.pornhub.com/webmasters/search?search=keyword
     * @example
     * const results = await pornhub.webMaster.search('keyword', { page: 2, period: 'weekly' })
    */
    search(keyword: string, options?: WebmasterSearchOptions): Promise<VideoDetail[]>;
    /**
     * Get video information by url/id
     * @url https://www.pornhub.com/webmasters/video_by_id?id={ID}&thumbsize=large
     * @param urlOrId Video ID or page url
     * @param thumbsize Thumbnail photo size
     * @example
     * const video = await pornhub.webMaster.getVideo('ph5a9634c9a827e')
     */
    getVideo(urlOrId: string, thumbsize?: ThumbSize): Promise<VideoDetail>;
    /**
     * Get video active status by url/id (deleted video will be false)
     * @url https://www.pornhub.com/webmasters/is_video_active?id={ID}
     * @param urlOrId Video ID or page url
     * @example
     * const isActive = await pornhub.webMaster.isVideoActive('ph5a9634c9a827e')
    */
    isVideoActive(urlOrId: string): Promise<boolean>;
    /**
     * Get embed HTML code by video url/id
     * @url https://www.pornhub.com/webmasters/video_embed_code?id=ID
     * @param urlOrId Video ID or page url
     * @example
     * const code = await pornhub.webMaster.getVideoEmbedCode('ph5a9634c9a827e')
     * // <iframe src="https://www.pornhub.com/embed/xxxxxx" frameborder="0" width="560" height="340" scrolling="no" allowfullscreen></iframe>
    */
    getVideoEmbedCode(urlOrId: string): Promise<string | null>;
    /**
     * Get deleted video list by page
     * @url https://www.pornhub.com/webmasters/deleted_videos?page=1
     * @param page Page number, default: 1
     * @example
     * const deletedVideos = await pornhub.webMaster.getDeletedVideos(2)
    */
    getDeletedVideos(page?: number): Promise<DeletedVideo[]>;
    /**
     * Query tag list by the first letter of tag name
     * @url https://www.pornhub.com/webmasters/tags?list=a
     * @param letter First letter of tag name. Default: 'a'. Range: a-z.
     * @example
     * const tags = await pornhub.webMaster.getTags('s')
     * // ['solo', 'squirting', 'stockings', ...]
    */
    getTags(letter?: LowerLetter): Promise<string[]>;
    /**
     * Get category list
     * @url https://www.pornhub.com/webmasters/categories
     * @example
     * const categories = await pornhub.webMaster.getCategories()
     * // [{ id: "65", category: "threesome" }, { id: "105", category: "60fps" }]
    */
    getCategories(): Promise<Category[]>;
    /**
     * Get pornstar name list
     * @url https://www.pornhub.com/webmasters/stars
     * @example
     * const pornstars = await pornhub.webMaster.getPornstars()
    */
    getPornstars(): Promise<string[]>;
    /**
     * Get pornstar detail list
     * @url https://www.pornhub.com/webmasters/stars_detailed
     * const pornstars = await pornhub.webMaster.getPornstarsDetail()
    */
    getPornstarsDetail(): Promise<DetailedStar[]>;
}

declare class HttpStatusError extends Error {
}
declare class IllegalError extends Error {
}

declare class PornHub {
    engine: Engine;
    route: {
        mainPage(): string;
        authenticate(): string;
        logout(token: string): string;
        autocomplete(keyword: string, { token, sexualOrientation, }: AutoCompleteOptions): string;
        albumPage(id: string): string;
        photoPage(id: string): string;
        videoPage(id: string): string;
        pornstarPage(name: string): string;
        modelPage(name: string): string;
        channelPage(name: string): string;
        albumSearch(keyword: string, { page, segments, order, verified, }: AlbumSearchOptions): string;
        gifSearch(keyword: string, { page, order, sexualOrientation, }: GifSearchOptions): string;
        pornstarSearch(keyword: string, { page, order, }: PornstarSearchOptions): string;
        videoSearch(keyword: string, { page, order, hd, production, durationMin, durationMax, filterCategory, }: VideoSearchOptions): string;
    };
    webMaster: WebMaster;
    setAgent(agent: RequestInit['agent']): void;
    setHeader(key: string, value: string): void;
    setCookie(key: string, value: any): void;
    /**
     * See: https://github.com/pionxzh/Pornhub.js/issues/27
     * @deprecated This method is no longer needed.
     */
    warmup(): Promise<void>;
    /**
     * Login with account and password.
    */
    login(account: string, password: string): Promise<{
        success: boolean;
        message: string;
        premium: boolean;
    }>;
    /**
     * Logout from Pornhub.com.
    */
    logout(): Promise<{
        success: boolean;
        message: string;
    }>;
    /**
     * Get token from Pornhub.com.
     * Most of pornhub's api need this token.
     * You can cache this token to avoid frequent requests (I'm not sure about the expiration time!).
     *
     * For now, this token is only used for `autoComplete` and `searchModel`.
     * This library will automatically get token if you don't provide it.
     */
    getToken(): Promise<string>;
    /**
     * Get video information by url/ID
     * @param urlOrId Video ID or page url
    */
    video(urlOrId: string): Promise<VideoPage>;
    /**
     * Get album information by url/ID
     * @param urlOrId Album ID or page url
    */
    album(urlOrId: string): Promise<AlbumPage>;
    /**
     * Get photo information by url/ID
     * @param urlOrId Photo ID or page url
    */
    photo(urlOrId: string): Promise<PhotoPage>;
    /**
     * Get pornstar information by url/ID
     * @param urlOrName Pornstar name or page url
    */
    pornstar(urlOrName: string): Promise<PornstarPage>;
    /**
     * Get model information by url/ID
     * @param urlOrName Model name or page url
     */
    model(urlOrName: string): Promise<ModelPage>;
    /**
     * Get autocomplete result by keyword.
     */
    autoComplete(keyword: string, options?: AutoCompleteOptions): Promise<{
        models: {
            url: string;
            name: string;
            slug: string;
            rank: number;
        }[];
        pornstars: {
            url: string;
            name: string;
            slug: string;
            rank: number;
        }[];
        channels: {
            url: string;
            name: string;
            slug: string;
            rank: string;
        }[];
        queries?: string[] | undefined;
        albums?: string[] | undefined;
        isDdBannedWord: "true" | "false";
        popularSearches?: string[] | undefined;
    }>;
    /**
     * Search album by keyword.
     */
    searchAlbum(keyword: string, options?: AlbumSearchOptions): Promise<{
        data: AlbumSearchResult[];
        paging: Paging;
        counting: Counting;
    }>;
    /**
     * Search gif by keyword.
     */
    searchGif(keyword: string, options?: GifSearchOptions): Promise<{
        data: GifSearchResult[];
        paging: Paging;
        counting: Counting;
    }>;
    /**
     * Search pornstar by keyword.
     */
    searchPornstar(keyword: string, options?: PornstarSearchOptions): Promise<{
        data: PornstarSearchResult[];
        paging: Paging;
        counting: Counting;
    }>;
    /**
     * Search model by keyword.
     */
    searchModel(keyword: string, options?: AutoCompleteOptions): Promise<AutoCompleteResultItem<number>[]>;
    /**
     * Search video by keyword.
     */
    searchVideo(keyword: string, options?: VideoSearchOptions): Promise<{
        data: VideoSearchResult[];
        paging: Paging;
        counting: Counting;
    }>;
}

export { AlbumOrderingMapping, AlbumPage, AlbumSearchOptions, AlbumSearchOrdering, AlbumSearchResult, AutoCompleteOptions, Counting, GifOrderingMapping, GifSearchOptions, GifSearchOrdering, GifSearchResult, HttpStatusError, IllegalError, LowerLetter, ModelPage, Paging, PhotoPage, PornHub, PornstarOrderingMapping, PornstarPage, PornstarSearchOptions, PornstarSearchOrdering, PornstarSearchResult, SearchPeriod, Segment, SexualOrientation, ThumbSize, VideoDetail, VideoOrderingMapping, VideoPage, VideoResponse, VideoSearchOptions, VideoSearchOrdering, VideoSearchResult, WebmasterCategory, WebmasterDeleted, WebmasterEmbed, WebmasterSearch, WebmasterSearchOptions, WebmasterSearchOrdering, WebmasterStar, WebmasterStars, WebmasterStarsDetailed, WebmasterTags, WebmasterVideoById, WebmasterVideoIsActive };
