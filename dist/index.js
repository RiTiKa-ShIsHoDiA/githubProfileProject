"use strict";
const getUserInput = document.getElementById("user-name");
const formInput = document.querySelector(".input-form");
const mainContRef = document.querySelector(".mainContainer");
//get user details
async function getUserDetails(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not okay');
    }
    console.log(response);
    return response.json();
}
function setUserDetaisl(user) {
    mainContRef.innerHTML += `<div class="profile-card">
    <div class="user-image" >
        <img src="${user.avatar_url}" alt="Profile Image" class="avatar">
        </div> 
        <div class="profile-info">
            <h3>${user.user_view_type}</h3>
            <a href="${user.html_url}" target="_blank">${user.login}</a>
        </div>
    </div>
`;
}
async function fetchUserDetails(searchText) {
    try {
        var data = await getUserDetails("https://api.github.com/users");
        mainContRef.innerHTML = "";
        if (searchText?.length) {
            data = data.filter((element) => element.login.toLowerCase().includes(searchText));
        }
        console.log("final data", data);
        data.forEach(element => {
            setUserDetaisl(element);
        });
    }
    catch (error) {
        console.error("Error fetching user details:", error);
    }
}
//fucntion call 
fetchUserDetails();
formInput.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const searchParams = form.elements[0].value;
    console.log("ritika", searchParams);
    fetchUserDetails(searchParams.toLowerCase());
});
