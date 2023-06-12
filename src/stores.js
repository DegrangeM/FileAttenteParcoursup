import { writable } from 'svelte/store';

export const places = writable(20);
export const position_liste_attente = writable(11);
export const candidats_liste_attente = writable(21);
export const position_liste_appel = writable(51);
export const position_liste_appel_dernier_candidat = writable(30);
export const position_liste_appel_dernier_candidat_annee_precedente = writable(15);

// 10R 5V 15J 10B1 10O1 1R 10B2 10O2

export const rougevertjaune = writable(0);
export const vertjaune = writable(0);
export const rouge = writable(0);
export const bleu = writable(0);
export const bleu1 = writable(0);
export const rose = writable(0);
export const bleu2 = writable(0);
export const orange1 = writable(0);