"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AlbumOrderingMapping: () => AlbumOrderingMapping,
  GifOrderingMapping: () => GifOrderingMapping,
  HttpStatusError: () => HttpStatusError,
  IllegalError: () => IllegalError,
  PornHub: () => PornHub,
  PornstarListOrderingMapping: () => PornstarListOrderingMapping,
  PornstarOrderingMapping: () => PornstarOrderingMapping,
  PornstarPopularPeriodMapping: () => PornstarPopularPeriodMapping,
  PornstarViewedPeriodMapping: () => PornstarViewedPeriodMapping,
  RecommendedOrderingMapping: () => RecommendedOrderingMapping,
  VideoListOrderingMapping: () => VideoListOrderingMapping,
  VideoOrderingMapping: () => VideoOrderingMapping,
  VideoSearchPeriodMapping: () => VideoSearchPeriodMapping
});
module.exports = __toCommonJS(src_exports);

// src/apis/route.ts
var import_urlcat = __toESM(require("urlcat"));

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
var VideoListOrderingMapping = {
  "Featured Recently": "",
  "Most Viewed": "mv",
  "Top Rated": "tr",
  "Hottest": "ht",
  "Longest": "lg",
  "Newest": "cm"
};
var PornstarListOrderingMapping = {
  "Most Popular": "",
  "Most Viewed": "mv",
  "Top Trending": "t",
  "Most Subscribed": "ms",
  "Alphabetical": "a",
  "No. of Videos": "nv",
  "Random": "r"
};
var RecommendedOrderingMapping = {
  "Most Relevant": "",
  "Most Recent": "time"
};

// src/types/SearchPeriod.ts
var PornstarPopularPeriodMapping = {
  weekly: "w",
  monthly: "",
  yearly: "a"
};
var PornstarViewedPeriodMapping = {
  daily: "t",
  weekly: "w",
  monthly: "m",
  alltime: ""
};
var VideoSearchPeriodMapping = {
  daily: "t",
  weekly: "w",
  monthly: "m",
  yearly: "y",
  alltime: ""
};

// src/types/Country.ts
var CountryMapping = {
  "Argentina": "ar",
  "Australia": "au",
  "Austria": "at",
  "Belgium": "be",
  "Brazil": "br",
  "Bulgaria": "bg",
  "Canada": "ca",
  "Chile": "cl",
  "Croatia": "hr",
  "Czech Republic": "cz",
  "Denmark": "dk",
  "Egypt": "eg",
  "Finland": "fi",
  "France": "fr",
  "Germany": "de",
  "Greece": "gr",
  "Hungary": "hu",
  "India": "in",
  "Ireland": "ie",
  "Israel": "il",
  "Italy": "it",
  "Japan": "jp",
  "Korea": "kr",
  "Mexico": "mx",
  "Morocco": "ma",
  "Netherlands": "nl",
  "New Zealand": "nz",
  "Norway": "no",
  "Pakistan": "pk",
  "Poland": "pl",
  "Portugal": "pt",
  "Romania": "ro",
  "Russia": "ru",
  "Serbia": "rs",
  "Slovakia": "sk",
  "Spain": "es",
  "Sweden": "se",
  "Switzerland": "ch",
  "United Kingdom": "gb",
  "Ukraine": "ua",
  "United States": "us",
  "World": "world"
};

// src/utils/constant.ts
var BASE_URL = "https://www.pornhub.org";

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

// src/apis/route.ts
var Route = {
  mainPage() {
    return `${BASE_URL}/`;
  },
  /**
   * @url https://www.pornhub.com/front/authenticate
   */
  authenticate() {
    return (0, import_urlcat.default)(BASE_URL, "/front/authenticate");
  },
  /**
   * @url https://www.pornhub.com/user/logout
   */
  logout(token) {
    return (0, import_urlcat.default)(BASE_URL, "/user/logout", { token });
  },
  /**
   * @url https://www.pornhub.com/video/search_autocomplete?q=random&orientation=straight&pornstars=1&alt=0&token=xxx
   */
  autocomplete(keyword, { token, sexualOrientation = "straight" }) {
    return (0, import_urlcat.default)(BASE_URL, "/video/search_autocomplete", {
      q: keyword,
      orientation: sexualOrientation,
      pornstars: true,
      token,
      alt: 0
    });
  },
  albumPage(id) {
    return (0, import_urlcat.default)(BASE_URL, "/album/:id", { id });
  },
  photoPage(id) {
    return (0, import_urlcat.default)(BASE_URL, "/photo/:id", { id });
  },
  videoPage(id) {
    return (0, import_urlcat.default)(BASE_URL, "/view_video.php", { viewkey: id });
  },
  pornstarPage(name) {
    return (0, import_urlcat.default)(BASE_URL, "/pornstar/:name", { name });
  },
  modelPage(name) {
    return (0, import_urlcat.default)(BASE_URL, "/model/:name", { name });
  },
  userPage(name) {
    return (0, import_urlcat.default)(BASE_URL, "/users/:name", { name });
  },
  modelPageWithVideos(name) {
    return (0, import_urlcat.default)(BASE_URL, "/model/:name/videos", { name });
  },
  pornstarPageWithVideos(name) {
    return (0, import_urlcat.default)(BASE_URL, "/pornstar/:name/videos/upload", { name });
  },
  modelVideosPage(name, page) {
    return (0, import_urlcat.default)(BASE_URL, "/model/:name/videos", { name, page });
  },
  channelPage(name) {
    return (0, import_urlcat.default)(BASE_URL, "/channels/:name", { name });
  },
  channelPageWithVideos(name) {
    return (0, import_urlcat.default)(BASE_URL, "/channels/:name/videos", { name });
  },
  /**
   * @url https://www.pornhub.com/random
   */
  randomPage() {
    return (0, import_urlcat.default)(BASE_URL, "/random");
  },
  recommendedPage({ order = "Most Relevant", page = 1, sexualOrientation = "straight" }) {
    const orientation = sexualOrientation === "straight" ? void 0 : sexualOrientation;
    const pathTemplate = orientation ? "/:orientation/recommended" : "/recommended";
    return (0, import_urlcat.default)(BASE_URL, pathTemplate, {
      orientation,
      ...order !== "Most Relevant" && { o: RecommendedOrderingMapping[order] },
      ...page !== 1 && { page }
    });
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
    return (0, import_urlcat.default)(BASE_URL, "/albums/:segment", {
      segment: dashify(segments),
      search: searchify(keyword),
      ...page !== 1 && { page },
      ...o && { o },
      ...verified && { verified: "1" }
    });
  },
  /**
   * @url https://www.pornhub.com/gifs/search?search=xxx
   */
  gifSearch(keyword, { page = 1, order = "Most Relevant", sexualOrientation = "straight" }) {
    const o = GifOrderingMapping[order];
    const orientation = sexualOrientation === "straight" ? void 0 : sexualOrientation;
    const pathTemplate = orientation ? "/:orientation/gifs/search" : "/gifs/search";
    return (0, import_urlcat.default)(BASE_URL, pathTemplate, {
      orientation,
      search: searchify(keyword),
      ...page !== 1 && { page },
      ...o && { o }
    });
  },
  /**
   * @url https://www.pornhub.com/pornstars/search?search=hot
   */
  pornstarSearch(keyword, { page = 1, order = "Most Relevant", sexualOrientation = "straight" }) {
    const o = PornstarOrderingMapping[order];
    const orientation = sexualOrientation === "straight" ? void 0 : sexualOrientation;
    const pathTemplate = orientation ? "/:orientation/pornstars/search" : "/pornstars/search";
    return (0, import_urlcat.default)(BASE_URL, pathTemplate, {
      orientation,
      search: searchify(keyword),
      ...page !== 1 && { page },
      ...o && { o }
    });
  },
  /**
   * @url https://www.pornhub.com/video/search?search=random
   */
  videoSearch(keyword, param) {
    const {
      page = 1,
      order = "Most Relevant",
      hd = false,
      production = "all",
      durationMin,
      durationMax,
      filterCategory,
      sexualOrientation = "straight"
    } = param;
    const o = VideoOrderingMapping[order];
    const orientation = sexualOrientation === "straight" ? void 0 : sexualOrientation;
    const pathTemplate = orientation ? "/:orientation/video/search" : "/video/search";
    return (0, import_urlcat.default)(BASE_URL, pathTemplate, {
      orientation,
      search: searchify(keyword),
      ...page !== 1 && { page },
      ...o && { o },
      ...hd && { hd: "1" },
      ...production !== "all" && { p: production },
      ...durationMin && { min_duration: durationMin },
      ...durationMax && { max_duration: durationMax },
      ...filterCategory && { filter_category: filterCategory },
      ...(param.order === "Most Viewed" || param.order === "Top Rated") && param.period && param.period !== "alltime" && { t: VideoSearchPeriodMapping[param.period] }
    });
  },
  /**
   * @url https://www.pornhub.com/video
   */
  videoList(param) {
    const {
      page = 1,
      order = "Featured Recently",
      hd = false,
      production = "all",
      durationMin,
      durationMax,
      filterCategory,
      sexualOrientation = "straight"
    } = param;
    const pathTemplate = sexualOrientation === "transgender" ? "transgender" : sexualOrientation === "gay" ? "/gay/video" : "/video";
    const o = VideoListOrderingMapping[order];
    return (0, import_urlcat.default)(BASE_URL, pathTemplate, {
      ...filterCategory && { c: filterCategory },
      ...production !== "all" && { p: production },
      ...o && { o },
      ...(param.order === "Most Viewed" || param.order === "Top Rated") && param.period && param.period !== "alltime" && { t: VideoSearchPeriodMapping[param.period] },
      ...param.order === "Hottest" && param.country && param.country !== "World" && { cc: CountryMapping[param.country] },
      ...durationMin && { min_duration: durationMin },
      ...durationMax && { max_duration: durationMax },
      ...hd && { hd: "1" },
      ...page !== 1 && { page }
    });
  },
  /**
   * @url https://www.pornhub.com/pornstars
   */
  pornstarList(param) {
    const {
      gay = false,
      performerType,
      gender,
      ethnicity,
      tattoos,
      cup,
      piercings,
      hair,
      breastType,
      ageFrom = 18,
      ageTo = 99,
      order = "Most Popular",
      page = 1
    } = param;
    const getYesNo = (v) => v ? "yes" : "no";
    const o = PornstarListOrderingMapping[order];
    const age = `${ageFrom}-${ageTo}`;
    return (0, import_urlcat.default)(BASE_URL, gay ? "/gay/pornstars" : "/pornstars", {
      ...performerType && { performerType },
      ...gender && { gender },
      ...ethnicity && { ethnicity },
      ...typeof piercings === "boolean" && { piercings: getYesNo(piercings) },
      ...age !== "18-99" && { age },
      ...cup && { cup: cup.toLowerCase() },
      ...breastType && { breastType },
      ...hair && { hair },
      ...typeof tattoos === "boolean" && { tattoos: getYesNo(tattoos) },
      ...o && { o },
      ...param.order === "Alphabetical" && { letter: (param.letter ?? "a").toLowerCase() },
      ...param.order === "Most Popular" && param.timeRange && param.timeRange !== "monthly" && {
        timeRange: PornstarPopularPeriodMapping[param.timeRange]
      },
      ...param.order === "Most Viewed" && param.timeRange && param.timeRange !== "alltime" && {
        timeRange: PornstarViewedPeriodMapping[param.timeRange]
      },
      ...page !== 1 && { page }
    });
  }
};
var WebmasterBaseUrl = (0, import_urlcat.default)(BASE_URL, "/webmasters");
var WebmasterRoute = {
  isVideoActive(id) {
    return (0, import_urlcat.default)(WebmasterBaseUrl, "/is_video_active", { id });
  },
  categories() {
    return (0, import_urlcat.default)(WebmasterBaseUrl, "/categories");
  },
  deletedVideos(page) {
    return (0, import_urlcat.default)(WebmasterBaseUrl, "/deleted_videos", { page });
  },
  video_embed_code(id) {
    return (0, import_urlcat.default)(WebmasterBaseUrl, "/video_embed_code", { id });
  },
  stars_detailed() {
    return (0, import_urlcat.default)(WebmasterBaseUrl, "/stars_detailed");
  },
  stars() {
    return (0, import_urlcat.default)(WebmasterBaseUrl, "/stars");
  },
  tags(letter) {
    return (0, import_urlcat.default)(WebmasterBaseUrl, "/tags", { list: letter });
  },
  video_by_id(id, thumbsize) {
    return (0, import_urlcat.default)(WebmasterBaseUrl, "/video_by_id", { id, thumbsize });
  },
  search(keyword, options = {}) {
    var _a, _b, _c;
    const query = {
      search: keyword.split(" ").join("+"),
      page: options.page,
      period: options.period,
      ordering: options.ordering,
      thumbsize: options.thumbsize,
      "tags[]": (_a = options.tags) == null ? void 0 : _a.join(","),
      "stars[]": (_b = options.stars) == null ? void 0 : _b.join(","),
      category: (_c = options.category) == null ? void 0 : _c.join(",")
    };
    return (0, import_urlcat.default)(WebmasterBaseUrl, "/search", query);
  }
};

// src/apis/getMainPage.ts
async function getMainPage(engine) {
  const url = Route.mainPage();
  const res = await engine.request.get(url);
  const html = await res.text();
  return html;
}

// src/utils/cheerio.ts
var cheerio = __toESM(require("cheerio"));
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
async function sendLoginForm(engine, account, password, token, redirect) {
  const data = {
    redirect,
    token,
    remember_me: 1,
    from: "pc_login_modal_:show",
    username: account,
    password,
    setSendTip: false
  };
  const res = await engine.request.postForm(Route.authenticate(), data);
  const result = await res.json();
  return result;
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
  const res = await engine.request.get(Route.autocomplete(keyword, {
    ...options,
    token
  }));
  const result = await res.json();
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

// src/core/request.ts
var import_node_url = require("url");
var import_debug = __toESM(require("debug"));
var import_node_fetch = __toESM(require("node-fetch"));

// src/utils/error.ts
var HttpStatusError = class extends Error {
};
var IllegalError = class extends Error {
};

// src/core/request.ts
var debug = (0, import_debug.default)("REQUEST");
var nonExpireDate = new Date(9999, 1, 1);
var Request = class {
  constructor(customFetch) {
    this.customFetch = customFetch;
  }
  _agent;
  _headers = {};
  _cookieStore = /* @__PURE__ */ new Map();
  setAgent(agent) {
    this._agent = agent;
  }
  setHeader(key, value) {
    if (key !== "Cookie")
      debug(`[Header] Set: ${key}=${value}`);
    this._headers[key] = value;
  }
  _checkCookieExpired() {
    const now = Date.now();
    this._cookieStore.forEach((cookie, key) => {
      if (cookie.expires.getTime() < now) {
        debug(`[Cookie] Expired: ${key}`);
        this._cookieStore.delete(key);
      }
    });
  }
  get cookieString() {
    this._checkCookieExpired();
    return Array.from(this._cookieStore).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v.value)}`).join("; ");
  }
  getCookies() {
    this._checkCookieExpired();
    return [...this._cookieStore].reduce((acc, [k, v]) => {
      acc[k] = v.value;
      return acc;
    }, {});
  }
  getCookie(key) {
    var _a;
    this._checkCookieExpired();
    return (_a = this._cookieStore.get(key)) == null ? void 0 : _a.value;
  }
  setCookie(key, value) {
    debug(`[Cookie] Set: ${key}=${value}`);
    this._cookieStore.set(key, {
      value,
      expires: nonExpireDate
    });
  }
  deleteCookie(key) {
    debug(`[Cookie] Del: ${key}`);
    this._cookieStore.delete(key);
  }
  async _checkStatus(res) {
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
    return Promise.reject(new HttpStatusError(`${res.status} ${res.statusText} at ${res.url}`));
  }
  _parseCookieItem(str) {
    const [first, ...rest] = str.split(";").map((item) => item.trim());
    const [key, value] = first.split("=");
    const restAttrs = rest.reduce((acc, item) => {
      const [k, v] = item.split("=");
      acc[k.toLowerCase()] = v;
      return acc;
    }, {});
    let expires = nonExpireDate;
    if (restAttrs["max-age"])
      expires = new Date(Date.now() + Number(restAttrs["max-age"]) * 1e3);
    else if (restAttrs.expires)
      expires = new Date(restAttrs.expires);
    return [key, { value, expires }];
  }
  _handleSetCookie(res) {
    if (!res.headers.raw()["set-cookie"])
      return res;
    res.headers.raw()["set-cookie"].forEach((item) => {
      debug(`[Cookie] Received Set-Cookie: ${item}`);
      const [key, cookie] = this._parseCookieItem(item);
      this._cookieStore.set(key, cookie);
    });
    return res;
  }
  _buildParams(data) {
    const params = new import_node_url.URLSearchParams();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    return params;
  }
  _buildRequest(method, url, data) {
    const headers = {};
    const opts = { method, headers };
    if (method === "post") {
      headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(data);
    }
    if (method === "post-form") {
      opts.method = "post";
      if (data)
        opts.body = this._buildParams(data);
    }
    return this.fetch(url, opts);
  }
  async fetch(url, opts = {}) {
    var _a;
    const headers = Object.assign({}, this._headers, opts.headers, {
      cookie: this.cookieString
    });
    const method = ((_a = opts.method) == null ? void 0 : _a.toUpperCase()) || "GET";
    debug(`[ RQST ] ${method} ${url}`);
    let res = void 0;
    if (this.customFetch) {
      debug(`Custom fetch: ${url}`);
      res = await this.customFetch(url, {
        ...opts,
        headers,
        ...this._agent && { agent: this._agent }
      });
    } else {
      res = await (0, import_node_fetch.default)(url, {
        ...opts,
        headers,
        ...this._agent && { agent: this._agent }
      });
    }
    debug(`[ RESP ] ${method} ${url} ${res.status} ${res.statusText}`);
    if (res.url !== url) {
      debug(`Redirected from ${url} to ${res.url}`);
    }
    await this._checkStatus(res);
    this._handleSetCookie(res);
    return res;
  }
  get(url) {
    return this._buildRequest("get", url);
  }
  post(url, data) {
    return this._buildRequest("post", url, data);
  }
  postForm(url, data) {
    return this._buildRequest("post-form", url, data);
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
    this.request.setHeader(
      "User-Agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
    );
    this.request.setCookie("platform", "pc");
    this.request.setCookie("accessAgeDisclaimerPH", "1");
    this.request.setCookie("accessAgeDisclaimerUK", "1");
    this.request.setCookie("adBlockAlertHidden", "1");
    this.request.setCookie("accessPH", "1");
    this.request.setCookie("age_verified", "1");
    this.request.setCookie("atatusScript", "hide");
    this.request.setCookie("cookiesBannerSeen", "1");
    this.request.setCookie("cookieConsent", "2");
    this.request.setCookie("cookieBannerState", "1");
    this.request.setCookie("hasVisited", "1");
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
    const res = await engine.request.get(WebmasterRoute.categories());
    const result = await res.json();
    return result.categories.sort((a, b) => +a.id - +b.id);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/apis/webmaster/deleted.ts
async function deleted(engine, page) {
  try {
    const res = await engine.request.get(WebmasterRoute.deletedVideos(page));
    const result = await res.json();
    return result.videos;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/utils/url.ts
var UrlParser = class {
  static getVideoID(url) {
    const UrlRule = /[\w]+\.pornhub\.org\/view_video\.php\?viewkey=([a-zA-z0-9]{1,30})/;
    const id = UrlRule.test(url) ? UrlRule.exec(url)[1] : url;
    return id;
  }
  static getAlbumID(url) {
    const UrlRule = /[\w]+\.pornhub\.org\/album\/([0-9]{1,30})/;
    const id = UrlRule.test(url) ? UrlRule.exec(url)[1] : url;
    return id;
  }
  static getPhotoID(url) {
    const UrlRule = /[\w]+\.pornhub\.org\/photo\/([0-9]{1,30})/;
    const id = UrlRule.test(url) ? UrlRule.exec(url)[1] : url;
    return id;
  }
  static getPornstarName(url) {
    const UrlRule = /[\w]+\.pornhub\.org\/pornstar\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
  static getPornstarNameVideoPage(url) {
    url = url.replace(/\/videos\/upload$/, "");
    const UrlRule = /[\w]+\.pornhub\.org\/pornstar\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
  static getChannelsName(url) {
    const UrlRule = /[\w]+\.pornhub\.org\/channels\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
  static getChannelsNameVideoPage(url) {
    url = url.replace(/\/videos\/upload$/, "");
    const UrlRule = /[\w]+\.pornhub\.org\/channels\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
  static getModelName(url) {
    const UrlRule = /[\w]+\.pornhub\.org\/model\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
  static getUsersName(url) {
    const UrlRule = /[\w]+\.pornhub\.org\/users\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
  static getModelNameVideoPage(url) {
    url = url.replace(/\/videos$/, "");
    const UrlRule = /[\w]+\.pornhub\.org\/model\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
  static getChannelName(url) {
    const UrlRule = /[\w]+\.pornhub\.org\/channels\/([a-zA-z0-9-]{1,30})/;
    const name = UrlRule.test(url) ? UrlRule.exec(url)[1] : slugify(url);
    return name;
  }
};

// src/apis/webmaster/embed.ts
async function video_embed_code(engine, urlOrId) {
  try {
    const id = UrlParser.getVideoID(urlOrId);
    const res = await engine.request.get(WebmasterRoute.video_embed_code(id));
    const result = await res.json();
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
    const res = await engine.request.get(WebmasterRoute.search(keyword, options));
    const result = await res.json();
    return result.videos.map((x) => videoTransform(x));
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/apis/webmaster/stars.ts
async function stars(engine) {
  try {
    const res = await engine.request.get(WebmasterRoute.stars());
    const result = await res.json();
    return result.stars.map((x) => x.star.star_name);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/apis/webmaster/stars_detailed.ts
async function stars_detailed(engine) {
  try {
    const res = await engine.request.get(WebmasterRoute.stars_detailed());
    const result = await res.json();
    return result.stars.map((x) => x.star);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/apis/webmaster/tags.ts
async function tags(engine, letter) {
  try {
    const res = await engine.request.get(WebmasterRoute.tags(letter));
    const result = await res.json();
    return result.tags;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// src/apis/webmaster/video_by_id.ts
async function video_by_id(engine, urlOrId, thumbsize = "large") {
  const id = UrlParser.getVideoID(urlOrId);
  const res = await engine.request.get(WebmasterRoute.video_by_id(id, thumbsize));
  const result = await res.json();
  return videoTransform(result.video);
}

// src/apis/webmaster/video_is_active.ts
async function video_is_active(engine, urlOrId) {
  try {
    const id = UrlParser.getVideoID(urlOrId);
    const res = await engine.request.get(WebmasterRoute.isVideoActive(id));
    const result = await res.json();
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

// src/scrapers/list/pornstars.ts
var import_urlcat2 = __toESM(require("urlcat"));

// src/scrapers/search/base.ts
function parsePaging($) {
  const current = Number.parseInt($("li.page_current").text()) || 1;
  const nextPage = $("li.page_next");
  const isEnd = !nextPage.length || nextPage.hasClass("disabled");
  const maxPage = isEnd ? current : Number.parseInt(nextPage.prev("li").text()) || 1;
  return {
    current,
    maxPage,
    isEnd
  };
}
function parseCounting($) {
  try {
    const counterStr = $(".showingCounter").text();
    const [, from = "0", to = "0", total = "0"] = /(\d+)-(\d+)\sof\s(\d+)/.exec(counterStr) || [];
    return {
      from: Number.parseInt(from),
      to: Number.parseInt(to),
      total: Number.parseInt(total)
    };
  } catch (err) {
    return {
      from: 0,
      to: 0,
      total: 0
    };
  }
}

// src/scrapers/list/pornstars.ts
async function pornstarList(engine, options) {
  const url = Route.pornstarList(options);
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return {
    data: parseResult($),
    paging: parsePaging($)
  };
}
function parseResult($) {
  const list = $("#popularPornstars li.performerCard");
  const result = list.map((_, el) => {
    const item = $(el);
    const name = item.find(".performerCardName").text().trim();
    const path = getAttribute(item.find("a.title"), "href", "");
    const url = (0, import_urlcat2.default)(BASE_URL, path);
    const views = item.find(".viewsNumber").text().replace("Views", "").trim() || "0";
    const videoNum = Number.parseInt(item.find(".videosNumber").text().replace("Videos", "")) || 0;
    const rank = Number.parseInt(item.find(".rank_number").text()) || 0;
    const img = item.find("img");
    const photo = getDataAttribute(img, "thumb_url", "");
    const verified = item.find(".verifiedPornstar").length > 0;
    const awarded = item.find(".trophyPornStar").length > 0;
    return {
      name,
      url,
      views,
      videoNum,
      rank,
      photo,
      verified,
      awarded
    };
  }).get();
  return result;
}

// src/scrapers/search/video.ts
var import_urlcat3 = __toESM(require("urlcat"));
async function videoSearch(engine, keyword, options) {
  const url = Route.videoSearch(keyword, options);
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return {
    data: parseVideoResult($, "#videoSearchResult"),
    paging: parsePaging($),
    counting: parseCounting($)
  };
}
function parseVideoResult($, container) {
  const list = $(`${container} li.videoBox`);
  const result = list.map((_, el) => {
    const item = $(el);
    const thumb = item.find(".linkVideoThumb").eq(0);
    const title = getAttribute(thumb, "title", "");
    const path = getAttribute(thumb, "href", "");
    const url = (0, import_urlcat3.default)(BASE_URL, path);
    const id = UrlParser.getVideoID(url);
    const img = item.find("img");
    const preview = getAttribute(img, "src", "");
    return {
      title,
      id,
      url,
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

// src/scrapers/list/videos.ts
async function videoList(engine, options) {
  const url = Route.videoList(options);
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return {
    data: parseVideoResult($, "#videoCategory"),
    paging: parsePaging($),
    counting: parseCounting($)
  };
}

// src/scrapers/pages/album.ts
async function albumPage(engine, urlOrId) {
  const id = UrlParser.getAlbumID(urlOrId);
  const url = Route.albumPage(id);
  const res = await engine.request.get(url);
  const html = await res.text();
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

// src/utils/number.ts
function parseReadableNumber(viewsText) {
  if (!viewsText)
    return 0;
  viewsText = viewsText.split(":").pop() || "";
  viewsText = viewsText.trim();
  viewsText = viewsText.split(" ").shift() || "";
  if (viewsText == "") {
    return 0;
  }
  const views = viewsText.replace(/,/g, "");
  if (views.includes("K")) {
    return Number.parseFloat(views) * 1e3;
  } else if (views.includes("M")) {
    return Number.parseFloat(views) * 1e6;
  } else if (views.includes("B")) {
    return Number.parseFloat(views) * 1e9;
  } else {
    return Number.parseFloat(views);
  }
}

// src/scrapers/pages/channels.ts
async function channelPage(engine, urlOrName) {
  const name = UrlParser.getChannelsName(urlOrName);
  if (!name)
    throw new Error(`Invalid channel input: ${urlOrName}`);
  const url = Route.channelPage(name);
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return parseInfo($);
}
async function channelVideoPage(engine, urlOrName, page) {
  const name = UrlParser.getChannelsNameVideoPage(urlOrName);
  if (!name)
    throw new Error(`Invalid channel input: ${urlOrName}`);
  const url = Route.channelPageWithVideos(name) + `?page=${page}`;
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return parseInfo($);
}
function getStats($, value) {
  const el = $(`#stats > .info`);
  let result = "0";
  el.each((_, elem) => {
    if ($(elem).find("span").text().trim() === value) {
      result = $(elem).text().trim();
    }
  });
  return result;
}
function getDescription($, value) {
  const el = $(`.cdescriptions > .joined`);
  let result = "0";
  el.each((_, elem) => {
    if (value === "DESCRIPTION") {
      if ($(elem).find("span").length === 0) {
        result = $(elem).text().trim();
      }
    } else {
      if ($(elem).find(".channelInfoHeadlines").text().trim() === value) {
        if (value === "WEBSITE") {
          result = $(elem).find("a").attr("href") || "";
        }
        if (value === "BY") {
          result = $(elem).find("a").attr("href") || "";
          if (result !== "") {
            result = "https://www.pornhub.com" + result;
          }
        }
        if (value === "JOINED") {
          let desc = $(elem).find(":not(.channelInfoHeadlines)");
          result = $(desc).text().trim();
        }
      }
    }
  });
  return result;
}
function parseInfo($) {
  const name = $("#channelsProfile .titleWrapper .title > h1").text().trim();
  const avatarEl = $("img#getAvatar, .topProfileHeader > .thumbImage > img");
  const avatar = getAttribute(avatarEl, "src", "");
  const coverEl = $("img#coverPictureDefault, .topProfileHeader > .coverImage > img");
  const cover = getAttribute(coverEl, "src", "");
  const linkEl = $(".widgetContainer ul.videos .thumbnail-info-wrapper .title a");
  let videosFrontpage = [];
  linkEl.each((_, e) => {
    videosFrontpage.push($(e).attr("href"));
  });
  const about = getDescription($, "DESCRIPTION");
  const videoViews = parseReadableNumber(getStats($, "VIDEO VIEWS"));
  const subscribers = parseReadableNumber(getStats($, "SUBSCRIBERS"));
  const uploadedVideoCount = parseReadableNumber(getStats($, "VIDEOS"));
  const rank = parseReadableNumber(getStats($, "RANK"));
  const website = getDescription($, "WEBSITE");
  return {
    name,
    about,
    avatar,
    cover,
    rank,
    subscribers,
    videosFrontpage,
    uploadedVideoCount,
    videoViews,
    website,
    byChannel: getDescription($, "BY")
  };
}

// src/scrapers/pages/model.ts
var fs = __toESM(require("fs"));
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
  Gender: {
    key: () => "gender",
    value: defaultMapper
  },
  Height: {
    key: () => "height",
    value: defaultMapper
  },
  Weight: {
    key: () => "weight",
    value: defaultMapper
  },
  Ethnicity: {
    key: () => "ethnicity",
    value: defaultMapper
  },
  Background: {
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
  Tattoos: {
    key: () => "tattoos",
    value: yesNoMapper
  },
  Piercings: {
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
  Born: {
    key: () => "born",
    value: defaultMapper
  },
  "Birth Place": {
    key: () => "birthPlace",
    value: defaultMapper
  },
  Birthplace: {
    key: () => "birthPlace",
    value: defaultMapper
  },
  "Star Sign": {
    key: () => "starSign",
    value: defaultMapper
  },
  Measurements: {
    key: () => "measurements",
    value: defaultMapper
  },
  "City and Country": {
    key: () => "cityAndCountry",
    value: defaultMapper
  },
  Endowment: {
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
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return parseInfo2($);
}
async function modelVideoPage(engine, urlOrName, page, startPageFix) {
  const name = UrlParser.getModelNameVideoPage(urlOrName);
  if (!name)
    throw new Error(`Invalid model input: ${urlOrName}`);
  if (page === 1 && startPageFix) {
    console.log(Route.modelPage(name));
    const res = await engine.request.get(Route.modelPage(name));
    const html = await res.text();
    const $ = getCheerio(html);
    fs.writeFileSync("debug.html", html);
    return parseInfo2($);
  } else {
    const url = `${Route.modelPageWithVideos(name)}?page=${page}`;
    const res = await engine.request.get(url);
    const html = await res.text();
    const $ = getCheerio(html);
    return parseInfo2($);
  }
}
async function modelUploadedVideos(engine, urlOrName, options) {
  const name = UrlParser.getModelName(urlOrName);
  if (!name)
    throw new Error(`Invalid model input: ${urlOrName}`);
  const url = Route.modelVideosPage(name, options.page ?? 1);
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return {
    data: parseVideoResult($, ".videoUList"),
    paging: parsePaging($),
    counting: parseCounting($)
  };
}
function getIsGayFlag($) {
  let html = $.html();
  html = html.replace(/ /g, "");
  return html.includes('isGay="1"');
}
function parseInfo2($) {
  const infoPieces = $("div.infoPiece").toArray();
  const info = Object.fromEntries(
    infoPieces.map((el) => {
      const item = $(el);
      const key = item.find("span:nth-child(1)").text().trim().replace(":", "");
      const value = item.find("span:nth-child(2)").text().trim() || item.text().replace(item.find("span:nth-child(1)").text(), "").trim();
      const mapper = KeyMapper[key] || DefaultMapper;
      return [mapper.key(key), mapper.value(value)];
    })
  );
  const name = $(".nameSubscribe > .name").text().trim();
  const rankEl = $("div.rankingInfo > .infoBox > span");
  const rank = parseReadableNumber(rankEl.text().trim());
  const weeklyRankEl = $("div.infoBoxes > div.rankingInfo > div.infoBox:nth-child(2) > span.big");
  const weeklyRank = parseReadableNumber(weeklyRankEl.text().trim());
  const linkEl = $("div.videoUList > ul.videos > li.videoBox > div.wrap > div.phimage > a");
  const videosFrontpage = [];
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
  const isGay = getIsGayFlag($);
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
  const recentVideoCountEl = $(".mostRecentPornstarVideos > .pornstarVideosCounter");
  uploadedVideoCount = parseVideoCount(recentVideoCountEl.text().trim());
  if (uploadedVideoCount === 0) {
    const uploadedVideoCountEl = $(".videoSection > .section_header > .subHeaderOverrite > .showingInfo");
    uploadedVideoCount = parseVideoCount(uploadedVideoCountEl.text().trim());
  }
  const socials = {
    website: getAttribute($(".socialList a:has(.officialSiteIcon)"), "href"),
    twitter: getAttribute($(".socialList a:has(.twitterIcon)"), "href"),
    instagram: getAttribute($(".socialList a:has(.instagramIcon)"), "href"),
    snapchat: getAttribute($(".socialList a:has(.snapchatIcon)"), "href"),
    modelhub: getAttribute($(".socialList a:has(.modelhubIcon)"), "href"),
    amazonWishList: getAttribute($(".socialList a:has(.amazonWishlistIcon)"), "href") || getAttribute($(".socialList a:has(.amazonWLIcon)"), "href")
  };
  const mostRecentVideos = parseVideoResult($, ".mostRecentPornstarVideos");
  if (videosFrontpage.length === 0) {
    videosFrontpage.push(...mostRecentVideos.map((video) => video.url.split("pornhub.org")[1]));
  }
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
    isGay,
    subscribers,
    featuredIn,
    uploadedVideoCount,
    taggedVideoCount,
    ...info,
    socials,
    mostRecentVideos
  };
}

// src/scrapers/pages/photo.ts
async function photoPage(engine, urlOrId) {
  const id = UrlParser.getPhotoID(urlOrId);
  const url = Route.photoPage(id);
  const res = await engine.request.get(url);
  const html = await res.text();
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
  const views = Number.parseInt(removeComma(viewsText)) || 0;
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
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return parseInfo3($);
}
async function pornstarVideoPage(engine, urlOrName, page) {
  const name = UrlParser.getPornstarNameVideoPage(urlOrName);
  if (!name)
    throw new Error(`Invalid model input: ${urlOrName}`);
  const url = Route.pornstarPageWithVideos(name) + `?page=${page}`;
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return parseInfo3($);
}
function parseInfo3($) {
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
  const weeklyRankEl = $("div.infoBoxes > div.rankingInfo > div.infoBox:nth-child(2) > span.big");
  const weeklyRank = parseReadableNumber(weeklyRankEl.text().trim());
  const linkEl = $("div.videoUList > ul.videos > li.videoBox > div.wrap > div.phimage > a");
  let videosFrontpage = [];
  linkEl.each((_, e) => {
    videosFrontpage.push($(e).attr("href"));
  });
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
  const recentVideoCountEl = $(".mostRecentPornstarVideos > .pornstarVideosCounter");
  uploadedVideoCount = parseVideoCount2(recentVideoCountEl.text().trim());
  const videoViewsFallback = $(".videoViews").data("title");
  const videoViews = info.videoViews || parseReadableNumber(videoViewsFallback);
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
  if (uploadedVideoCount === 0) {
    const uploadedVideoCountEl = $(".profileVids > .section_header > .float-left > .showingInfo");
    uploadedVideoCount = parseVideoCount2(uploadedVideoCountEl.text().trim());
  }
  const socials = {
    website: getAttribute($(".socialList a:has(.officialSiteIcon)"), "href"),
    twitter: getAttribute($(".socialList a:has(.twitterIcon)"), "href"),
    instagram: getAttribute($(".socialList a:has(.instagramIcon)"), "href"),
    snapchat: getAttribute($(".socialList a:has(.snapchatIcon)"), "href"),
    modelhub: getAttribute($(".socialList a:has(.modelhubIcon)"), "href"),
    amazonWishList: getAttribute($(".socialList a:has(.amazonWishlistIcon)"), "href") || getAttribute($(".socialList a:has(.amazonWLIcon)"), "href")
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
    weeklyRank,
    videosFrontpage,
    uploadedVideoCount,
    taggedVideoCount,
    ...info,
    socials,
    videoViews
  };
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
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return {
    id,
    url,
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
  const totalVote = voteUp + voteDown;
  const vote = {
    up: voteUp,
    down: voteDown,
    total: totalVote,
    rating: totalVote === 0 ? 0 : Math.round(voteUp / totalVote * 100) / 100
  };
  const premium = $("#videoTitle .ph-icon-badge-premium").length !== 0;
  const thumb = getAttribute($(".thumbnail img"), "src", "");
  const preview = getAttribute($('head meta[property="og:image"]'), "content", "");
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
    preview,
    videos: [],
    provider,
    tags: tags2,
    pornstars,
    categories: categories2,
    duration,
    durationFormatted,
    ...parseByLdJson($)
  };
}
function parseByLdJson($) {
  try {
    const ldPlusJson = JSON.parse($('head script[type="application/ld+json"]').first().text());
    const uploadDate = new Date(ldPlusJson.uploadDate);
    return {
      uploadDate
    };
  } catch (error) {
    console.error("Failed to parse ld+json", error);
    return {
      uploadDate: /* @__PURE__ */ new Date(0)
    };
  }
}

// src/scrapers/pages/random.ts
async function randomPage(engine) {
  const url = Route.randomPage();
  const response = await engine.request.fetch(url, { follow: 3 });
  const redirectUrl = response.url;
  const id = UrlParser.getVideoID(redirectUrl);
  const html = await response.text();
  const $ = getCheerio(html);
  return {
    id,
    url: Route.videoPage(id),
    ...parseByDom(html, $)
  };
}

// src/scrapers/pages/recommended.ts
async function recommended(engine, options) {
  const url = Route.recommendedPage(options);
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return {
    data: parseVideoResult($, ".recommendedVideosContainer"),
    paging: parsePaging($)
  };
}

// src/scrapers/pages/users.ts
function getStats2($, value) {
  const el = $(`.subViewsInfoContainer > li > a`);
  let result = "0";
  el.each((_, elem) => {
    if ($(elem).find(".connections").text().trim().toLowerCase() === value.toLowerCase()) {
      result = $(elem).find(".number").text().trim();
    }
  });
  return result;
}
function getProfileViews($) {
  const elDt = $(".moreInformation > dt");
  const elDd = $(".moreInformation > dd");
  let result = "0";
  elDt.each((i, elem) => {
    if ($(elem).text().trim().toLowerCase() === "profile views:") {
      result = $(elDd[i]).text().trim();
    }
  });
  return result;
}
async function usersPage(engine, urlOrName) {
  const name = UrlParser.getUsersName(urlOrName);
  if (!name)
    throw new Error(`Invalid model input: ${urlOrName}`);
  const url = Route.userPage(name);
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return parseInfo4($);
}
function parseInfo4($) {
  const name = $(".profileUserName > a").text().trim();
  const avatarEl = $("img#getAvatar, .topProfileHeader > .thumbImage > img");
  const avatar = getAttribute(avatarEl, "src", "");
  const coverEl = $("img#coverPictureDefault, .topProfileHeader > .coverImage > img");
  const cover = getAttribute(coverEl, "src", "");
  const aboutEl = $(".aboutMeText");
  const about = aboutEl.text().trim();
  const subscribers = parseReadableNumber(getStats2($, "Subscribers"));
  const uploadedVideoCount = parseReadableNumber(getStats2($, "Videos"));
  const videoViews = parseReadableNumber(getStats2($, "Video Views"));
  const profileViews = parseReadableNumber(getProfileViews($));
  return {
    name,
    about,
    avatar,
    cover,
    subscribers,
    uploadedVideoCount,
    videoViews,
    profileViews
  };
}

// src/scrapers/search/album.ts
async function albumSearch(engine, keyword, options) {
  const url = Route.albumSearch(keyword, options);
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return {
    data: parseResult2($),
    paging: parsePaging($),
    counting: parseCounting($)
  };
}
function parseResult2($) {
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

// src/scrapers/search/gif.ts
var import_urlcat4 = __toESM(require("urlcat"));

// src/utils/utils.ts
var removeProtectionBracket = (str) => str.replace(/\(.+?\)/g, "");

// src/scrapers/search/gif.ts
async function gifSearch(engine, keyword, options) {
  const url = Route.gifSearch(keyword, options);
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return {
    data: parseResult3($),
    paging: parsePaging($),
    counting: parseCounting($)
  };
}
function parseResult3($) {
  const list = $("ul.gifLink li.gifVideoBlock");
  const result = list.map((_, el) => {
    const item = $(el);
    const video = item.find("video");
    const poster = getAttribute(video, "poster", "");
    const path = getAttribute(item.find("a"), "href", "");
    return {
      title: item.find(".title").text(),
      url: (0, import_urlcat4.default)(BASE_URL, path),
      mp4: getDataAttribute(video, "mp4", ""),
      webm: getDataAttribute(video, "webm", ""),
      preview: removeProtectionBracket(poster)
    };
  }).get();
  return result;
}

// src/scrapers/search/model.ts
async function modelSearch(engine, keyword, options = {}) {
  const result = await getAutoComplete(engine, keyword, options);
  return result.models;
}

// src/scrapers/search/pornstar.ts
var import_urlcat5 = __toESM(require("urlcat"));
async function pornstarSearch(engine, keyword, options) {
  const url = Route.pornstarSearch(keyword, options);
  const res = await engine.request.get(url);
  const html = await res.text();
  const $ = getCheerio(html);
  return {
    data: parseResult4($),
    paging: parsePaging($),
    counting: parseCounting($)
  };
}
function parseResult4($) {
  const $list = $("ul#pornstarsSearchResult li div.wrap");
  const result = $list.map((_, el) => {
    const item = $(el);
    const path = getAttribute(item.find("a"), "href", "");
    const img = item.find("img");
    return {
      name: item.find(".title").text(),
      url: (0, import_urlcat5.default)(BASE_URL, path),
      views: item.find(".pstarViews").text().replace("views", "").trim() || "0",
      videoNum: Number.parseInt(item.find(".videosNumber").text()) || 0,
      rank: Number.parseInt(item.find(".rank_number").text()) || 0,
      photo: getDataAttribute(img, "thumb_url", "")
    };
  }).get();
  return result;
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
  getCookies() {
    return this.engine.request.getCookies();
  }
  getCookie(key) {
    return this.engine.request.getCookie(key);
  }
  setCookie(key, value) {
    this.engine.request.setCookie(key, value);
  }
  deleteCookie(key) {
    this.engine.request.deleteCookie(key);
  }
  /**
   * See: https://github.com/pionxzh/Pornhub.js/issues/27
   * @deprecated This method is no longer needed.
   */
  async warmup() {
    console.warn(
      "`warmup` has been deprecated. You can safely remove this method call. It has been handled internally."
    );
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
   * This library will automatically get the token if you don't provide one.
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
   * Get pornstar information with videos by url/ID
   * @param urlOrName Pornstar name or page url
   */
  pornstarVideo(urlOrName, page = 1) {
    return pornstarVideoPage(this.engine, urlOrName, page);
  }
  /**
   * Get model information by url/ID
   * @param urlOrName Model name or page url
   */
  model(urlOrName) {
    return modelPage(this.engine, urlOrName);
  }
  /**
   * Get user information by url/ID
   * @param urlOrName user name or page url
   */
  user(urlOrName) {
    return usersPage(this.engine, urlOrName);
  }
  /**
   * Get model information with videos by url/ID
   * @param urlOrName Model name or page url
   */
  modelVideo(urlOrName, page = 1, startPageFix = false) {
    return modelVideoPage(this.engine, urlOrName, page, startPageFix);
  }
  /**
   * Get channel information by url/ID
   * @param urlOrName Channel name or page url
   */
  channels(urlOrName) {
    return channelPage(this.engine, urlOrName);
  }
  /**
   * Get channel information with videos by url/ID
   * @param urlOrName Channel name or page url
   */
  channelsVideo(urlOrName, page = 1) {
    return channelVideoPage(this.engine, urlOrName, page);
  }
  /**
   * Get list of model's uploaded videos
   * @param urlOrName Model name or page url
   * @param options Options including page number
   */
  modelVideos(urlOrName, options = {}) {
    return modelUploadedVideos(this.engine, urlOrName, options);
  }
  /**
   * Get a random video.
   * @returns The same object as `video()`
   */
  randomVideo() {
    return randomPage(this.engine);
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
  /**
   * Get video list.
   */
  videoList(options = {}) {
    return videoList(this.engine, options);
  }
  /**
   * Get pornstar list.
   */
  pornstarList(options = {}) {
    return pornstarList(this.engine, options);
  }
  /**
   * Get recommended videos.
   */
  recommendedVideos(options = {}) {
    return recommended(this.engine, options);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlbumOrderingMapping,
  GifOrderingMapping,
  HttpStatusError,
  IllegalError,
  PornHub,
  PornstarListOrderingMapping,
  PornstarOrderingMapping,
  PornstarPopularPeriodMapping,
  PornstarViewedPeriodMapping,
  RecommendedOrderingMapping,
  VideoListOrderingMapping,
  VideoOrderingMapping,
  VideoSearchPeriodMapping
});
//# sourceMappingURL=index.js.map