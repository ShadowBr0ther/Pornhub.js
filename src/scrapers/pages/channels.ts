import { Route } from '../../apis'
import { getAttribute, getCheerio } from '../../utils/cheerio'
import { parseReadableNumber } from '../../utils/number'
import { UrlParser } from '../../utils/url'
import type { Engine } from '../../core/engine'
import type { CheerioAPI } from 'cheerio'

export interface ChannelsPage {

    name: string
    avatar: string
    rank: number
    cover: string
    videosFrontpage: string[]
    uploadedVideoCount: number
    subscribers: number
    videoViews?: number
    website?: string
    about: string
    byChannel: string
}

export async function channelPage(engine: Engine, urlOrName: string): Promise<ChannelsPage> {
    const name = UrlParser.getChannelsName(urlOrName)
    if (!name) throw new Error(`Invalid channel input: ${urlOrName}`)

    const url = Route.channelPage(name)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    return parseInfo($)
}

export async function channelVideoPage(engine: Engine, urlOrName: string, page: number): Promise<ChannelsPage> {

    const name = UrlParser.getChannelsNameVideoPage(urlOrName)
    if (!name) throw new Error(`Invalid channel input: ${urlOrName}`)
    const url = Route.channelPageWithVideos(name)+`?page=${page}`
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    return parseInfo($)
}

function getStats($: CheerioAPI, value: "VIDEO VIEWS" | "SUBSCRIBERS" | "VIDEOS" | "RANK"): string {
    const el = $(`#stats > .info`);
    let result = "0";
    el.each((_: any, elem: any) => {
        if ($(elem).find('span').text().trim() === value) {
            result = $(elem).text().trim()
        }
    });

    return result
}

function getDescription($: CheerioAPI, value: "DESCRIPTION" | "WEBSITE" | "BY" | "JOINED"): string {
    const el = $(`.cdescriptions > .joined`);
    let result = "0";
    el.each((_: any, elem: any) => {
        if (value === "DESCRIPTION") {
            if ($(elem).find('span').length === 0) {
                result = $(elem).text().trim()
            }
        } else {
            if ($(elem).find('.channelInfoHeadlines').text().trim() === value) {
                
                if (value === "WEBSITE"){
                    result = $(elem).find('a').attr('href')||""
                } 
                
                if (value === "BY"){
                    result = $(elem).find('a').attr('href')||""
                    if (result !== "") {
                        result = "https://www.pornhub.com"+result; 
                    }
                }
                
                if (value === "JOINED"){
                    let desc = $(elem).find(':not(.channelInfoHeadlines)')
                    result = $(desc).text().trim()
                }   
            }
        }
    });

    return result
}


function parseInfo($: CheerioAPI): ChannelsPage {
    
    const name = $('#channelsProfile .titleWrapper .title > h1').text().trim()

    const avatarEl = $('img#getAvatar, .topProfileHeader > .thumbImage > img')
    const avatar = getAttribute<string>(avatarEl, 'src', '')

    const coverEl = $('img#coverPictureDefault, .topProfileHeader > .coverImage > img')
    const cover = getAttribute<string>(coverEl, 'src', '')

    const linkEl = $('.widgetContainer ul.videos .thumbnail-info-wrapper .title a')
    let videosFrontpage: string[] = []; 
    linkEl.each((_: any,e: any)=> {videosFrontpage.push($(e).attr('href')!)});    
    
    const about = getDescription($, "DESCRIPTION")
    const videoViews = parseReadableNumber(getStats($, "VIDEO VIEWS"))
    const subscribers = parseReadableNumber(getStats($, "SUBSCRIBERS"))
    const uploadedVideoCount = parseReadableNumber(getStats($, "VIDEOS"))
    const rank = parseReadableNumber(getStats($, "RANK"))
    const website = getDescription($, "WEBSITE")

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
        byChannel: getDescription($, "BY"),
    } as ChannelsPage
}
