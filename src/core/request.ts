import { URLSearchParams } from 'node:url'
import createDebug from 'debug'
import {fetch} from 'undici'
import { getCheerio } from '../utils/cheerio'
import { HttpStatusError, IllegalError } from '../utils/error'
import type { HeadersInit, RequestInfo, RequestInit, Response } from 'undici'

interface Cookie {
    value: string
    expires: Date
}

const debug = createDebug('REQUEST')
const nonExpireDate = new Date(9999, 1, 1)

export class Request {
    constructor (private customFetch?: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) {}
    
    private _headers: Record<string, string> = {}
    private _cookieStore: Map<string, Cookie> = new Map()
    

    setHeader(key: string, value: string) {
        if (key !== 'Cookie') debug(`[Header] Set: ${key}=${value}`)
        this._headers[key] = value
    }

    private _checkCookieExpired() {
        const now = Date.now()
        this._cookieStore.forEach((cookie, key) => {
            if (cookie.expires.getTime() < now) {
                debug(`[Cookie] Expired: ${key}`)
                this._cookieStore.delete(key)
            }
        })
    }

    private get cookieString() {
        this._checkCookieExpired()
        return Array.from(this._cookieStore).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v.value)}`).join('; ')
    }

    getCookies(): Record<string, string> {
        this._checkCookieExpired()
        return [...this._cookieStore].reduce((acc, [k, v]) => {
            acc[k] = v.value
            return acc
        }, {} as Record<string, string>)
    }

    getCookie(key: string): string | undefined {
        this._checkCookieExpired()
        return this._cookieStore.get(key)?.value
    }

    setCookie(key: string, value: string) {
        debug(`[Cookie] Set: ${key}=${value}`)
        this._cookieStore.set(key, {
            value,
            expires: nonExpireDate,
        })
    }

    deleteCookie(key: string) {
        debug(`[Cookie] Del: ${key}`)
        this._cookieStore.delete(key)
    }

    private async _checkStatus(res: Response) {
        if (res.ok) return res

        if (res.status === 404) {
            let html = ''
            try {
                html = await res.text()
            }
            catch (error) {
                // ignore
            }

            if (/class="deterrenceWarn"/.test(html)) {
                const $ = getCheerio(html)
                const warning = $('.deterrenceWarn').text()
                if (warning) {
                    return Promise.reject(new IllegalError(warning))
                }
            }
        }
        return Promise.reject(new HttpStatusError(`${res.status} ${res.statusText} at ${res.url}`))
    }

    private _parseCookieItem(str: string): [string, Cookie] {
        const [first, ...rest] = str.split(';').map(item => item.trim())
        const [key, value] = first.split('=')
        const restAttrs = rest.reduce((acc, item) => {
            const [k, v] = item.split('=')
            acc[k.toLowerCase()] = v
            return acc
        }, {} as Record<string, string>)

        let expires = nonExpireDate
        if (restAttrs['max-age']) expires = new Date(Date.now() + Number(restAttrs['max-age']) * 1000)
        else if (restAttrs.expires) expires = new Date(restAttrs.expires)

        return [key, { value, expires }]
    }

    private _handleSetCookie(res: Response) {
        if (!res.headers.getSetCookie()) return res

        res.headers.getSetCookie().forEach((item) => {
            debug(`[Cookie] Received Set-Cookie: ${item}`)
            const [key, cookie] = this._parseCookieItem(item)
            this._cookieStore.set(key, cookie)
        })

        return res
    }

    private _buildParams<U extends Record<string, any>>(data: U) {
        const params = new URLSearchParams()
        Object.keys(data).forEach((key) => {
            params.append(key, data[key])
        })
        return params
    }

    private _buildRequest<U extends Record<string, any>>(method: 'get' | 'post' | 'post-form', url: string, data?: U) {
        const headers: HeadersInit = {}
        const opts: RequestInit = { method, headers }

        if (method === 'post') {
            headers['Content-Type'] = 'application/json'
            opts.body = JSON.stringify(data)
        }

        if (method === 'post-form') {
            // headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
            opts.method = 'post'
            if (data) opts.body = this._buildParams<U>(data)
        }

        return this.fetch(url, opts)
    }

    async fetch(url: string, opts: RequestInit = {}): Promise<Response> {
        const headers = Object.assign({}, this._headers, opts.headers, {
            cookie: this.cookieString,
        })

        const method = opts.method?.toUpperCase() || 'GET'
        debug(`[ RQST ] ${method} ${url}`)

        let res
        if (this.customFetch) {
            debug(`Custom fetch: ${url}`);
            res = await this.customFetch(url, {
                ...opts,
                headers
            })
        } else {
            res = await fetch(url, {
                ...opts,
                headers
            })
        }

        debug(`[ RESP ] ${method} ${url} ${res.status} ${res.statusText}`)

        if (res.url !== url) {
            debug(`Redirected from ${url} to ${res.url}`)
        }

        await this._checkStatus(res)
        this._handleSetCookie(res)

        return res
    }

    get(url: string) {
        return this._buildRequest('get', url)
    }

    post<U extends object = any>(url: string, data: U) {
        return this._buildRequest('post', url, data)
    }

    postForm<U extends object = any>(url: string, data: U) {
        return this._buildRequest('post-form', url, data)
    }
}
