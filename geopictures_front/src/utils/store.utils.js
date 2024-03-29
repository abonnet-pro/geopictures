import * as SecureStore from 'expo-secure-store';

export const TOKEN_GOOGLE = "TOKEN_GOOGLE";
export const JOUEUR = "JOUEUR";
export const USER_GOOGLE = "USER_GOOGLE";

export const BACKGROUND_ASSETS = { bordure: null, background: null };

export async function save(key, value) {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function getValueFor(key) {
    return JSON.parse(await SecureStore.getItemAsync(key));
}

export async function deleteStore(key) {
    await SecureStore.deleteItemAsync(key)
}

export function storeAssets(assets) {
    BACKGROUND_ASSETS.background = assets[0];
    BACKGROUND_ASSETS.bordure = assets[1];
}

export async function resetStore() {
    await deleteStore(JOUEUR);
    await deleteStore(USER_GOOGLE);
    await deleteStore(TOKEN_GOOGLE);
}