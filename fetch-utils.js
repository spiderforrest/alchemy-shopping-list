const SUPABASE_URL = 'https://njqdydcjmajdjmyztzov.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qcWR5ZGNqbWFqZGpteXp0em92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgwMjAsImV4cCI6MTk4MzY4NDAyMH0.r6bSNSp-6Ts4GRV3-pnwjFMUWdUGlWU4EiIWbDqrTXU';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

export function checkAuth() {
    if (!getUser()) {
        location.replace('./auth/index.html');
    }
}

/* Data functions */

// catch fn
function checkError({ data, error }) {
    if (error) return console.error(error);
    return data;
}

export async function fetchList() {
    const response = await client
        .from('shopping_list')
        .select()
        .match({ user_id: client.auth.user().id });
    return checkError(response);
}

export async function addItem(name) {
    const response = await client
        .from('shopping_list')
        .insert({ name: name, bought: false, user_id: client.auth.user().id });
    return checkError(response);
}
