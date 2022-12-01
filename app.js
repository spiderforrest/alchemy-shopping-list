/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import {
    signOutUser,
    checkAuth,
    fetchList,
    addItem,
    clearList,
    // buyItem,
} from './fetch-utils.js';
import { renderItem } from './render-utils.js';

// defines
const resetButton = document.getElementById('reset-button');
const logoutButton = document.getElementById('logout-button');
const itemForm = document.getElementById('item-form');
const itemsDiv = document.getElementById('items-div');
const form = document.getElementById('input');

// listeners
self.addEventListener('load', async () => {
    checkAuth();
    await displayItems();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    await addItem(data.get('name'));
    await displayItems();
});

resetButton.addEventListener('click', async () => {
    await clearList();
    await displayItems();
});

// functions
async function displayItems() {
    // fetch, reset, and render loop
    const itemArray = await fetchList();
    itemsDiv.innerHTML = '';
    for (const item of itemArray) {
        const target = renderItem(item);
        itemsDiv.append(target);
    }
}
