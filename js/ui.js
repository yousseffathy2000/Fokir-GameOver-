import { Details } from './details.js';

export function displayCards(catg) {
    let cartona = ``;
    for (let i = 0; i < catg.length; i++) {
        cartona += `<div class="col-12 col-md-6 col-lg-4 col-xl-3 d-flex  animate__animated animate__zoomIn" id="card-details" data-id="${catg[i].id}">
                        <div class="inner w-100 h-100">
                            <div class="card bg-transparent text-light h-100 d-flex flex-column">
                                <figure class="pt-3 px-3">
                                    <img src="${catg[i].thumbnail}" class="w-100" alt="${catg[i].title}">
                                </figure>
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h3 class="">${catg[i].title}</h3>
                                        <span class="badge badge2">Free</span>
                                    </div>
                                    <p class="card-text mt-2 px-4 text-center">${catg[i].short_description.split(" ", 8).join(" ")}</p>
                                </div>
                                <div class="card-footer d-flex justify-content-between small">
                                    <span class="badge text-bg-secondary">${catg[i].genre}</span>
                                    <span class="badge text-bg-secondary">${catg[i].platform}</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
    }
    document.getElementById("cards-row").innerHTML = cartona;

    const cards = document.querySelectorAll('#card-details');
    cards.forEach((card) => {
        card.addEventListener('click', async () => {
            const gameId = card.getAttribute('data-id');
            await showGameDetails(gameId);
        });
    });
}

async function showGameDetails(gameId) {
    const gameDetails = new Details(gameId);
    const details = await gameDetails.getApiDetails();
    displayDetails(details); 
}

export function displayDetails(details) {
    const detailsContainer = document.getElementById('game-details');
    detailsContainer.innerHTML = `
    <div class="container animate__animated animate__zoomIn">
        <div class="row pt-3">
            <div class="inner d-flex justify-content-between align-items-center">
                <h1 class="side-tittle col-6 text-white">Details Game</h1>
                <button type="button" class="btn-close btn-close-white col-6" aria-label="Close" id="close-details"></button>
            </div>
        </div>
        <div class="row pt-3 gy-4">
            <div class="col-md-4">
                <div class="inner">
                    <img src="${details.thumbnail}" class="w-100" alt="${details.title}">
                </div>
            </div>
            <div class="col-md-8">
                <div class="inner">
                    <h3 class="text-light">Title: ${details.title}</h3>
                    <p class="text-light">Category: <span class="badge text-bg-info">${details.genre}</span></p>
                    <p class="text-light">Platform: <span class="badge text-bg-info">${details.platform}</span></p>
                    <p class="text-light">Status: <span class="badge text-bg-info">${details.status}</span></p>
                    <p class="paragraph-details text-light">${details.description}</p>
                    <a href ="${details.game_url}" target="_blank" class="btn btn-outline-warning text-light">Show Game</a>
                </div>
            </div>
        </div>
    </div>
    `;
    detailsContainer.classList.remove("d-none");
    document.getElementById('close-details').addEventListener('click', () => {
        
        detailsContainer.classList.add("d-none");
        document.getElementById('games').classList.remove("d-none");
    });
}
