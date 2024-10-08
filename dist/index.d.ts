import { RequestInfo, RequestInit, Response, fetch } from 'undici';

declare class Request {
    private customFetch?;
    constructor(customFetch?: ((input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) | undefined);
    private _headers;
    private _cookieStore;
    setHeader(key: string, value: string): void;
    private _checkCookieExpired;
    private get cookieString();
    getCookies(): Record<string, string>;
    getCookie(key: string): string | undefined;
    setCookie(key: string, value: string): void;
    deleteCookie(key: string): void;
    private _checkStatus;
    private _parseCookieItem;
    private _handleSetCookie;
    private _buildParams;
    private _buildRequest;
    fetch(url: string, opts?: RequestInit): Promise<Response>;
    get(url: string): Promise<Response>;
    post<U extends object = any>(url: string, data: U): Promise<Response>;
    postForm<U extends object = any>(url: string, data: U): Promise<Response>;
}

declare class Engine {
    private customFetch?;
    BASE_URL: string;
    request: Request;
    warmedUp: boolean;
    constructor(customFetch?: ((input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) | undefined);
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
type VideoListOrdering = 'Featured Recently' | 'Most Viewed' | 'Top Rated' | 'Hottest' | 'Longest' | 'Newest';
type PornstarListOrdering = 'Most Popular' | 'Most Viewed' | 'Top Trending' | 'Most Subscribed' | 'Alphabetical' | 'No. of Videos' | 'Random';
type RecommendedOrdering = 'Most Relevant' | 'Most Recent';
declare const VideoOrderingMapping: Record<VideoSearchOrdering, string>;
declare const GifOrderingMapping: Record<GifSearchOrdering, string>;
declare const AlbumOrderingMapping: Record<AlbumSearchOrdering, string>;
declare const PornstarOrderingMapping: Record<PornstarSearchOrdering, string>;
declare const VideoListOrderingMapping: Record<VideoListOrdering, string>;
declare const PornstarListOrderingMapping: Record<PornstarListOrdering, string>;
declare const RecommendedOrderingMapping: Record<RecommendedOrdering, string>;

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
    sexualOrientation?: 'straight' | 'gay';
}
type VideoSearchOptions = {
    page?: number;
    hd?: boolean;
    production?: 'all' | 'professional' | 'homemade';
    durationMin?: 10 | 20 | 30;
    durationMax?: 10 | 20 | 30;
    /** Category id */
    filterCategory?: number;
    sexualOrientation?: 'straight' | 'gay';
} & ({
    order?: Exclude<VideoSearchOrdering, 'Most Viewed' | 'Top Rated'>;
} | {
    order: Extract<VideoSearchOrdering, 'Most Viewed' | 'Top Rated'>;
    period?: VideoSearchPeriod;
});
interface AutoCompleteOptions {
    token?: string;
    sexualOrientation?: SexualOrientation;
}
interface RecommendedOptions {
    order?: RecommendedOrdering;
    page?: number;
    sexualOrientation?: 'straight' | 'gay';
}

type SearchPeriod = 'weekly' | 'monthly' | 'alltime';
type PornstarSearchPopularPeriod = 'weekly' | 'monthly' | 'yearly';
type PornstarSearchViewedPeriod = 'daily' | 'weekly' | 'monthly' | 'alltime';
declare const PornstarPopularPeriodMapping: Record<PornstarSearchPopularPeriod, string>;
declare const PornstarViewedPeriodMapping: Record<PornstarSearchViewedPeriod, string>;
type VideoSearchPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'alltime';
declare const VideoSearchPeriodMapping: Record<VideoSearchPeriod, string>;

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
    thumbs: Array<{
        width: string;
        height: string;
        src: string;
    }>;
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
    thumbs: Array<{
        size: string;
        width: string;
        height: string;
        src: string;
    }>;
    tags: Array<{
        tag_name: string;
    }>;
    pornstars: Array<{
        pornstar_name: string;
    }>;
    categories: Array<{
        category: string;
    }>;
    segment: Segment;
}

declare const CountryMapping: {
    Argentina: string;
    Australia: string;
    Austria: string;
    Belgium: string;
    Brazil: string;
    Bulgaria: string;
    Canada: string;
    Chile: string;
    Croatia: string;
    'Czech Republic': string;
    Denmark: string;
    Egypt: string;
    Finland: string;
    France: string;
    Germany: string;
    Greece: string;
    Hungary: string;
    India: string;
    Ireland: string;
    Israel: string;
    Italy: string;
    Japan: string;
    Korea: string;
    Mexico: string;
    Morocco: string;
    Netherlands: string;
    'New Zealand': string;
    Norway: string;
    Pakistan: string;
    Poland: string;
    Portugal: string;
    Romania: string;
    Russia: string;
    Serbia: string;
    Slovakia: string;
    Spain: string;
    Sweden: string;
    Switzerland: string;
    'United Kingdom': string;
    Ukraine: string;
    'United States': string;
    World: string;
};
type Country = keyof typeof CountryMapping;

type VideoListOptions = {
    page?: number;
    hd?: boolean;
    production?: 'all' | 'professional' | 'homemade';
    durationMin?: 10 | 20 | 30;
    durationMax?: 10 | 20 | 30;
    /** Category id */
    filterCategory?: number;
    sexualOrientation?: SexualOrientation;
} & ({
    order?: Exclude<VideoListOrdering, 'Most Viewed' | 'Top Rated' | 'Hottest'>;
} | {
    order: Extract<VideoListOrdering, 'Most Viewed' | 'Top Rated'>;
    period?: VideoSearchPeriod;
} | {
    order: Extract<VideoListOrdering, 'Hottest'>;
    country?: Country;
});
type PornstarListOptions = {
    gay?: boolean;
    performerType?: 'pornstar' | 'amateur' | (string & {});
    gender?: 'male' | 'female' | 'm2f' | 'f2m' | (string & {});
    ethnicity?: 'asian' | 'black' | 'indian' | 'latin' | 'middle eastern' | 'mixed' | 'white' | 'other' | (string & {});
    tattoos?: boolean;
    cup?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F-Z' | (string & {});
    piercings?: boolean;
    hair?: 'auburn' | 'bald' | 'black' | 'blonde' | 'brown' | 'brunette' | 'grey' | 'red' | 'various' | 'other' | (string & {});
    breastType?: 'natural' | 'fake' | (string & {});
    ageFrom?: 18 | 20 | 30 | 40;
    ageTo?: 20 | 30 | 40 | 99;
    page?: number;
} & ({
    order?: Exclude<PornstarListOrdering, 'Alphabetical' | 'Most Popular' | 'Most Viewed'>;
} | {
    order: 'Alphabetical';
    letter?: 'num' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
} | {
    order: 'Most Popular';
    timeRange?: PornstarSearchPopularPeriod;
} | {
    order: 'Most Viewed';
    timeRange?: PornstarSearchViewedPeriod;
});
interface ModelVideoListOptions {
    page?: number;
}

interface PornstarListResult {
    name: string;
    url: string;
    views: string;
    videoNum: number;
    rank: number;
    photo: string;
    verified: boolean;
    awarded: boolean;
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

interface VideoListResult {
    title: string;
    id: string;
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
type VideoSearchResult = VideoListResult;

interface ChannelsPage {
    name: string;
    avatar: string;
    rank: number;
    cover: string;
    videosFrontpage: string[];
    uploadedVideoCount: number;
    subscribers: number;
    videoViews?: number;
    website?: string;
    about: string;
    byChannel: string;
}

interface UsersPage {
    name: string;
    avatar: string;
    cover: string;
    about: string;
    subscribers: number;
    uploadedVideoCount: number;
    videoViews?: number;
    profileViews?: number;
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
    videosFrontpage: string[];
    featuredIn: Array<{
        name: string;
        url: string;
    }>;
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
    isGay?: boolean;
    socials: {
        website?: string;
        twitter?: string;
        instagram?: string;
        snapchat?: string;
        modelhub?: string;
        amazonWishList?: string;
    };
    mostRecentVideos: VideoListResult[];
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
    featuredIn: Array<{
        name: string;
        url: string;
    }>;
    uploadedVideoCount: number;
    taggedVideoCount: number;
    videosFrontpage: string[];
    weeklyRank: number;
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
    photos: Array<{
        url: string;
        views: string;
        rating: string;
        preview: string;
    }>;
    provider: {
        id: string;
        username: string;
        url: string;
    };
    tags: string[];
}

interface VideoPage {
    id: string;
    url: string;
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
    preview: string;
    /**
     * @deprecated We no longer support video download. Use alternative tools such as `yt-dlp` instead.
     */
    videos: Array<{
        url: string;
        quality: string;
        filename: string;
        extension: string;
    }>;
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
    uploadDate: Date;
}

interface WebmasterCategory {
    categories: Category[];
}
interface Category {
    /**
     * The official API is inconsistent with the type of id.
     * Sometimes it's all numbers, sometimes it's all strings.
     */
    id: number | string;
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
    stars: Array<{
        star: DetailedStar;
    }>;
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
    search(keyword: string, options?: WebmasterSearchOptions): Promise<(VideoDetail | undefined)[]>;
    /**
     * Get video information by url/id
     * @url https://www.pornhub.com/webmasters/video_by_id?id={ID}&thumbsize=large
     * @param urlOrId Video ID or page url
     * @param thumbsize Thumbnail photo size
     * @example
     * const video = await pornhub.webMaster.getVideo('ph5a9634c9a827e')
     */
    getVideo(urlOrId: string, thumbsize?: ThumbSize): Promise<VideoDetail | undefined>;
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
    private customFetch?;
    engine: Engine;
    webMaster: WebMaster;
    route: {
        mainPage(): string;
        authenticate(): string;
        logout(token: string): string;
        autocomplete(keyword: string, { token, sexualOrientation }: AutoCompleteOptions): string;
        albumPage(id: string): string;
        photoPage(id: string): string;
        videoPage(id: string): string;
        pornstarPage(name: string): string;
        modelPage(name: string): string;
        userPage(name: string): string;
        modelPageWithVideos(name: string): string;
        pornstarPageWithVideos(name: string): string;
        modelVideosPage(name: string, page: number): string;
        channelPage(name: string): string;
        channelPageWithVideos(name: string): string;
        randomPage(): string;
        recommendedPage({ order, page, sexualOrientation }: RecommendedOptions): string;
        albumSearch(keyword: string, { page, segments, order, verified, }: AlbumSearchOptions): string;
        gifSearch(keyword: string, { page, order, sexualOrientation }: GifSearchOptions): string;
        pornstarSearch(keyword: string, { page, order, sexualOrientation }: PornstarSearchOptions): string;
        videoSearch(keyword: string, param: VideoSearchOptions): string;
        videoList(param: VideoListOptions): string;
        pornstarList(param: PornstarListOptions): string;
    };
    constructor(customFetch?: typeof fetch | undefined);
    getCookies(): Record<string, string>;
    getCookie(key: string): string | undefined;
    setCookie(key: string, value: string): void;
    deleteCookie(key: string): void;
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
     * This library will automatically get the token if you don't provide one.
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
     * Get pornstar information with videos by url/ID
     * @param urlOrName Pornstar name or page url
     */
    pornstarVideo(urlOrName: string, page?: number): Promise<PornstarPage>;
    /**
     * Get model information by url/ID
     * @param urlOrName Model name or page url
     */
    model(urlOrName: string): Promise<ModelPage>;
    /**
     * Get user information by url/ID
     * @param urlOrName user name or page url
     */
    user(urlOrName: string): Promise<UsersPage>;
    /**
     * Get model information with videos by url/ID
     * @param urlOrName Model name or page url
     */
    modelVideo(urlOrName: string, page?: number, startPageFix?: boolean): Promise<ModelPage>;
    /**
     * Get channel information by url/ID
     * @param urlOrName Channel name or page url
     */
    channels(urlOrName: string): Promise<ChannelsPage>;
    /**
     * Get channel information with videos by url/ID
     * @param urlOrName Channel name or page url
     */
    channelsVideo(urlOrName: string, page?: number): Promise<ChannelsPage>;
    /**
     * Get list of model's uploaded videos
     * @param urlOrName Model name or page url
     * @param options Options including page number
     */
    modelVideos(urlOrName: string, options?: ModelVideoListOptions): Promise<{
        data: VideoListResult[];
        paging: Paging;
        counting: Counting;
    }>;
    /**
     * Get a random video.
     * @returns The same object as `video()`
     */
    randomVideo(): Promise<VideoPage>;
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
        data: VideoListResult[];
        paging: Paging;
        counting: Counting;
    }>;
    /**
     * Get video list.
     */
    videoList(options?: VideoListOptions): Promise<{
        data: VideoListResult[];
        paging: Paging;
        counting: Counting;
    }>;
    /**
     * Get pornstar list.
     */
    pornstarList(options?: PornstarListOptions): Promise<{
        data: PornstarListResult[];
        paging: Paging;
    }>;
    /**
     * Get recommended videos.
     */
    recommendedVideos(options?: RecommendedOptions): Promise<{
        data: VideoListResult[];
        paging: Paging;
    }>;
}

export { AlbumOrderingMapping, AlbumPage, AlbumSearchOptions, AlbumSearchOrdering, AlbumSearchResult, AutoCompleteOptions, ChannelsPage, Counting, GifOrderingMapping, GifSearchOptions, GifSearchOrdering, GifSearchResult, HttpStatusError, IllegalError, LowerLetter, ModelPage, Paging, PhotoPage, PornHub, PornstarListOrdering, PornstarListOrderingMapping, PornstarListResult, PornstarOrderingMapping, PornstarPage, PornstarPopularPeriodMapping, PornstarSearchOptions, PornstarSearchOrdering, PornstarSearchPopularPeriod, PornstarSearchResult, PornstarSearchViewedPeriod, PornstarViewedPeriodMapping, RecommendedOptions, RecommendedOrdering, RecommendedOrderingMapping, SearchPeriod, Segment, SexualOrientation, ThumbSize, UsersPage, VideoDetail, VideoListOrdering, VideoListOrderingMapping, VideoListResult, VideoOrderingMapping, VideoPage, VideoResponse, VideoSearchOptions, VideoSearchOrdering, VideoSearchPeriod, VideoSearchPeriodMapping, VideoSearchResult, WebmasterCategory, WebmasterDeleted, WebmasterEmbed, WebmasterSearch, WebmasterSearchOptions, WebmasterSearchOrdering, WebmasterStar, WebmasterStars, WebmasterStarsDetailed, WebmasterTags, WebmasterVideoById, WebmasterVideoIsActive };
