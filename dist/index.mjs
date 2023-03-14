// src/apis/route.ts
import urlcatM from "urlcat";

// src/utils/constant.ts
var BASE_URL = "https://www.pornhub.com";

// src/utils/string.ts
function searchify(keyword) {
  return keyword.replace(/[^a-zA-Z0-9\s]/g, " ").trim().split(/\s+/).join("+");
}
function dashify(keywords) {
  if (!Array.isArray(keywords))
    return keywords.trim();
  return keywords.map((keyword) => keyword.trim()).filter((keyword) => keyword.length > 0).sort((a, b) => a.localeCompare(b)).join("-");
}
function slugify(keyword) {
  return keyword.replace(/[^a-zA-Z0-9\s]/g, " ").trim().split(/\s+/).join("-");
}

// src/types/SearchOrdering.ts
var VideoOrderingMapping = {
  "Most Relevant": "",
  "Most Recent": "mr",
  "Most Viewed": "mv",
  "Top Rated": "tr",
  "Longest": "lg"
};
var GifOrderingMapping = {
  "Most Relevant": "",
  "Most Recent": "mr",
  "Most Viewed": "mv",
  "Top Rated": "tr"
};
var AlbumOrderingMapping = {
  "Most Relevant": "",
  "Most Recent": "mr",
  "Most Viewed": "mv",
  "Top Rated": "tr"
};
var PornstarOrderingMapping = {
  "Most Relevant": "",
  "Most Popular": "mp",
  "Most Viewed": "mv",
  "No. of Video": "nv"
};

// src/apis/route.ts
var urlcat = urlcatM.default ?? urlcatM;
var Route = {
  mainPage() {
    return BASE_URL;
  },
  /**
   * @url https://www.pornhub.com/front/authenticate
   */
  authenticate() {
    return urlcat(BASE_URL, "/front/authenticate");
  },
  /**
   * @url https://www.pornhub.com/user/logout
   */
  logout(token) {
    return urlcat(BASE_URL, "/user/logout", { token });
  },
  /**
   * @url https://www.pornhub.com/video/search_autocomplete?q=random&orientation=straight&pornstars=1&alt=0&token=xxx
   */
  autocomplete(keyword, {
    token,
    sexualOrientation = "straight"
  }) {
    return urlcat(BASE_URL, "/video/search_autocomplete", {
      q: keyword,
      orientation: sexualOrientation,
      pornstars: true,
      token,
      alt: 0
    });
  },
  albumPage(id) {
    return urlcat(BASE_URL, "/album/:id", { id });
  },
  photoPage(id) {
    return urlcat(BASE_URL, "/photo/:id", { id });
  },
  videoPage(id) {
    return urlcat(BASE_URL, "/view_video.php", { viewkey: id });
  },
  pornstarPage(name) {
    return urlcat(BASE_URL, "/pornstar/:name", { name });
  },
  modelPage(name) {
    return urlcat(BASE_URL, "/model/:name", { name });
  },
  modelPageWithVideos(name) {
    return urlcat(BASE_URL, "/model/:name/videos", { name });
  },
  channelPage(name) {
    return urlcat(BASE_URL, "/channels/:name", { name });
  },
  /**
   * @url https://www.pornhub.com/albums/female-straight-uncategorized?search=random
   */
  albumSearch(keyword, {
    page = 1,
    segments = "female-straight-uncategorized",
    order = "Most Relevant",
    verified = false
  }) {
    const o = AlbumOrderingMapping[order];
    return urlcat(BASE_URL, "/albums/:segment", {
      segment: dashify(segments),
      search: searchify(keyword),
      page,
      ...o && { o },
      ...verified && { verified: "1" }
    });
  },
  /**
   * @url https://www.pornhub.com/gifs/search?search=xxx
   */
  gifSearch(keyword, {
    page = 1,
    order = "Most Relevant",
    sexualOrientation = "straight"
  }) {
    const o = GifOrderingMapping[order];
    const pathTemplate = sexualOrientation === "straight" ? "/gifs/search" : "/:sexualOrientation/gifs/search";
    return urlcat(BASE_URL, pathTemplate, {
      ...sexualOrientation !== "straight" && { sexualOrientation },
      search: searchify(keyword),
      ...page !== 1 && { page },
      ...o && { o }
    });
  },
  /**
   * @url https://www.pornhub.com/pornstars/search?search=hot
   */
  pornstarSearch(keyword, {
    page = 1,
    order = "Most Relevant"
  }) {
    const o = PornstarOrderingMapping[order];
    return urlcat(BASE_URL, "/pornstars/search", {
      search: searchify(keyword),
      ...page !== 1 && { page },
      ...o && { o }
    });
  },
  /**
   * @url https://www.pornhub.com/video/search?search=random
   */
  videoSearch(keyword, {
    page = 1,
    order = "Most Relevant",
    hd = false,
    production = "all",
    durationMin,
    durationMax,
    filterCategory
  }) {
    const o = VideoOrderingMapping[order];
    return urlcat(BASE_URL, "/video/search", {
      search: searchify(keyword),
      ...page !== 1 && { page },
      ...o && { o },
      ...hd && { hd: "1" },
      ...production !== "all" && { p: production },
      ...durationMin && { min_duration: durationMin },
      ...durationMax && { max_duration: durationMax },
      ...filterCategory && { filter_category: filterCategory }
    });
  }
};
var WebmasterBaseUrl = urlcat(BASE_URL, "/webmasters");
var WebmasterRoute = {
  isVideoActive(id) {
    return urlcat(WebmasterBaseUrl, "/is_video_active", { id });
  },
  categories() {
    return urlcat(WebmasterBaseUrl, "/categories");
  },
  deletedVideos(page) {
    return urlcat(WebmasterBaseUrl, "/deleted_videos", { page });
  },
  video_embed_code(id) {
    return urlcat(WebmasterBaseUrl, "/video_embed_code", { id });
  },
  stars_detailed() {
    return urlcat(WebmasterBaseUrl, "/stars_detailed");
  },
  stars() {
    return urlcat(WebmasterBaseUrl, "/stars");
  },
  tags(letter) {
    return urlcat(WebmasterBaseUrl, "/tags", { list: letter });
  },
  video_by_id(id, thumbsize) {
    return urlcat(WebmasterBaseUrl, "/video_by_id", { id, thumbsize });
  },
  search(keyword, options = {}) {
    var _a, _b, _c;
    const query = {
      "search": keyword.split(" ").join("+"),
      "page": options.page,
      "period": options.period,
      "ordering": options.ordering,
      "thumbsize": options.thumbsize,
      "tags[]": (_a = options.tags) == null ? void 0 : _a.join(","),
      "stars[]": (_b = options.stars) == null ? void 0 : _b.join(","),
      "category": (_c = options.category) == null ? void 0 : _c.join(",")
    };
    return urlcat(WebmasterBaseUrl, "/search", query);
  }
};

// src/apis/getMainPage.ts
async function getMainPage(engine) {
  const html = await engine.request.raw(Route.mainPage());
  return html;
}

// src/utils/cheerio.ts
import * as cheerio from "cheerio";
function getCheerio(html) {
  return cheerio.load(html);
}
function getAttribute(el, name, defaultValue) {
  return el.attr(name) ?? defaultValue;
}
function getDataAttribute(el, name, defaultValue) {
  return el.data(name) ?? defaultValue;
}

// src/apis/login.ts
async function login(engine, account, password) {
  if (!account || typeof account !== "string")
    throw new Error("Invalid Account");
  if (!password || typeof password !== "string")
    throw new Error("Invalid Password");
  const { token, redirect } = await getToken(engine);
  const result = await sendLoginForm(engine, account, password, token, redirect);
  if (result.success) {
    return {
      success: true,
      message: "Successfully logged in.",
      premium: result.premium_redirect_cookie === "1"
    };
  } else {
    return {
      success: false,
      message: `Login fail, Reason: ${result.message}`,
      premium: false
    };
  }
}
async function getToken(engine) {
  try {
    const html = await getMainPage(engine);
    const $ = getCheerio(html);
    const token = $('[name="token"]').attr("value") || "";
    const redirect = $('[name="redirect"]').attr("value") || "";
    return { token, redirect };
  } catch (err) {
    return await Promise.reject(err);
  }
}
function sendLoginForm(engine, account, password, token, redirect) {
  const data = {
    redirect,
    token,
    remember_me: 1,
    from: "pc_login_modal_:show",
    username: account,
    password,
    setSendTip: false
  };
  return engine.request.postForm(Route.authenticate(), data);
}

// src/apis/logout.ts
async function logout(engine) {
  try {
    const mainPage = await getMainPage(engine);
    const result = /href="\/user\/logout\?token=([a-zA-Z0-9-_.]*?)"/.exec(mainPage);
    if (!result)
      throw new Error("Logout failed");
    const token = result[1];
    await engine.request.get(Route.logout(token));
    return {
      success: true,
      message: "Successfully logged out"
    };
  } catch (err) {
    return Promise.reject(err);
  }
}

// src/core/request.ts
import { URLSearchParams } from "url";
import createDebug from "debug";

// src/utils/error.ts
var HttpStatusError = class extends Error {
};
var IllegalError = class extends Error {
};

// src/core/request.ts
import fetch from "node-fetch";
var debug = createDebug("request");
var Request = class {
  constructor(customFetch) {
    this.customFetch = customFetch;
  }
  _agent;
  _headers = {};
  _cookie = /* @__PURE__ */ new Map();
  setAgent(agent) {
    this._agent = agent;
  }
  setHeader(key, value) {
    this._headers[key] = value;
  }
  get cookie() {
    return Array.from(this._cookie).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("; ");
  }
  setCookie(key, value) {
    this._cookie.set(key, value);
  }
  async checkStatus(res) {
    if (res.ok)
      return res;
    if (res.status === 404) {
      let html = "";
      try {
        html = await res.text();
      } catch (error) {
      }
      if (/class="deterrenceWarn"/.test(html)) {
        const $ = getCheerio(html);
        const warning = $(".deterrenceWarn").text();
        if (warning) {
          return Promise.reject(new IllegalError(warning));
        }
      }
    }
    return Promise.reject(new HttpStatusError(`${res.status} ${res.statusText}`));
  }
  parseCookieItem(str) {
    if (str.includes(";"))
      str = str.split(";")[0];
    return str.split("=");
  }
  handleSetCookie(res) {
    if (!res.headers.raw()["set-cookie"])
      return res;
    res.headers.raw()["set-cookie"].forEach((item) => {
      const [key, value] = this.parseCookieItem(item);
      this._cookie.set(key, value);
    });
    this.setHeader("Cookie", this.cookie);
    return res;
  }
  toJson(res) {
    const contentType = res.headers.get("content-type") || "";
    return contentType.includes("json") ? res.json() : res.text();
  }
  buildParams(data) {
    const params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    return params;
  }
  buildRequest(method, url, data) {
    const opts = {};
    const headers = Object.assign({}, this._headers);
    if (method === "get")
      opts.method = "get";
    if (method === "post") {
      headers["Content-Type"] = "application/json";
      opts.method = "post";
      opts.body = JSON.stringify(data);
    }
    if (method === "post-form") {
      opts.method = "post";
      if (data)
        opts.body = this.buildParams(data);
    }
    headers && (opts.headers = headers);
    this._agent && (opts.agent = this._agent);
    if (this.customFetch) {
      debug(`Custom fetch: ${url}`);
      return this.customFetch(url, opts).then((res) => this.checkStatus(res)).then((res) => this.handleSetCookie(res)).then((res) => this.toJson(res)).catch((err) => Promise.reject(err));
    }
    return fetch(url, opts).then((res) => this.checkStatus(res)).then((res) => this.handleSetCookie(res)).then((res) => this.toJson(res)).catch((err) => Promise.reject(err));
  }
  get(url) {
    debug(`GET ${url}`);
    return this.buildRequest("get", url);
  }
  post(url, data) {
    debug(`POST ${url}`);
    return this.buildRequest("post", url, data);
  }
  postForm(url, data) {
    debug(`POST ${url}`);
    return this.buildRequest("post-form", url, data);
  }
  raw(url) {
    debug(`GET ${url}`);
    return this.buildRequest("get", url);
  }
};

// src/core/engine.ts
var Engine = class {
  constructor(customFetch) {
    this.customFetch = customFetch;
    this.request = new Request(this.customFetch);
    this.request.setHeader("Host", this.BASE_URL.replace("https://", ""));
    this.request.setHeader("Origin", this.BASE_URL);
    this.request.setHeader("Referer", `${this.BASE_URL}/`);
    this.request.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36");
    this.request.setCookie("platform", "pc");
  }
  BASE_URL = BASE_URL;
  request;
  // Flag to indicate whether the engine has visited the main page to get the cookies.
  // See issue: https://github.com/pionxzh/Pornhub.js/issues/27
  warmedUp = false;
};

// src/apis/webmaster/categories.ts
async function categories(engine) {
  try {
    const result = await engine.request.get(WebmasterRoute.categories());
    return result.categories.sort((a, b) => +a.id - +b.id);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/apis/webmaster/deleted.ts
async function deleted(engine, page) {
  try {
    const result = await engine.request.get(WebmasterRoute.deletedVideos(page));
    return result.videos;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/utils/url.ts
var UrlParser = class {
  static getVideoID(url) {
    const UrlRule = /[\w]+\.pornhub\.com\/view_video\.php\?viewkey=([a-zA-z0-9]{1,30})/;
    const id = UrlRule.test(url) ? UrlRule.exec(url)[1] : url;
    return id;
  }
  static getAlbumID(url) {
    const UrlRule = /[\w]+\.pornhub\.com\/album\/([0-9]{1,30})/;
    const id = UrlRule.test(url) ? UrlRule.exec(url)[1] : url;
    return id;
  }
  static getPhotoID(url) {
    const UrlRule = /[\w]+\.pornhub\.com\/photo\/([0-9]{1,30})/;
    const id = UrlRule.test(url) ? UrlRule.exec(url)[1] : url;
    return id;
  }
  static getPornstarName(url) {
    const UrlRule = /[\w]+\.pornhub\.com\/pornstar\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
  static getModelName(url) {
    const UrlRule = /[\w]+\.pornhub\.com\/model\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
  static getModelNameVideoPage(url) {
    url = url.replace(/\/videos$/, "");
    const UrlRule = /[\w]+\.pornhub\.com\/model\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
  static getChannelName(url) {
    const UrlRule = /[\w]+\.pornhub\.com\/channels\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
};

// src/apis/webmaster/embed.ts
async function video_embed_code(engine, urlOrId) {
  try {
    const id = UrlParser.getVideoID(urlOrId);
    const result = await engine.request.get(WebmasterRoute.video_embed_code(id));
    if ("code" in result)
      throw new Error(result.message);
    return result.embed.code.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
  } catch (err) {
    console.error(err);
    return null;
  }
}

// src/apis/webmaster/utils/videoTransform.ts
function videoTransform(response) {
  if (!response) {
    return void 0;
  }
  const {
    duration,
    views,
    video_id,
    rating,
    ratings,
    title,
    url,
    default_thumb,
    thumb,
    publish_date,
    thumbs,
    tags: tags2,
    pornstars,
    categories: categories2,
    segment
  } = response;
  const total = ratings;
  const up = Math.round(total * rating / 100);
  const down = total - up;
  const vote = { up, down, total, rating: Math.round(rating * 100) / 100 };
  return {
    duration,
    views,
    video_id,
    vote,
    title,
    url,
    default_thumb,
    thumb,
    publish_date,
    thumbs: thumbs.map(({ width, height, src }) => ({ width, height, src })),
    tags: tags2.map((x) => x.tag_name),
    pornstars: pornstars.map((x) => x.pornstar_name),
    categories: categories2.map((x) => x.category),
    segment
  };
}

// src/apis/webmaster/search.ts
async function search(engine, keyword, options) {
  try {
    const result = await engine.request.get(WebmasterRoute.search(keyword, options));
    return result.videos.map((x) => videoTransform(x));
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/apis/webmaster/stars.ts
async function stars(engine) {
  try {
    const result = await engine.request.get(WebmasterRoute.stars());
    return result.stars.map((x) => x.star.star_name);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/apis/webmaster/stars_detailed.ts
async function stars_detailed(engine) {
  try {
    const result = await engine.request.get(WebmasterRoute.stars_detailed());
    return result.stars.map((x) => x.star);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/apis/webmaster/tags.ts
async function tags(engine, letter) {
  try {
    const result = await engine.request.get(WebmasterRoute.tags(letter));
    return result.tags;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/apis/webmaster/video_by_id.ts
async function video_by_id(engine, urlOrId, thumbsize = "large") {
  const id = UrlParser.getVideoID(urlOrId);
  const result = await engine.request.get(WebmasterRoute.video_by_id(id, thumbsize));
  return videoTransform(result.video);
}

// src/apis/webmaster/video_is_active.ts
async function video_is_active(engine, urlOrId) {
  try {
    const id = UrlParser.getVideoID(urlOrId);
    const result = await engine.request.get(WebmasterRoute.isVideoActive(id));
    if ("code" in result)
      throw new Error(result.message);
    return result.active.is_active === "1";
  } catch (err) {
    console.error(err);
    return false;
  }
}

// src/core/webmaster.ts
var WebMaster = class {
  constructor(engine) {
    this.engine = engine;
  }
  /**
   * Search video by keyword
   * @url https://www.pornhub.com/webmasters/search?search=keyword
   * @example
   * const results = await pornhub.webMaster.search('keyword', { page: 2, period: 'weekly' })
  */
  search(keyword, options = {}) {
    return search(this.engine, keyword, options);
  }
  /**
   * Get video information by url/id
   * @url https://www.pornhub.com/webmasters/video_by_id?id={ID}&thumbsize=large
   * @param urlOrId Video ID or page url
   * @param thumbsize Thumbnail photo size
   * @example
   * const video = await pornhub.webMaster.getVideo('ph5a9634c9a827e')
   */
  getVideo(urlOrId, thumbsize) {
    return video_by_id(this.engine, urlOrId, thumbsize);
  }
  /**
   * Get video active status by url/id (deleted video will be false)
   * @url https://www.pornhub.com/webmasters/is_video_active?id={ID}
   * @param urlOrId Video ID or page url
   * @example
   * const isActive = await pornhub.webMaster.isVideoActive('ph5a9634c9a827e')
  */
  isVideoActive(urlOrId) {
    return video_is_active(this.engine, urlOrId);
  }
  /**
   * Get embed HTML code by video url/id
   * @url https://www.pornhub.com/webmasters/video_embed_code?id=ID
   * @param urlOrId Video ID or page url
   * @example
   * const code = await pornhub.webMaster.getVideoEmbedCode('ph5a9634c9a827e')
   * // <iframe src="https://www.pornhub.com/embed/xxxxxx" frameborder="0" width="560" height="340" scrolling="no" allowfullscreen></iframe>
  */
  getVideoEmbedCode(urlOrId) {
    return video_embed_code(this.engine, urlOrId);
  }
  /**
   * Get deleted video list by page
   * @url https://www.pornhub.com/webmasters/deleted_videos?page=1
   * @param page Page number, default: 1
   * @example
   * const deletedVideos = await pornhub.webMaster.getDeletedVideos(2)
  */
  getDeletedVideos(page = 1) {
    return deleted(this.engine, page);
  }
  /**
   * Query tag list by the first letter of tag name
   * @url https://www.pornhub.com/webmasters/tags?list=a
   * @param letter First letter of tag name. Default: 'a'. Range: a-z.
   * @example
   * const tags = await pornhub.webMaster.getTags('s')
   * // ['solo', 'squirting', 'stockings', ...]
  */
  getTags(letter = "a") {
    return tags(this.engine, letter);
  }
  /**
   * Get category list
   * @url https://www.pornhub.com/webmasters/categories
   * @example
   * const categories = await pornhub.webMaster.getCategories()
   * // [{ id: "65", category: "threesome" }, { id: "105", category: "60fps" }]
  */
  getCategories() {
    return categories(this.engine);
  }
  /**
   * Get pornstar name list
   * @url https://www.pornhub.com/webmasters/stars
   * @example
   * const pornstars = await pornhub.webMaster.getPornstars()
  */
  getPornstars() {
    return stars(this.engine);
  }
  /**
   * Get pornstar detail list
   * @url https://www.pornhub.com/webmasters/stars_detailed
   * const pornstars = await pornhub.webMaster.getPornstarsDetail()
  */
  getPornstarsDetail() {
    return stars_detailed(this.engine);
  }
};

// src/scrapers/pages/album.ts
async function albumPage(engine, urlOrId) {
  const id = UrlParser.getAlbumID(urlOrId);
  const url = Route.albumPage(id);
  const html = await engine.request.raw(url);
  const $ = getCheerio(html);
  return {
    photos: parsePhotos($),
    provider: parseProvider($),
    tags: parseTag($)
  };
}
function parsePhotos($) {
  const $list = $("ul.photosAlbumsListing li.photoAlbumListContainer div.photoAlbumListBlock");
  const photos = $list.map((_, el) => {
    const item = $(el);
    const url = `${BASE_URL}${item.find("a").attr("href")}` || "";
    const views = item.find(".album-views").text().replace("Views: ", "").trim();
    const rating = item.find(".album-rating").text();
    const preview = getDataAttribute(item, "bkg", "");
    return { url, views, rating, preview };
  }).get();
  return photos;
}
function parseProvider($) {
  const $user = $("div.pfileInfoBox div.usernameWrap");
  const id = getDataAttribute($user, "userid", "");
  const username = $user.find("a").text();
  const url = getAttribute($user.find("a"), "href", "");
  return { id, username, url };
}
function parseTag($) {
  const $list = $("div.tagContainer > a");
  return $list.map((_, el) => $(el).text().trim()).get();
}

// src/scrapers/pages/photo.ts
async function photoPage(engine, urlOrId) {
  const id = UrlParser.getPhotoID(urlOrId);
  const url = Route.photoPage(id);
  const html = await engine.request.raw(url);
  const $ = getCheerio(html);
  return {
    info: parsePhoto($),
    provider: parseProvider2($),
    tags: parseTag2($)
  };
}
function parsePhoto($) {
  var _a;
  const photoWrapper = $("div#photoWrapper");
  const $img = photoWrapper.find("img");
  const title = $img.attr("alt") || "";
  const url = $img.attr("src") || "";
  const albumID = ((_a = photoWrapper.data("album-id")) == null ? void 0 : _a.toString()) || "";
  const rating = `${photoWrapper.find("span#votePercentageNumber").text()}%` || "";
  const viewsText = photoWrapper.find("section#photoInfoSection strong").text();
  const views = parseInt(removeComma(viewsText)) || 0;
  return {
    title,
    views,
    rating,
    albumID,
    url
  };
}
function parseProvider2($) {
  const $user = $("div#userInformation div.usernameWrap");
  const id = $user.data("userid");
  const username = $user.find("a").text();
  const url = $user.find("a").attr("href") || "";
  return { id, username, url };
}
function parseTag2($) {
  const $list = $("ul.tagList a.tagText");
  return $list.map((idx) => $list.eq(idx).text()).get();
}
function removeComma(str) {
  return str.replace(/,/g, "");
}

// src/utils/number.ts
function parseReadableNumber(viewsText) {
  if (!viewsText)
    return 0;
  const views = viewsText.replace(/,/g, "");
  if (views.includes("K")) {
    return parseFloat(views) * 1e3;
  } else if (views.includes("M")) {
    return parseFloat(views) * 1e6;
  } else if (views.includes("B")) {
    return parseFloat(views) * 1e9;
  } else {
    return parseFloat(views);
  }
}

// src/utils/time.ts
function toHHMMSS(sec) {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor(sec / 60) % 60;
  const seconds = sec % 60;
  return [hours, minutes, seconds].map((v) => v < 10 ? `0${v}` : v).filter((v, i) => v !== "00" || i > 0).join(":");
}

// src/scrapers/pages/video.ts
async function videoPage(engine, urlOrId) {
  const id = UrlParser.getVideoID(urlOrId);
  const url = Route.videoPage(id);
  const html = await engine.request.raw(url);
  const $ = getCheerio(html);
  return {
    id,
    ...parseByDom(html, $)
  };
}
function parseByDom(html, $) {
  var _a, _b, _c;
  const voteUp = parseReadableNumber($("span.votesUp").text() || "0");
  const voteDown = parseReadableNumber($("span.votesDown").text() || "0");
  const title = $("head > title").first().text().replace(" - Pornhub.com", "");
  const viewsText = $("span.count").text() || "0";
  const views = parseReadableNumber(viewsText);
  const vote = {
    up: voteUp,
    down: voteDown,
    total: voteUp + voteDown,
    rating: Math.round(voteUp / (voteUp + voteDown) * 100) / 100
  };
  const premium = $(".video-wrapper .ph-icon-badge-premium").length !== 0;
  const thumb = getAttribute($(".thumbnail img"), "src", "");
  const videos = parseVideo(html);
  const providerLink = $(".usernameBadgesWrapper a.bolded").first();
  const provider = providerLink.length ? { username: providerLink.text(), url: getAttribute(providerLink, "href", "") } : null;
  const trafficJunkyMeta = $("head meta[name=adsbytrafficjunkycontext]");
  const tags2 = ((_a = getDataAttribute(trafficJunkyMeta, "context-tag")) == null ? void 0 : _a.split(",")) || [];
  const pornstars = ((_b = getDataAttribute(trafficJunkyMeta, "context-pornstar")) == null ? void 0 : _b.split(",")) || [];
  const categories2 = ((_c = getDataAttribute(trafficJunkyMeta, "context-category")) == null ? void 0 : _c.split(",")) || [];
  const durationMeta = $('head meta[property="video:duration"]');
  const duration = +getAttribute(durationMeta, "content", 0);
  const durationFormatted = toHHMMSS(duration);
  return {
    title,
    views,
    vote,
    premium,
    thumb,
    videos,
    provider,
    tags: tags2,
    pornstars,
    categories: categories2,
    duration,
    durationFormatted
  };
}
function parseVideo(_html) {
  return [];
}

// src/scrapers/search/base.ts
function parsePaging($) {
  const current = parseInt($("li.page_current").text());
  const nextPage = $("li.page_next");
  const maxPage = nextPage.length ? parseInt($("li.page_next").prev("li").text()) : current;
  return {
    current,
    maxPage,
    isEnd: !nextPage.length
  };
}
function parseCounting($) {
  try {
    const counterStr = $(".showingCounter").text();
    const [, from = "0", to = "0", total = "0"] = /(\d+)-(\d+)\sof\s(\d+)/.exec(counterStr) || [];
    return {
      from: parseInt(from),
      to: parseInt(to),
      total: parseInt(total)
    };
  } catch (err) {
    return {
      from: 0,
      to: 0,
      total: 0
    };
  }
}

// src/scrapers/search/album.ts
async function albumSearch(engine, keyword, options) {
  const url = Route.albumSearch(keyword, options);
  const html = await engine.request.raw(url);
  const $ = getCheerio(html);
  return {
    data: parseResult($),
    paging: parsePaging($),
    counting: parseCounting($)
  };
}
function parseResult($) {
  const $list = $("ul#photosAlbumsSection li.photoAlbumListContainer div.photoAlbumListBlock");
  const result = $list.map((_, el) => {
    var _a;
    const item = $(el);
    const title = getAttribute(item, "title", "");
    const url = `${BASE_URL}${item.find("a").attr("href")}`;
    const rating = item.find(".album-photo-percentage").text();
    const preview = getDataAttribute(item, "bkg") || ((_a = getAttribute(item, "style", "").match(/url\("(.+)"\)/)) == null ? void 0 : _a[1]) || "";
    return { title, url, rating, preview };
  }).get();
  return result;
}

// src/scrapers/search/pornstar.ts
import urlcatM2 from "urlcat";
var urlcat2 = urlcatM2.default ?? urlcatM2;
async function pornstarSearch(engine, keyword, options) {
  const url = Route.pornstarSearch(keyword, options);
  const html = await engine.request.raw(url);
  const $ = getCheerio(html);
  return {
    data: parseResult2($),
    paging: parsePaging($),
    counting: parseCounting($)
  };
}
function parseResult2($) {
  const $list = $("ul#pornstarsSearchResult li div.wrap");
  const result = $list.map((_, el) => {
    const item = $(el);
    const path = getAttribute(item.find("a"), "href", "");
    const img = item.find("img");
    return {
      name: item.find(".title").text(),
      url: urlcat2(BASE_URL, path),
      views: item.find(".pstarViews").text().replace("views", "").trim() || "0",
      videoNum: parseInt(item.find(".videosNumber").text()) || 0,
      rank: parseInt(item.find(".rank_number").text()) || 0,
      photo: getDataAttribute(img, "thumb_url", "")
    };
  }).get();
  return result;
}

// src/scrapers/search/gif.ts
import urlcatM3 from "urlcat";

// src/utils/utils.ts
var removeProtectionBracket = (str) => str.replace(/\(.+?\)/g, "");

// src/scrapers/search/gif.ts
var urlcat3 = urlcatM3.default ?? urlcatM3;
async function gifSearch(engine, keyword, options) {
  const url = Route.gifSearch(keyword, options);
  const html = await engine.request.raw(url);
  const $ = getCheerio(html);
  return {
    data: parseResult3($),
    paging: parsePaging($),
    counting: parseCounting($)
  };
}
function parseResult3($) {
  const list = $("ul.gifLink li.gifVideoBlock ");
  const result = list.map((_, el) => {
    const item = $(el);
    const video = item.find("video");
    const poster = getAttribute(video, "poster", "");
    const path = getAttribute(item.find("a"), "href", "");
    return {
      title: item.find(".title").text(),
      url: urlcat3(BASE_URL, path),
      mp4: getDataAttribute(video, "mp4", ""),
      webm: getDataAttribute(video, "webm", ""),
      preview: removeProtectionBracket(poster)
    };
  }).get();
  return result;
}

// src/scrapers/search/video.ts
import urlcatM4 from "urlcat";
var urlcat4 = urlcatM4.default ?? urlcatM4;
async function videoSearch(engine, keyword, options) {
  const url = Route.videoSearch(keyword, options);
  const html = await engine.request.raw(url);
  const $ = getCheerio(html);
  return {
    data: parseResult4($),
    paging: parsePaging($),
    counting: parseCounting($)
  };
}
function parseResult4($) {
  const list = $("#videoSearchResult li.videoBox");
  const result = list.map((_, el) => {
    const item = $(el);
    const thumb = item.find(".linkVideoThumb").eq(0);
    const title = getAttribute(thumb, "title", "");
    const path = getAttribute(thumb, "href", "");
    const img = item.find("img");
    const preview = getAttribute(img, "src", "");
    return {
      title,
      url: urlcat4(BASE_URL, path),
      views: item.find(".videoDetailsBlock .views var").text(),
      duration: item.find(".duration").text(),
      hd: !!item.find(".hd-thumbnail").length,
      premium: !!item.find(".premiumIcon").length,
      freePremium: !!item.find(".marker-overlays .phpFreeBlock").length,
      preview
    };
  }).get();
  return result;
}

// src/apis/getToken.ts
async function getToken2(engine) {
  const html = await getMainPage(engine);
  const $ = getCheerio(html);
  const inputEl = $('form#search_form input[name="search"]');
  const token = getDataAttribute(inputEl, "token", null);
  if (!token)
    throw new Error("Failed to get token");
  return token;
}

// src/apis/autoComplete.ts
async function getAutoComplete(engine, keyword, options) {
  var _a, _b, _c;
  const token = options.token ?? await getToken2(engine);
  const result = await engine.request.get(Route.autocomplete(keyword, {
    ...options,
    token
  }));
  return {
    ...result,
    models: ((_a = result.models) == null ? void 0 : _a.map((item) => ({
      ...item,
      url: Route.modelPage(item.slug)
    })).sort((a, b) => a.rank - b.rank)) ?? [],
    pornstars: ((_b = result.pornstars) == null ? void 0 : _b.map((item) => ({
      ...item,
      url: Route.pornstarPage(item.slug)
    })).sort((a, b) => a.rank - b.rank)) ?? [],
    channels: ((_c = result.channels) == null ? void 0 : _c.map((item) => ({
      ...item,
      url: Route.channelPage(item.slug)
    })).sort((a, b) => +a.rank - +b.rank)) ?? []
  };
}

// src/scrapers/search/model.ts
async function modelSearch(engine, keyword, options = {}) {
  const result = await getAutoComplete(engine, keyword, options);
  return result.models;
}

// src/scrapers/pages/model.ts
var defaultMapper = (value) => value;
var yesNoMapper = (value) => value === "Yes";
var stripeSpaceMapper = (value) => value.split(/\s+/).join(" ");
var numberMapper = (value) => parseReadableNumber(value);
var DefaultMapper = {
  key: defaultMapper,
  value: defaultMapper
};
var KeyMapper = {
  "Relationship status": {
    key: () => "relationship",
    value: defaultMapper
  },
  "Interested in": {
    key: () => "interestedIn",
    value: defaultMapper
  },
  "Gender": {
    key: () => "gender",
    value: defaultMapper
  },
  "Height": {
    key: () => "height",
    value: defaultMapper
  },
  "Weight": {
    key: () => "weight",
    value: defaultMapper
  },
  "Ethnicity": {
    key: () => "ethnicity",
    value: defaultMapper
  },
  "Background": {
    key: () => "background",
    value: defaultMapper
  },
  "Hair Color": {
    key: () => "hairColor",
    value: defaultMapper
  },
  "Eye Color": {
    key: () => "eyeColor",
    value: defaultMapper
  },
  "Fake Boobs": {
    key: () => "fakeBoobs",
    value: yesNoMapper
  },
  "Tattoos": {
    key: () => "tattoos",
    value: yesNoMapper
  },
  "Piercings": {
    key: () => "piercings",
    value: yesNoMapper
  },
  "Video Views": {
    key: () => "videoViews",
    value: numberMapper
  },
  "Profile Views": {
    key: () => "profileViews",
    value: numberMapper
  },
  "Videos Watched": {
    key: () => "videoWatched",
    value: numberMapper
  },
  "Turn Ons": {
    key: () => "turnOns",
    value: defaultMapper
  },
  "Turn Offs": {
    key: () => "turnOffs",
    value: defaultMapper
  },
  "Interests and hobbies": {
    key: () => "interests",
    value: defaultMapper
  },
  "Born": {
    key: () => "born",
    value: defaultMapper
  },
  "Birth Place": {
    key: () => "birthPlace",
    value: defaultMapper
  },
  "Birthplace": {
    key: () => "birthPlace",
    value: defaultMapper
  },
  "Star Sign": {
    key: () => "starSign",
    value: defaultMapper
  },
  "Measurements": {
    key: () => "measurements",
    value: defaultMapper
  },
  "City and Country": {
    key: () => "cityAndCountry",
    value: defaultMapper
  },
  "Endowment": {
    key: () => "endowment",
    value: defaultMapper
  },
  "Career Status": {
    key: () => "careerStatus",
    value: defaultMapper
  },
  "Career Start and End": {
    key: () => "careerStartAndEnd",
    value: stripeSpaceMapper
  }
};
var parseVideoCount = (text) => {
  if (!text)
    return 0;
  const match = text.match(/Showing \d+-\d+ of (\d+)/);
  if (match)
    return parseReadableNumber(match[1]);
  return 0;
};
async function modelPage(engine, urlOrName) {
  const name = UrlParser.getModelName(urlOrName);
  if (!name)
    throw new Error(`Invalid model input: ${urlOrName}`);
  const url = Route.modelPage(name);
  const html = await engine.request.raw(url);
  const $ = getCheerio(html);
  return parseInfo($);
}
async function modelVideoPage(engine, urlOrName) {
  const name = UrlParser.getModelNameVideoPage(urlOrName);
  if (!name)
    throw new Error(`Invalid model input: ${urlOrName}`);
  const url = Route.modelPageWithVideos(name);
  const html = await engine.request.raw(url);
  const $ = getCheerio(html);
  return parseInfo($);
}
function parseInfo($) {
  const infoPieces = $("div.infoPiece").toArray();
  const info = Object.fromEntries(infoPieces.map((el) => {
    const item = $(el);
    const key = item.find("span:nth-child(1)").text().trim().replace(":", "");
    const value = item.find("span:nth-child(2)").text().trim() || item.text().replace(item.find("span:nth-child(1)").text(), "").trim();
    const mapper = KeyMapper[key] || DefaultMapper;
    return [mapper.key(key), mapper.value(value)];
  }));
  const name = $(".nameSubscribe > .name").text().trim();
  const rankEl = $("div.rankingInfo > .infoBox > span");
  const rank = parseReadableNumber(rankEl.text().trim());
  const weeklyRankEl = $("div.infoBoxes > div.rankingInfo > div.infoBox:nth-child(2) > span.big");
  const weeklyRank = parseReadableNumber(weeklyRankEl.text().trim());
  const linkEl = $("div.videoUList > ul.videos > li.videoBox > div.wrap > div.phimage > a");
  let videosFrontpage = [];
  linkEl.each((_, e) => {
    videosFrontpage.push($(e).attr("href"));
  });
  const avatarEl = $("img#getAvatar, .topProfileHeader > .thumbImage > img");
  const avatar = getAttribute(avatarEl, "src", "");
  const coverEl = $("img#coverPictureDefault, .topProfileHeader > .coverImage > img");
  const cover = getAttribute(coverEl, "src", "");
  const aboutEl = $("section.aboutMeSection > div:nth-child(2)");
  const about = aboutEl.text().trim();
  const bioEl = $('.biographyText .content div[itemprop="description"], .bio:not(:has(.aboutMeSection)) > .text');
  const bio = stripeSpaceMapper(bioEl.text().trim());
  const verifiedEl = $(".badge-username > .verifiedPornstar");
  const verified = !!verifiedEl.length;
  const awardEl = $(".badge-username > .trophyPornStar");
  const awarded = !!awardEl.length;
  const premiumEl = $(".badge-username > .premium-icon");
  const premium = !!premiumEl.length;
  const subscribersEl = $('div.tooltipTrig.infoBox[data-title^="Subscribers:"]');
  const subscribersText = getDataAttribute(subscribersEl, "title", "").replace("Subscribers: ", "");
  const subscribersText2 = $('div.infoBox:has(.title:contains("Subscribers")) > span').text().trim();
  const subscribers = parseReadableNumber(subscribersText) || parseReadableNumber(subscribersText2);
  const featuredIn = $("div.featuredIn > a").toArray().map((el) => {
    const item = $(el);
    const name2 = item.text().trim();
    const url = getAttribute(item, "href", "");
    return { name: name2, url };
  }).filter((item) => item.name && item.url);
  let uploadedVideoCount = 0;
  const taggedVideoCount = 0;
  if (verified) {
    const recentVideoCountEl = $(".mostRecentPornstarVideos > .pornstarVideosCounter");
    uploadedVideoCount = parseVideoCount(recentVideoCountEl.text().trim());
  } else {
  }
  const socials = {
    website: getAttribute($("a:has(.officialSiteIcon)"), "href"),
    twitter: getAttribute($("a:has(.twitterIcon)"), "href"),
    instagram: getAttribute($("a:has(.instagramIcon)"), "href"),
    snapchat: getAttribute($("a:has(.snapchatIcon)"), "href"),
    modelhub: getAttribute($("a:has(.modelhubIcon)"), "href"),
    amazonWishList: getAttribute($("a:has(.amazonWishlistIcon)"), "href") || getAttribute($("a:has(.amazonWLIcon)"), "href")
  };
  return {
    name,
    about,
    bio,
    avatar,
    cover,
    rank,
    videosFrontpage,
    weeklyRank,
    verified,
    awarded,
    premium,
    subscribers,
    featuredIn,
    uploadedVideoCount,
    taggedVideoCount,
    ...info,
    socials
  };
}

// src/scrapers/pages/pornstar.ts
var defaultMapper2 = (value) => value;
var yesNoMapper2 = (value) => value === "Yes";
var stripeSpaceMapper2 = (value) => value.split(/\s+/).join(" ");
var numberMapper2 = (value) => parseReadableNumber(value);
var DefaultMapper2 = {
  key: defaultMapper2,
  value: defaultMapper2
};
var KeyMapper2 = {
  "Relationship status": {
    key: () => "relationship",
    value: defaultMapper2
  },
  "Interested in": {
    key: () => "interestedIn",
    value: defaultMapper2
  },
  "Gender": {
    key: () => "gender",
    value: defaultMapper2
  },
  "Height": {
    key: () => "height",
    value: defaultMapper2
  },
  "Weight": {
    key: () => "weight",
    value: defaultMapper2
  },
  "Ethnicity": {
    key: () => "ethnicity",
    value: defaultMapper2
  },
  "Background": {
    key: () => "background",
    value: defaultMapper2
  },
  "Hair Color": {
    key: () => "hairColor",
    value: defaultMapper2
  },
  "Eye Color": {
    key: () => "eyeColor",
    value: defaultMapper2
  },
  "Fake Boobs": {
    key: () => "fakeBoobs",
    value: yesNoMapper2
  },
  "Tattoos": {
    key: () => "tattoos",
    value: yesNoMapper2
  },
  "Piercings": {
    key: () => "piercings",
    value: yesNoMapper2
  },
  "Video Views": {
    key: () => "videoViews",
    value: numberMapper2
  },
  "Profile Views": {
    key: () => "profileViews",
    value: numberMapper2
  },
  "Pornstar Profile Views": {
    key: () => "pornstarProfileViews",
    value: numberMapper2
  },
  "Videos Watched": {
    key: () => "videoWatched",
    value: numberMapper2
  },
  "Turn Ons": {
    key: () => "turnOns",
    value: defaultMapper2
  },
  "Turn Offs": {
    key: () => "turnOffs",
    value: defaultMapper2
  },
  "Interests and hobbies": {
    key: () => "interests",
    value: defaultMapper2
  },
  "Born": {
    key: () => "born",
    value: defaultMapper2
  },
  "Birth Place": {
    key: () => "birthPlace",
    value: defaultMapper2
  },
  "Birthplace": {
    key: () => "birthPlace",
    value: defaultMapper2
  },
  "Star Sign": {
    key: () => "starSign",
    value: defaultMapper2
  },
  "Measurements": {
    key: () => "measurements",
    value: defaultMapper2
  },
  "City and Country": {
    key: () => "cityAndCountry",
    value: defaultMapper2
  },
  "Endowment": {
    key: () => "endowment",
    value: defaultMapper2
  },
  "Career Status": {
    key: () => "careerStatus",
    value: defaultMapper2
  },
  "Career Start and End": {
    key: () => "careerStartAndEnd",
    value: stripeSpaceMapper2
  }
};
var parseVideoCount2 = (text) => {
  if (!text)
    return 0;
  const match = text.match(/Showing \d+-\d+ of (\d+)/);
  if (match)
    return parseReadableNumber(match[1]);
  return 0;
};
async function pornstarPage(engine, urlOrName) {
  const name = UrlParser.getPornstarName(urlOrName);
  if (!name)
    throw new Error(`Invalid pornstar input: ${urlOrName}`);
  const url = Route.pornstarPage(name);
  const html = await engine.request.raw(url);
  const $ = getCheerio(html);
  return parseInfo2($);
}
function parseInfo2($) {
  const infoPieces = $("div.infoPiece").toArray();
  const info = Object.fromEntries(infoPieces.map((el) => {
    const item = $(el);
    const key = item.find("span:nth-child(1)").text().trim().replace(":", "");
    const value = item.find("span:nth-child(2)").text().trim() || item.text().replace(item.find("span:nth-child(1)").text(), "").trim();
    const mapper = KeyMapper2[key] || DefaultMapper2;
    return [mapper.key(key), mapper.value(value)];
  }));
  const name = $(".nameSubscribe > .name").text().trim();
  const rankEl = $("div.rankingInfo > .infoBox > span");
  const rank = parseReadableNumber(rankEl.text().trim());
  const avatarEl = $("img#getAvatar, .topProfileHeader > .thumbImage > img");
  const avatar = getAttribute(avatarEl, "src", "");
  const coverEl = $("img#coverPictureDefault, .topProfileHeader > .coverImage > img");
  const cover = getAttribute(coverEl, "src", "");
  const aboutEl = $("section.aboutMeSection > div:nth-child(2)");
  const about = aboutEl.text().trim();
  const bioEl = $('.biographyText .content div[itemprop="description"], .bio:not(:has(.aboutMeSection)) > .text');
  const bio = stripeSpaceMapper2(bioEl.text().trim());
  const verifiedEl = $(".badge-username > .verifiedPornstar");
  const verified = !!verifiedEl.length;
  const awardEl = $(".badge-username > .trophyPornStar");
  const awarded = !!awardEl.length;
  const premiumEl = $(".badge-username > .premium-icon");
  const premium = !!premiumEl.length;
  const subscribersEl = $('div.tooltipTrig.infoBox[data-title^="Subscribers:"]');
  const subscribersText = getDataAttribute(subscribersEl, "title", "").replace("Subscribers: ", "");
  const subscribersText2 = $('div.infoBox:has(.title:contains("Subscribers")) > span').text().trim();
  const subscribers = parseReadableNumber(subscribersText) || parseReadableNumber(subscribersText2);
  const featuredIn = $("div.featuredIn > a").toArray().map((el) => {
    const item = $(el);
    const name2 = item.text().trim();
    const url = getAttribute(item, "href", "");
    return { name: name2, url };
  }).filter((item) => item.name && item.url);
  let uploadedVideoCount = 0;
  let taggedVideoCount = 0;
  if (verified) {
    const uploadedVideoCountEl = $(".pornstarUploadedVideos > .pornstarVideosCounter");
    uploadedVideoCount = parseVideoCount2(uploadedVideoCountEl.text().trim());
    const taggedVideoCountEl = $(".mostRecentPornstarVideos > .pornstarVideosCounter");
    taggedVideoCount = parseVideoCount2(taggedVideoCountEl.text().trim());
  } else {
    const videoCounter = $(".pornstarVideosCounter").first();
    if (videoCounter.length) {
      const title = videoCounter.parent().find(".sectionTitle > h2").first().text().trim();
      if (title.endsWith("Tagged Videos")) {
        taggedVideoCount = parseVideoCount2(videoCounter.text().trim());
      }
    }
  }
  const socials = {
    website: getAttribute($("a:has(.officialSiteIcon)"), "href"),
    twitter: getAttribute($("a:has(.twitterIcon)"), "href"),
    instagram: getAttribute($("a:has(.instagramIcon)"), "href"),
    snapchat: getAttribute($("a:has(.snapchatIcon)"), "href"),
    modelhub: getAttribute($("a:has(.modelhubIcon)"), "href"),
    amazonWishList: getAttribute($("a:has(.amazonWishlistIcon)"), "href") || getAttribute($("a:has(.amazonWLIcon)"), "href")
  };
  return {
    name,
    about,
    bio,
    avatar,
    cover,
    rank,
    verified,
    awarded,
    premium,
    subscribers,
    featuredIn,
    uploadedVideoCount,
    taggedVideoCount,
    ...info,
    socials
  };
}

// src/index.ts
var PornHub = class {
  constructor(customFetch) {
    this.customFetch = customFetch;
    this.engine = new Engine(this.customFetch);
    this.webMaster = new WebMaster(this.engine);
  }
  engine;
  webMaster;
  route = Route;
  setAgent(agent) {
    this.engine.request.setAgent(agent);
  }
  setHeader(key, value) {
    this.engine.request.setHeader(key, value);
  }
  setCookie(key, value) {
    this.engine.request.setCookie(key, value);
  }
  /**
   * See: https://github.com/pionxzh/Pornhub.js/issues/27
   * @deprecated This method is no longer needed.
   */
  async warmup() {
    console.warn("`warmup` has been deprecated. You can safely remove this method call. It has been handled internally.");
  }
  /**
   * Login with account and password.
  */
  login(account, password) {
    return login(this.engine, account, password);
  }
  /**
   * Logout from Pornhub.com.
  */
  logout() {
    return logout(this.engine);
  }
  /**
   * Get token from Pornhub.com.
   * Most of pornhub's api need this token.
   * You can cache this token to avoid frequent requests (I'm not sure about the expiration time!).
   *
   * For now, this token is only used for `autoComplete` and `searchModel`.
   * This library will automatically get token if you don't provide it.
   */
  getToken() {
    return getToken2(this.engine);
  }
  /**
   * Get video information by url/ID
   * @param urlOrId Video ID or page url
  */
  async video(urlOrId) {
    if (!this.engine.warmedUp) {
      await getMainPage(this.engine);
      this.engine.warmedUp = true;
    }
    return videoPage(this.engine, urlOrId);
  }
  /**
   * Get album information by url/ID
   * @param urlOrId Album ID or page url
  */
  album(urlOrId) {
    return albumPage(this.engine, urlOrId);
  }
  /**
   * Get photo information by url/ID
   * @param urlOrId Photo ID or page url
  */
  photo(urlOrId) {
    return photoPage(this.engine, urlOrId);
  }
  /**
   * Get pornstar information by url/ID
   * @param urlOrName Pornstar name or page url
  */
  pornstar(urlOrName) {
    return pornstarPage(this.engine, urlOrName);
  }
  /**
   * Get model information by url/ID
   * @param urlOrName Model name or page url
   */
  model(urlOrName) {
    return modelPage(this.engine, urlOrName);
  }
  /**
   * Get model information with videos by url/ID
   * @param urlOrName Model name or page url
   */
  modelVideo(urlOrName) {
    return modelVideoPage(this.engine, urlOrName);
  }
  /**
   * Get autocomplete result by keyword.
   */
  autoComplete(keyword, options = {}) {
    return getAutoComplete(this.engine, keyword, options);
  }
  /**
   * Search album by keyword.
   */
  searchAlbum(keyword, options = {}) {
    return albumSearch(this.engine, keyword, options);
  }
  /**
   * Search gif by keyword.
   */
  searchGif(keyword, options = {}) {
    return gifSearch(this.engine, keyword, options);
  }
  /**
   * Search pornstar by keyword.
   */
  searchPornstar(keyword, options = {}) {
    return pornstarSearch(this.engine, keyword, options);
  }
  /**
   * Search model by keyword.
   */
  searchModel(keyword, options = {}) {
    return modelSearch(this.engine, keyword, options);
  }
  /**
   * Search video by keyword.
   */
  searchVideo(keyword, options = {}) {
    return videoSearch(this.engine, keyword, options);
  }
};
export {
  AlbumOrderingMapping,
  GifOrderingMapping,
  HttpStatusError,
  IllegalError,
  PornHub,
  PornstarOrderingMapping,
  VideoOrderingMapping
};
//# sourceMappingURL=index.mjs.map