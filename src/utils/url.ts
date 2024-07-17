import { slugify } from './string';

export class UrlParser {
    static getVideoID(url: string) {
        const UrlRule = /[\w]+\.pornhub\.org\/view_video\.php\?viewkey=([a-zA-z0-9]{1,30})/;
        const id = UrlRule.test(url) ? UrlRule.exec(url)![1] : url;
        return id;
    }

    static getAlbumID(url: string) {
        const UrlRule = /[\w]+\.pornhub\.org\/album\/([0-9]{1,30})/;
        const id = UrlRule.test(url) ? UrlRule.exec(url)![1] : url;
        return id;
    }

    static getPhotoID(url: string) {
        const UrlRule = /[\w]+\.pornhub\.org\/photo\/([0-9]{1,30})/;
        const id = UrlRule.test(url) ? UrlRule.exec(url)![1] : url;
        return id;
    }

    static getPornstarName(url: string) {
        const UrlRule = /[\w]+\.pornhub\.org\/pornstar\/([a-zA-z0-9-]{1,30})/;
        const name = UrlRule.test(url) ? UrlRule.exec(url)![1] : slugify(url);
        return name;
    }

    static getPornstarNameVideoPage(url: string) {
        url = url.replace(/\/videos\/upload$/, '');
        const UrlRule = /[\w]+\.pornhub\.org\/pornstar\/([a-zA-z0-9-]{1,30})/;
        const name = UrlRule.test(url) ? UrlRule.exec(url)![1] : slugify(url);
        return name;
    }

    static getChannelsName(url: string) {
        const UrlRule = /[\w]+\.pornhub\.org\/channels\/([a-zA-z0-9-]{1,30})/;
        const name = UrlRule.test(url) ? UrlRule.exec(url)![1] : slugify(url);
        return name;
    }

    static getChannelsNameVideoPage(url: string) {
        url = url.replace(/\/videos\/upload$/, '');
        const UrlRule = /[\w]+\.pornhub\.org\/channels\/([a-zA-z0-9-]{1,30})/;
        const name = UrlRule.test(url) ? UrlRule.exec(url)![1] : slugify(url);
        return name;
    }

    static getModelName(url: string) {
        const UrlRule = /[\w]+\.pornhub\.org\/model\/([a-zA-z0-9-]{1,30})/;
        const name = UrlRule.test(url) ? UrlRule.exec(url)![1] : slugify(url);
        return name;
    }

    static getUsersName(url: string) {
        const UrlRule = /[\w]+\.pornhub\.org\/users\/([a-zA-z0-9-]{1,30})/;
        const name = UrlRule.test(url) ? UrlRule.exec(url)![1] : slugify(url);
        return name;
    }

    static getModelNameVideoPage(url: string) {
        url = url.replace(/\/videos$/, '');
        const UrlRule = /[\w]+\.pornhub\.org\/model\/([a-zA-z0-9-]{1,30})/;
        const name = UrlRule.test(url) ? UrlRule.exec(url)![1] : slugify(url);
        return name;
    }

    static getChannelName(url: string) {
        const UrlRule = /[\w]+\.pornhub\.org\/channels\/([a-zA-z0-9-]{1,30})/;
        const name = UrlRule.test(url) ? UrlRule.exec(url)![1] : slugify(url);
        return name;
    }
}
