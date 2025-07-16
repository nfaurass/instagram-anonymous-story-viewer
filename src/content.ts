const anonBtn = document.createElement("button");
anonBtn.textContent = "View Anonymously";
anonBtn.style.position = "fixed";
anonBtn.style.top = "40px";
anonBtn.style.right = "40px";
anonBtn.style.padding = "12px 24px";
anonBtn.style.backgroundColor = "#3897f0";
anonBtn.style.color = "white";
anonBtn.style.border = "none";
anonBtn.style.borderRadius = "25px";
anonBtn.style.cursor = "pointer";
anonBtn.style.zIndex = "1000000";
anonBtn.style.fontSize = "16px";
anonBtn.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
document.body.appendChild(anonBtn);

const sidebar = document.createElement("div");
sidebar.style.position = "fixed";
sidebar.style.top = "0";
sidebar.style.right = "0";
sidebar.style.height = "100vh";
sidebar.style.width = "40%";
sidebar.style.maxWidth = "80vw";
sidebar.style.backgroundColor = "white";
sidebar.style.boxShadow = "-3px 0 10px rgba(0,0,0,0.2)";
sidebar.style.padding = "20px";
sidebar.style.boxSizing = "border-box";
sidebar.style.zIndex = "1000001";
sidebar.style.transform = "translateX(100%)";
sidebar.style.transition = "transform 0.3s ease-in-out";

const closeBtn = document.createElement("button");
closeBtn.textContent = "✕";
closeBtn.style.position = "absolute";
closeBtn.style.top = "10px";
closeBtn.style.right = "10px";
closeBtn.style.background = "transparent";
closeBtn.style.border = "none";
closeBtn.style.fontSize = "24px";
closeBtn.style.cursor = "pointer";

const sidebarContent = document.createElement("div");
sidebarContent.textContent = "Stories to be displayed here";
sidebarContent.style.marginTop = "50px";
sidebarContent.style.fontSize = "16px";
sidebarContent.style.color = "#333";
sidebar.appendChild(closeBtn);
sidebar.appendChild(sidebarContent);
document.body.appendChild(sidebar);

anonBtn.addEventListener("click", () => {
    sidebar.style.transform = "translateX(0)";
});

closeBtn.addEventListener("click", () => {
    sidebar.style.transform = "translateX(100%)";
});