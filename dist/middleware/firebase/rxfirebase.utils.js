import {Rx} from 'rxjs';

import * as Consults from './consult'

const config={
    apiKey: "AIzaSyDE-VRTWO7_tqDpsrfgpbNouBR_cDNStNA",
    authDomain: "restfree-fb70d.firebaseapp.com",
    databaseURL: "https://restfree-fb70d.firebaseio.com",
    projectId: "restfree-fb70d",
    storageBucket: "restfree-fb70d.appspot.com",
    messagingSenderId: "474057732963",
    appId: "1:474057732963:web:fe2ca3211749107f"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export const observable = Rx.Observable.create(query.onSnapshot.bind(Consults.getAllCategories(firestore)));






