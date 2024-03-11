import { Route } from '../../apis'
import { getAttribute, getCheerio } from '../../utils/cheerio'
import { parseReadableNumber } from '../../utils/number'
import { UrlParser } from '../../utils/url'
import type { Engine } from '../../core/engine'
import type { CheerioAPI } from 'cheerio'

export interface UsersPage {
    name: string
    avatar: string
    cover: string
    about : string
    subscribers: number
    
    uploadedVideoCount: number
    videoViews?: number
    profileViews?: number
}


function getStats($: CheerioAPI, value: "Subscribers" | "Videos" | "Video Views"): string {
    const el = $(`.subViewsInfoContainer > li > a`);
    let result = "0";
    el.each((_: any, elem: any) => {
        if ($(elem).find('.connections').text().trim().toLowerCase() === value.toLowerCase()) {
            result = $(elem).find('.number').text().trim()
        }
    });

    return result
}

function getProfileViews($: CheerioAPI): string {
    const elDt = $(".moreInformation > dt");
    const elDd = $(".moreInformation > dd");

    let result = "0";
    elDt.each((i: any, elem: any) => {
        if ($(elem).text().trim().toLowerCase() === "profile views:") {
            result = $(elDd[i]).text().trim()
        }
    });
    return result;
}


export async function usersPage(engine: Engine, urlOrName: string): Promise<UsersPage> {
    const name = UrlParser.getUsersName(urlOrName)
    if (!name) throw new Error(`Invalid model input: ${urlOrName}`)


    const url = Route.userPage(name)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    return parseInfo($)
}

function parseInfo($: CheerioAPI): UsersPage {
    const name = $('.profileUserName > a').text().trim()

    const avatarEl = $('img#getAvatar, .topProfileHeader > .thumbImage > img')
    const avatar = getAttribute<string>(avatarEl, 'src', '')

    const coverEl = $('img#coverPictureDefault, .topProfileHeader > .coverImage > img')
    const cover = getAttribute<string>(coverEl, 'src', '')

    const aboutEl = $('.aboutMeText')
    const about = aboutEl.text().trim()

    const subscribers = parseReadableNumber(getStats($, "Subscribers"))
    const uploadedVideoCount = parseReadableNumber(getStats($, "Videos"))
    const videoViews = parseReadableNumber(getStats($, "Video Views"))
    const profileViews = parseReadableNumber(getProfileViews($))

    return {
        name,
        about,
        avatar,
        cover,
        subscribers,
        uploadedVideoCount,
        videoViews,
        profileViews
    } as UsersPage
}
