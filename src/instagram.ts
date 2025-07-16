export class Instagram {
    private static API_URL = "https://i.instagram.com/api/v1";
    private userCache: Record<string, any> = {};
    private readonly APP_ID;

    constructor(appId: string) {
        this.APP_ID = appId;
    }

    async getUserByUsername(username: string): Promise<any | undefined> {
        if (!(username in this.userCache)) {
            const apiPath = `users/web_profile_info/?username=${username}`;
            const data = await this.sendAPIRequestByPath(apiPath);
            if (data && data.data && data.data.user) this.userCache[username] = data.data.user;
        }
        return this.userCache[username];
    }

    async getUserStories(userID: string): Promise<any> {
        return this.sendAPIRequestByPath(`feed/reels_media/?reel_ids=${userID}`);
    }

    private async sendAPIRequest(url: string): Promise<any> {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "x-ig-app-id": this.APP_ID,
                },
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            console.error(`Network error for ${url}`, err);
            throw err;
        }
    }

    private sendAPIRequestByPath(path: string): Promise<any> {
        return this.sendAPIRequest(`${Instagram.API_URL}/${path}`);
    }
}