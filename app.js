const loadCategory = () => {
    
    fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res)=>res.json())
    .then((data)=>displayCategory(data.data))
}
const displayCategory = (data) => {
    const categoryContainer = document.getElementById("category");
    data.forEach((cate) => {
        const cateBox = document.createElement("div");
        cateBox.classList.add("box");
        cateBox.innerHTML = `
        
        <button onClick="loadAllVideo('${cate.category_id}')" class="cate-btn">${cate.category}</button>
        `;
        categoryContainer.appendChild(cateBox);
    })

}
// sort block 
let videosData = [];



const loadAllVideo = (id) => {
  fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id ? id : 1000}`
  )
    .then((res) => res.json())
    .then((data) => {
      videosData = data.data;
      displayAllVideo(videosData);
    });
};

const displayAllVideo = (videos) => {
    if (videos.length == 0) {
        const cardContainer = document.getElementById("all-data");
        cardContainer.innerHTML = "";
        const card = document.createElement("div");
        card.innerHTML = `
        <img class="card-img" src="./icons/Icon.png" alt="">
        <h1>There is no data found</h1>
        `;
        cardContainer.appendChild(card);
        return;

    }
    const cardContainer = document.getElementById("all-data");
    cardContainer.innerHTML = "";
    videos.forEach((video) => {
      const card = document.createElement("div");
      card.classList.add("col");
      card.innerHTML = `
        <img class="card-img" src="${video.thumbnail}" alt="">
        <div class="card-body">
        <div>
        <img class="profile-img" src="${
          video.authors[0].profile_picture
        }" alt="">
        </div>
        <div class="profile">
        <p class="title">${video.title}</p>
        <small class="profile-name">${video.authors[0].profile_name}</small>
        <small class="profile-name">${
          video.authors[0].verified ? '<i class="fas fa-check-circle font-icon"></i>' : ""
        }</small>
        
        <br>
        <small>${video.others.views} views</small>
        </div>
        
        `;
        cardContainer.appendChild(card)
    });
}

// sort 
const sortByViews = () => {
  videosData.sort(
    (a, b) => parseInt(b.others.views, 10) - parseInt(a.others.views, 10)
  );
  displayAllVideo(videosData);
};



loadAllVideo()
loadCategory();
