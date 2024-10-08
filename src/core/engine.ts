import { BASE_URL } from '../utils/constant';
import { Request } from './request';
import type { RequestInfo, RequestInit, Response } from 'undici';

export class Engine {
    BASE_URL = BASE_URL;
    request: Request;

    // Flag to indicate whether the engine has visited the main page to get the cookies.
    // See issue: https://github.com/pionxzh/Pornhub.js/issues/27
    warmedUp = false;

    constructor(private customFetch?: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) {
        this.request = new Request(this.customFetch);


        this.request.setCookie('platform', 'pc');
        // bypass age confirmation
        this.request.setCookie('accessAgeDisclaimerPH', '1');
        this.request.setCookie('accessAgeDisclaimerUK', '1');
        this.request.setCookie('adBlockAlertHidden', '1');
        this.request.setCookie('accessPH', '1');
        this.request.setCookie('age_verified', '1');
        // disable AtatusJs (RUM and error tracking)
        this.request.setCookie('atatusScript', 'hide');
        // disable cookie banner
        this.request.setCookie('cookiesBannerSeen', '1');
        this.request.setCookie('cookieConsent', '2');
        this.request.setCookie('cookieBannerState', '1');
        this.request.setCookie('hasVisited', '1');
    }
}
