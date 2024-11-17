function scrollToMain() {
  document.getElementById("mainSection").scrollIntoView({ behavior: "smooth" });
}
const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
const loadPets = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
};
const displayPets = (pets, clearContainer = false) => {
  const petsContainer = document.getElementById("post-container");

  // If clearContainer is true, clear the previous content
  if (clearContainer) {
    petsContainer.innerHTML = "";
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList =
      "pet-card border p-3 rounded-lg flex flex-col gap-1 lg:items-start md:items-start";
    card.innerHTML = `
    <style>
    #for-hover:hover, #get-adopt:hover, #get-details:hover {
      background-color: rgb(14, 122, 129);
      color: white;
    }
    </style>
    <img class="mb-2 rounded-lg" src="${pet.image}" alt="Animals" />
    <h1 class="text-lg font-bold">${
      pet.pet_name == null ? "No Data" : pet.pet_name
    }</h1>

    <div class="flex gap-2 items-center">
      <i class="fa-solid fa-border-none"></i>Breed: ${
        pet.breed == null ? "No Data" : pet.breed
      }
    </div>
    <div class="flex gap-2 items-center">
      <i class="fa-regular fa-calendar-days"></i>Birth: ${
        pet.date_of_birth == null ? "No Data" : pet.date_of_birth
      }
    </div>
    <div class="flex gap-2 items-center">
      <i class="fa-solid fa-venus-mars"></i>Gender: ${
        pet.gender == null ? "No Data" : pet.gender
      }
    </div>
    <div class="flex gap-2 items-center">
      <i class="fa-solid fa-dollar-sign"></i>Price: ${
        pet.price == null ? "No Data" : pet.price
      }
    </div>
    <div class="flex justify-between gap-3">
      <button onclick="markImage('${
        pet.image
      }')" id="for-hover" class="border rounded-lg px-2 py-1">
        <i id="get-image" class="fa-regular fa-thumbs-up"></i>
      </button>
      <button onclick="openModal()" id="get-adopt" class="border rounded-lg px-2 py-1 font-extrabold button-text-color">Adopt</button>
      <button id="get-details" onclick="showModal('${
        pet.petId
      }')" class="border rounded-lg px-2 py-1 font-extrabold button-text-color">Details</button>
    </div>`;
    petsContainer.append(card);
  });
};

const loadSort = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  const pets = data.pets;
  displayPets(pets);
  document.getElementById("sortButton").addEventListener("click", () => {
    const sortedPets = pets.sort((a, b) => (b.price || 0) - (a.price || 0));
    displayPets(sortedPets, true);
  });
};

loadSort();

const modal = document.getElementById("my_modal_5");
const countdownElement = document.getElementById("countdown");

function openModal() {
  modal.showModal();
  let countdown = 3;
  countdownElement.textContent = countdown;

  const interval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;
    if (countdown === 0) {
      clearInterval(interval);
      modal.close();
    }
  }, 1000);
}

//
function showModal(petId) {
  const loadDetails = () => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        displayDetails(data.petData);
      })
      .catch((error) => {
        console.log("Error fetching pet data:", error);
      });
  };
  const displayDetails = (petData) => {
    // console.log("Displaying details for pet:", petData);
    const detailsContainer = document.getElementById("detailsModal");
    const createDiv = document.createElement("div");
    detailsContainer.innerHTML = "";
    createDiv.className = "modal-box";
    createDiv.innerHTML = `
      <div class="flex flex-col gap-2">
      <img class="rounded-lg" src="${petData.image}" alt="Image">
      <h1 class="text-2xl font-bold">${
        petData.pet_name == null ? "No Data" : petData.pet_name
      }</h1>
      <div class="flex flex-row  justify-between">
        <div class="left-modal flex flex-col gap-2 w-1/2">
          <div class="flex gap-2 items-center"><i class="fa-solid fa-border-none"></i>Breed: ${
            petData.breed == null ? "No Data" : petData.breed
          }</div>
          <div class="flex gap-2 items-center"><i class="fa-solid fa-venus-mars"></i>Gender: ${
            petData.gender == null ? "No Data" : petData.gender
          }</div>
          <div class="flex gap-2 items-center"><i class="fa-solid fa-virus"></i>Vaccinated status: ${
            petData.vaccinated_status == null
              ? "No Data"
              : petData.vaccinated_status
          }</div>
        </div>
        <div class="right-modal w-1/2">
          <div class="flex gap-2 items-center"><i class="fa-regular fa-calendar-days"></i>Birth: ${
            petData.date_of_birth == null ? "No Data" : petData.date_of_birth
          }</div>
          <div class="flex gap-2 items-center"><i class="fa-solid fa-dollar-sign"></i>Price: ${
            petData.price == null
              ? "No Data"
              : petData.price == null
              ? "No Data"
              : petData.price
          }</div>
        </div>
      </div>
      <hr class="py-2">
      <h2 class="text-lg font-bold">Details Information</h2>
      <p>${petData.pet_details == null ? "No Data" : petData.pet_details}</p>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Cancel</button>
      </form>
    </div>
    `;
    detailsContainer.append(createDiv);
    detailsContainer.showModal();
  };
  // console.log(`Fetching data for pet ID: ${petId}`);
  loadDetails();
}
const markImage = (image) => {
  const getImageContainer = document.getElementById("get-image-container");
  const div = document.createElement("div");
  div.innerHTML = `
            <img class="rounded-lg border p-1" src="${image}" alt="Animal">
        `;
  console.log(div);
  getImageContainer.appendChild(div);
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("post-category");
  categories.forEach((item) => {
    // console.log(item);
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `<button id="button-${item.category}" onclick="clickCategory('${item.category}')" class="button category-btn flex justify-center items-center text-center gap-2 border lg:px-10
        lg:py-5 md:px-10 md:py-4 px-3 py-2 rounded-xl"
      >
        <img
          class="lg:w-[40px] lg:h-[40px] md:w-[30px] md:h-[30px] h-[20px] w-[20px] "
          src="${item.category_icon}"
          alt=""
        />
        <h1 class="font-bold text-lg">${item.category}</h1>
      </button>`;

    categoryContainer.appendChild(buttonContainer);
  });
};

function clickCategory(category) {
  const allButtons = document.querySelectorAll(".category-btn");
  allButtons.forEach((button) => {
    button.classList.remove("active");
  });
  const activeButton = document.getElementById(`button-${category}`);
  if (activeButton) {
    activeButton.classList.add("active");
  }

  const loadCategory = () => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        displayCategory(data.data);
      })
      .catch((error) => {
        console.log("Error fetching pet data:", error);
      });
  };

  const displayCategory = (data) => {
    const showCategory = document.getElementById("post-container");
    showCategory.innerHTML = "";
    showCategory.innerHTML = `
        <div class="spinner-container" style="display: flex; justify-content: center; align-items: center; height: 200px;">
            <div class="loading-spinner" style="
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-left-color: #000;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
            "></div>
        </div>
    `;
    setTimeout(() => {
      showCategory.innerHTML = "";
    if (data.length === 0) {
      const noContentDiv = document.createElement("div");
      noContentDiv.className = "no-content";
      noContentDiv.classList =
        "border p-3 rounded-lg flex flex-col gap-1 lg:items-start md:items-start";
      noContentDiv.innerHTML = `
        <img class="w-full" src="images/error.webp" alt="" />
        <h1 class="text-2xl font-bold">No Information Available</h1>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>`;
      showCategory.appendChild(noContentDiv);
    } else {
      data.forEach((pet) => {
        const newDiv = document.createElement("div");
        newDiv.classList =
          "pet-card border p-3 rounded-lg flex flex-col gap-1 lg:items-start md:items-start";
        newDiv.innerHTML = `
                <style>
                    #for-hover:hover, #get-adopt:hover, #get-details:hover {
                        background-color: rgb(14, 122, 129);
                        color: white;
                    }
                </style>
                <img class="mb-2 rounded-lg" src="${pet.image}" alt="Animals" />
                <h1 class="text-lg font-bold">${pet.pet_name || "No Data"}</h1>
                <div class="flex gap-2 items-center">
                    <i class="fa-solid fa-border-none"></i>Breed: ${
                      pet.breed || "No Data"
                    }
                </div>
                <div class="flex gap-2 items-center">
                    <i class="fa-regular fa-calendar-days"></i>Birth: ${
                      pet.date_of_birth || "No Data"
                    }
                </div>
                <div class="flex gap-2 items-center">
                    <i class="fa-solid fa-venus-mars"></i>Gender: ${
                      pet.gender || "No Data"
                    }
                </div>
                <div class="flex gap-2 items-center">
                    <i class="fa-solid fa-dollar-sign"></i>Price: ${
                      pet.price || "No Data"
                    }
                </div>
                <div class="flex justify-between gap-3">
                    <button id="for-hover" onclick="markImage('${
                      pet.image
                    }')" class="border rounded-lg px-2 py-1">
                        <i id="get-image"  class="fa-regular fa-thumbs-up"></i>
                    </button>
                    <button id="get-adopt" onclick="openModal()" class="border rounded-lg px-2 py-1 font-extrabold button-text-color">
                        Adopt
                    </button>
                    <button id="get-details" onclick="showModal('${
                      pet.petId
                    }')" class="border rounded-lg px-2 py-1 font-extrabold button-text-color">
                        Details
                    </button>
                </div>
            `;
        showCategory.appendChild(newDiv);
      });
    }
  }, 2000); 
  };

  loadCategory();
}



loadCategories();
loadPets();
