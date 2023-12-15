const loadCategory = () => {
    
    fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res)=>res.json())
    .then((data)=>displayCategory(data.data))
}
const displayCategory = (data) => {
    console.log(data)
    const categoryContainer = document.getElementById("category");
    data.forEach((cate) => {
        console.log(cate)
        const cateBox = document.createElement("div");
        cateBox.classList.add("box");
        cateBox.innerHTML = `
        <button class="cate-btn">${cate.category}</button>
        `;
        categoryContainer.appendChild(cateBox);
    })

}

loadCategory();