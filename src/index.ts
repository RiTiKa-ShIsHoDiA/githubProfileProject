const getUserInput = document.getElementById("user-name") as HTMLElement
const formInput = document.querySelector(".input-form") as HTMLElement
const mainContRef = document.querySelector(".mainContainer") as HTMLElement


// interface for each user details 

interface User{
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    html_url: string,
    // "followers_url": "https://api.github.com/users/mojombo/followers",
    // "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
    // "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
    // "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
    // "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
    // "organizations_url": "https://api.github.com/users/mojombo/orgs",
    // "repos_url": "https://api.github.com/users/mojombo/repos",
    // "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
    // "received_events_url": "https://api.github.com/users/mojombo/received_events",
    // "type": "User",
    user_view_type: string;
    site_admin: boolean;
}

//get user details

async function getUserDetails<T>(url:string): Promise<T> {
    const response = await fetch(url)

    if(!response.ok){
     throw new Error('Network response was not okay')
    }
    console.log(response);
return response.json();
}

function setUserDetaisl(user:User){
    mainContRef.innerHTML +=  `<div class="profile-card">
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


async function fetchUserDetails(searchText ?: string) {
    try {
        var data = await getUserDetails<User[]>("https://api.github.com/users");
        mainContRef.innerHTML = "";
        if (searchText?.length) {
            data = data.filter((element: User) => element.login.toLowerCase().includes(searchText))
          
        
        }
        console.log("final data", data);
      
        data.forEach(element => {
           setUserDetaisl(element);
       }); 

    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }
//fucntion call 
fetchUserDetails();


formInput.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement
    const searchParams:string= (form.elements[0] as HTMLInputElement ).value;
    console.log("ritika", searchParams)
    
    fetchUserDetails(searchParams.toLowerCase());
})

