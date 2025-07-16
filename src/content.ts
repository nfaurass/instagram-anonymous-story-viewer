import {createHtml, createStoryImageElement, createStoryVideoElement} from "./html";
import {Instagram} from "./instagram";

function runWhenReady(callback: () => void) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", callback);
    else callback();
}

runWhenReady(async () => {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const username = pathParts[0];
    const isProfilePage = pathParts.length === 1 || (pathParts.length === 2 && ["reels", "tagged", "followers", "following"].includes(pathParts[1]));
    if (!isProfilePage || !username) return;
    const sidebarContent = createHtml();
    const viewBtn = document.getElementById("iasv-close-anonBtn");
    if (!viewBtn) return;
    viewBtn.addEventListener("click", async () => {
        const findAppInfo = (): Promise<{ appId: string; profileId: string | null }> => {
            return new Promise((resolve) => {
                const extractInfo = (text: string): { appId: string; profileId: string | null } | null => {
                    const appIdMatch = text.match(/X-IG-App-ID\s*["']?\s*[:=]\s*["']([^"']+)["']/);
                    const profileMatch = text.match(/"page_id":"profilePage_(\d+)"[^}]*"profile_id":"(\d+)"/);
                    if (appIdMatch) {
                        if (profileMatch && profileMatch[1] === profileMatch[2]) return {
                            appId: appIdMatch[1],
                            profileId: profileMatch[1]
                        };
                        else return {
                            appId: appIdMatch[1],
                            profileId: null
                        };
                    }
                    return null;
                };
                const scanTree = (): { appId: string; profileId: string | null } | null => {
                    const treeWalker = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null);
                    while (treeWalker.nextNode()) {
                        const node = treeWalker.currentNode;
                        if (node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.TEXT_NODE || ("tagName" in node && (node.tagName === "SCRIPT" || node.tagName === "NOSCRIPT"))) {
                            const text = node.textContent;
                            if (!text) continue;
                            const result = extractInfo(text);
                            if (result) return result;
                        }
                    }
                    return null;
                };
                const immediateResult = scanTree();
                if (immediateResult) {
                    resolve(immediateResult);
                    return;
                }
                const observer = new MutationObserver(() => {
                    const result = scanTree();
                    if (result) {
                        observer.disconnect();
                        resolve(result);
                    }
                });
                observer.observe(document.documentElement, {childList: true, subtree: true});
            });
        };
        let {appId, profileId} = await findAppInfo();
        if (!appId) return;
        sidebarContent.innerText = "Loading stories...";
        const instagram = new Instagram(appId);
        try {
            if (!profileId) {
                const user = await instagram.getUserByUsername(username);
                if (!user) return;
                else profileId = user.id;
            }
            if (!profileId) return;
            const stories = await instagram.getUserStories(profileId);
            if (!stories || stories.length === 0) return;
            console.log(stories);
            const medias = stories.reels_media[0].items || [];
            if (!medias.length) {
                sidebarContent.innerText = "No stories found.";
                return;
            }
            sidebarContent.innerText = "";
            for (const item of medias) {
                console.log("Story item:", item);
                if (item.video_versions && item.video_versions.length > 0) createStoryVideoElement(item, sidebarContent);
                else createStoryImageElement(item, sidebarContent);
            }
        } catch {
            sidebarContent.innerText = `Failed to load stories.`;
        }
    });
});