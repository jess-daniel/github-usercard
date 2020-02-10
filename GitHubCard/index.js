/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

// Get my github and append to cardsDiv
axios.get("https://api.github.com/users/jess-daniel")
.then(response => {
  const newCard = githubCard(response);
  cardsDiv.appendChild(newCard);
}) 
.catch(error => {
  console.log("The data was not returned", error);
});

// Get all followers and add to an array
function getFollowers() {
  followers = [];
  axios.get("https://api.github.com/users/jess-daniel/followers")
  .then(response => {
    response.data.forEach(e => {
       followers.push(e);
    })
  })
  // append followers to DOM
  .then(function(result) {
    followers.forEach(e => {
      axios.get(`https://api.github.com/users/${e.login}`)
      .then(response => {
        cardsDiv.appendChild(githubCard(response));
      })
    })
  })
}

getFollowers();

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ["tetondan","dustinmyers", "justsml", "luishrd", "bigknell"];

function friendsProfiles(arr) {
  followersArray.forEach(friend => {
    axios.get(`https://api.github.com/users/${friend}`)
  .then(response => {
    const newCard = githubCard(response);
    cardsDiv.appendChild(newCard);
  })
  })
}

friendsProfiles();
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

// Grab cards div
const cardsDiv = document.querySelector(".cards");

// Card creator function
function githubCard(obj) {
  // Create elements
  const card = document.createElement("div");
  const img = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const userName = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const address = document.createElement("a")
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  // create structure 
  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(address);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  // add classes
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username")

  // add content from API
  img.src = obj.data.avatar_url;
  name.textContent = obj.data.name;
  userName.textContent = obj.data.login;
  location.textContent = obj.data.location;
  address.textContent = obj.data.url;
  address.href = obj.data.url;
  followers.textContent = `Folowers: ${obj.data.followers}`;
  following.textContent = `Following: ${obj.data.following}`;
  bio.textContent = obj.data.bio;


  return card;
}


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
