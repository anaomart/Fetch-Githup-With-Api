let theInput = document.querySelector("input");
let button = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");
button.onclick = function() {
    getRepos();
};
theInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getRepos();
    }
});

function getRepos() {
    if (theInput.value == "") {
        reposData.innerHTML = "<span>Please Write the Username</span>";
    } else {
        let userName = theInput.value;
        console.log(userName);
        fetch(`https://api.github.com/users/${userName}/repos`)
            .then((repos) => {
                return repos.json();
            })
            .then((data) => {
                console.log(data[1].clone_url);
                reposData.innerHTML = '';
                for (let i = 0; i < data.length; i++) {
                    let div = document.createElement("div");
                    let text = document.createTextNode(data[i].name);
                    let link = document.createElement('a');
                    link.href = data[i].clone_url;
                    link.appendChild(text);
                    div.appendChild(link);
                    reposData.appendChild(div);
                }
            });
    }
}