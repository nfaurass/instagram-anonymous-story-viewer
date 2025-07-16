export function createHtml() {
    const anonBtn = document.createElement("button");
    anonBtn.textContent = "View Anonymously";
    Object.assign(anonBtn.style, {
        position: "fixed",
        top: "30px",
        right: "30px",
        padding: "12px 24px",
        backgroundColor: "#00a85f",
        fontWeight: "600",
        color: "white",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        zIndex: "1000000",
        fontSize: "16px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        userSelect: "none",
        transition: "background-color 0.3s ease",
    });
    anonBtn.id = "iasv-close-anonBtn";
    anonBtn.addEventListener("mouseenter", () => anonBtn.style.backgroundColor = "#008e50");
    anonBtn.addEventListener("mouseleave", () => anonBtn.style.backgroundColor = "#00a85f");
    document.body.appendChild(anonBtn);
    const sidebar = document.createElement("div");
    Object.assign(sidebar.style, {
        position: "fixed",
        top: "0",
        right: "0",
        height: "100vh",
        width: "40%",
        maxWidth: "500px",
        backgroundColor: "#000",
        padding: "10px 10px",
        boxSizing: "border-box",
        zIndex: "1000001",
        transform: "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "-20px 0px 20px 10px #00000090",
    });
    sidebar.id = "iasv-close-sidebar";
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    Object.assign(closeBtn.style, {
        width: "100%",
        padding: "12px",
        marginTop: "10px",
        backgroundColor: "#00a85f",
        fontWeight: "600",
        color: "white",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        zIndex: "1000000",
        fontSize: "16px",
        userSelect: "none",
        transition: "background-color 0.3s ease",
    });
    closeBtn.id = "iasv-close-closeBtn";
    closeBtn.addEventListener("mouseenter", () => closeBtn.style.backgroundColor = "#008e50");
    closeBtn.addEventListener("mouseleave", () => closeBtn.style.backgroundColor = "#00a85f");
    closeBtn.addEventListener("click", () => sidebar.style.transform = "translateX(100%)");
    const sidebarContent = document.createElement("div");
    sidebarContent.textContent = "Stories loading...";
    Object.assign(sidebarContent.style, {
        fontSize: "16px",
        color: "#333",
        flexGrow: "1",
        overflowY: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "12px 12px",
        paddingRight: "4px",
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        paddingBottom: "10px"
    });
    sidebarContent.id = "iasv-close-sidebarContent";
    sidebar.appendChild(sidebarContent);
    sidebar.appendChild(closeBtn);
    document.body.appendChild(sidebar);
    anonBtn.addEventListener("click", () => sidebar.style.transform = "translateX(0)");
    closeBtn.addEventListener("click", () => sidebar.style.transform = "translateX(100%)");
    return sidebarContent;
}

export function createStoryImageElement(item: any, sidebarContent: HTMLDivElement) {
    const img = document.createElement("img");
    img.src = item.image_versions2?.candidates?.[0]?.url || "";
    Object.assign(img.style, {
        width: "100%",
        height: "auto",
        objectFit: "cover",
        userSelect: "none",
        cursor: "pointer",
    });
    sidebarContent.appendChild(img);
}

export function createStoryVideoElement(item: any, sidebarContent: HTMLDivElement) {
    const video = document.createElement("video");
    video.src = item.video_versions?.[0]?.url || "";
    video.controls = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    Object.assign(video.style, {
        width: "100%",
        height: "auto",
        objectFit: "cover",
        userSelect: "none",
        cursor: "pointer",
    });
    sidebarContent.appendChild(video);
}