// user.js

document.addEventListener('DOMContentLoaded', function () {
    let userInfo = document.getElementById("user_info");
    let userD = document.getElementById("user");
    let links = document.getElementById("links");
    let logOutBtn = document.getElementById("logout");

    if (localStorage.getItem("username")) {
        if (links) {
            links.remove();
        }
        if (userInfo) {
            userInfo.style.display = "flex";
        }
        if (userD) {
            userD.innerHTML = "Welcome " + localStorage.getItem("username");
        }
    } else {
        if (userInfo) {
            userInfo.remove();
        }
    }

    if (logOutBtn) {
        logOutBtn.addEventListener("click", function () {
            localStorage.clear();
            setTimeout(() => {
                window.location = "login.html";
            }, 1000);
        });
    }
});
