import axios from "axios";
import {URL_API} from "../../../utils/url.utils";
import {getValueFor, JOUEUR} from "../../../utils/store.utils";
import {header} from "../../../utils/http.utils";

export async function loadClassement() {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/classement`, header(joueur.token));
}

export async function getClassementByZoneId(zoneId) {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/classement?zoneId=${zoneId}`, header(joueur.token));
}

export async function getClassementByCodeRegion(codeRegion) {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/classement?codeRegion=${codeRegion}`, header(joueur.token));
}

export async function getClassementByPhotoId(photoId) {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/classement?photoId=${photoId}`, header(joueur.token));
}

export async function getClassementByZoneIdAndCodeRegion(zoneId, codeRegion) {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/classement?zoneId=${zoneId}&codeRegion=${codeRegion}`, header(joueur.token));
}

export async function getAllRegion() {
    const joueur = await getValueFor(JOUEUR);
    return axios.get(`${URL_API}/region`, header(joueur.token));
}