/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import {
    signOutUser,
    checkAuth,
    fetchList,
    // addItem,
    // clearList,
    // buyItem,
} from './fetch-utils.js';
import { renderItem } from './render-utils.js';

// defines
const resetButton = document.getElementById('reset-button');
const logoutButton = document.getElementById('logout-button');
const itemForm = document.getElementById('item-form');
const itemLi = document.getElementById('item-list');
let itemArray = [];

self.addEventListener('load', async () => {
    checkAuth();
    await displayItems();
});

async function displayItems() {
    // fetch, reset, and render loop
    itemArray = await fetchList();
    itemLi.innerHTML = '';
    for (const item of itemArray) {
        const target = renderItem(item);
        itemLi.append(target);
    }
}
