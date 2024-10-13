const loadallpet = () => {
    document.getElementById("spinner").style.display = "none"
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then((res) => res.json())
        .then((data) => displaydata(data.categories))
        .catch((error) => console.log(error))
}
//here item will redesign with respect to it's own button
 const loadcategoryphoto = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            //i have to remove class
             actvbuttonremove()
            
            const actvbutton = document.getElementById(`bt-'${id}'`)
            console.log(actvbutton)
            actvbutton.classList.add("change")
            petdetails(data.data)
        })
        .catch((error) => console.log(error))

 }

//for button color remove
 const actvbuttonremove = () =>{
    const buttons =document.getElementsByClassName("photoclass")   
    for (let btn of buttons) {      
        btn.classList.remove("change")
    }
 }

// Here i create a category which have button functionality nice 
const displaydata = (data) => {   
    const categorycontain = document.getElementById("mainadopt")
    data.forEach((item) => {
        // console.log(item)
        const categorybutton = document.createElement('div')
        categorybutton.innerHTML = `
         <button id="bt-'${item.category}'" onclick="loadcategoryphoto('${item.category}')" class="photoclass btn category-btn rounded-2xl px-4 lg:px-6 py-1"><img class="h-[24px] mx-1" src="${item.category_icon}"> ${item.category}  
        </button>
        `
        categorycontain.appendChild(categorybutton)
    });
}

// here i load all photo
const loadallpetphoto = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then((res) => res.json())
        .then((data) => petdetails(data.pets))
        .catch((error) => console.log(error))
}

// Here we load image details
const loadDetailsp = async(photoid) =>{
    const urr= `https://openapi.programming-hero.com/api/peddy/pet/${photoid}`
    const res = await fetch(urr)
    const data = await res.json()
    detailsfunct(data.petData)
}

// This is our modal section
const detailsfunct = (photo) =>{
    console.log(photo)
    const modalcontent= document.getElementById("modal-content")
    document.getElementById("showModal").click()
    modalcontent.innerHTML =`
         <figure>
    <img class="w-full max-h-52 object-cover rounded-md"
      src="${photo.image} "
      alt="pets" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${photo.pet_name}</h2>
    <p class="font-bold text-[#131313B3]"><i class="mr-2 fa-regular fa-list"></i> Breed: ${photo.breed? photo.breed :"Not Available"} </p>
    <p class="font-bold text-[#131313B3]"><i class="mr-2 fa-regular fa-calendar"></i>Birth: ${photo.date_of_birth? photo.date_of_birth:"Not Available"}</p>
    <P class="font-bold text-[#131313B3]"><i class="mr-2 fa-solid fa-mercury"></i>Gender: ${photo.gender? photo.gender :"Not Available"} </P>
    <p class="font-bold text-[#131313B3]"><i class="mr-2 fa-solid fa-dollar-sign"></i>Price:${photo.price? photo.price :"Not Available"} </p>
    <p class="font-extrabold border-t-2 border-gray-200 my-1 py-2 text-xl">Details Information</p>
    <p class="font-bold  text-[#494949b3]">Price:${photo.pet_details} </p> 
  </div>
    `
}

//here i do the like functino event 
const like= (like) =>{
    const likebutton = document.getElementById("selectedpet")
    likebutton.innerHTML+=`  
     <img class="p-1 rounded-md border-1 border-gray-300" src="${like}" >
    `
}

// pet details display all photo
const petdetails = (data) => {
    const mainpet = document.getElementById("mainpet")
    mainpet.innerHTML =" "
    if(data.length == 0) {
        mainpet.classList.remove("grid")
        mainpet.innerHTML = `
         <div class="flex flex-col gap-3 rounded-2xl py-16 px-10 justify-center text-center items-center bg-[#13131308]"> 
           <img src="error.webp"> 
           <h1 class="text-[#131313] font-extrabold text-3xl text-center"> No Information Available </h1>
           <p class="text-[#131313B3]"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a. </p>
        </div>
        `
    } else{
        mainpet.classList.add("grid")
    }

    data.forEach((item) => {
        // console.log(item)
        const card = document.createElement("div")
        card.classList="card card-compact p-2 border-2 border-gray-200"
        card.innerHTML = `
          <figure>
    <img class="h-[180px] w-full object-cover rounded-md"
      src="${item.image}"
      alt="pets" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${item.pet_name}</h2>
    <p class="font-bold text-[#131313B3]"><i class="mr-2 fa-regular fa-list"></i> Breed: ${item.breed? item.breed : "Not Available"} </p>
    <p class="font-bold text-[#131313B3]"><i class="mr-2 fa-regular fa-calendar"></i>Birth: ${item.date_of_birth? item.date_of_birth : "Not Available"}</p>
    <P class="font-bold text-[#131313B3]"><i class="mr-2 fa-solid fa-mercury"></i>Gender: ${item.gender? item.gender : "Not Available"} </P>
    <p class="font-bold text-[#131313B3]"><i class="mr-2 fa-solid fa-dollar-sign"></i>Price:${item.price? item.price : "Not Available"} </p>
   <div class="flex justify-between items-center">
       <div class="border-2 rounded-md"> <button onclick="like('${item.image}')"><i class="p-2 px-3 fa-regular fa-thumbs-up"></i></button> </div>
       <div> <button onclick= "adopt(${item.petId})"class="btn px-2 bg-white border-1 rounded-md text-[#0E7A81] px">Adopt</button></div>
       <div> <button onclick= "loadDetailsp(${item.petId})" class="btn px-2 bg-white border-1 rounded-md text-[#0E7A81] px">Details</button> </div>
    </div>
  </div>
        `
        mainpet.appendChild(card)
    })
}

//spinner section
const handlepet = () => {
    document.getElementById("spinner").style.display = "block"
    setTimeout(function () {
        loadallpet();
        loadallpetphoto()
        
    }, 2000);
}
handlepet()






