import { displayCards, displayDetails } from './ui.js';
import { Details } from './details.js';

export function handleSpinner() {
    window.addEventListener("load", function() {
        window.setTimeout(() => {
            document.getElementById("spinner").classList.add("d-none");
            document.getElementById("games").classList.remove("d-none");
            let myGame = new Games("mmorpg");
            myGame.getApi();
        }, 1000);
    });
}

export let gamesData = [];
export function categoryClick() {
    let categorys = document.querySelectorAll(".nav-link");
    let category = Array.from(categorys);
    category.forEach((element) => {
        element.addEventListener("click", async (event) => {
            category.forEach(link => link.classList.remove("active"));
            event.target.classList.add("active");
            document.getElementById("spinner").classList.remove("d-none");
            document.getElementById("games").classList.add("d-none");
            let myGame = new Games(element.innerHTML);
            await myGame.getApi();
            document.getElementById("spinner").classList.add("d-none");
            document.getElementById("games").classList.remove("d-none");
        });
    });
}

export class Games {
    constructor(myCategory) {
        this.myCategory = myCategory;
    }
    async getApi() {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'b1724ba667msh7691d8a8b02f78cp1a8342jsn5793579be012',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
            let promise = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.myCategory}`, options);
            let response = await promise.json();
            displayCards(response);
            const cards = document.querySelectorAll('#card-details');
            cards.forEach(card => {
                card.addEventListener('click', async (event) => {
                    const gameId = event.currentTarget.getAttribute('data-id');
                    document.getElementById("spinner").classList.remove("d-none");
                    document.getElementById("games").classList.add("d-none"); 
                    const gameDetails = new Details(gameId);
                    const details = await gameDetails.getApiDetails();
                    displayDetails(details);
                    document.getElementById("spinner").classList.add("d-none"); 
                    document.getElementById("game-details").classList.remove("d-none");
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
}
