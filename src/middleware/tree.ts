import { firestore } from "./firebase";
import {Subject } from 'rxjs';

import {newRestaurant} from './create';
import {Categorie, Item, Type} from './types';

import * as Consults from './consult';
import * as Insert from './create';

let branchReference:any = null;


//Insert
export const addRestaurant=()=>{
    Insert.newRestaurant();
}

export const addCategorie=(categorie:Categorie)=>{
    Insert.newCategorie(branchReference,categorie);
}

export const addItem=(item:Item,idCat:string)=>{
    var ref=Consults.getCollection(branchReference,"categories");
    Insert.newItem(Consults.getDocInCollection(ref,idCat),item);
}

export const addType=(type:Type,idCat:string,idItem:string)=>{
    var ref=Consults.getCollection(branchReference,"categories");
    ref = Consults.getDocInCollection(ref,idCat);
    ref = Consults.getCollection(ref,"items");
    ref = Consults.getDocInCollection(ref,idItem);
    Insert.newType(ref,type);
}


//Consult
export const switchToBranch=()=>{
   branchReference= firestore.collection("restaurants").doc("gZg5c8ykpUHnfAypj7JR").collection("branches").doc("xvJCkRhuNtSp4FzO01Td");
}

// Create Observable.
export const getAllCategories=()=>{
    var categories$ = new Subject<Categorie[]>();
    const querieCategories= Consults.getCollection(branchReference,"categories");
    querieCategories.onSnapshot((querySnapshot:any) => {
        var data = querySnapshot.docs.map( (d:any) => {
            return {...d.data(),id:d.id};
        });
        categories$.next(data);
    });
    return categories$;
}

export const getItemsCategories=(idCat:string)=>{
    var items$ = new Subject<Item[]>();
    var ref=Consults.getCollection(branchReference,"categories");

    const querieItems= Consults.getCollection(Consults.getDocInCollection(ref,idCat),"items");
    querieItems.onSnapshot((querySnapshot:any) => {
        var data = querySnapshot.docs.map( (d:any) => {
            return {...d.data(),id:d.id};
        });
        items$.next(data);
    });
    return items$;
}

export const getTypesInItems=(idCat:string,idItem:string)=>{
    var items$ = new Subject<Type[]>();
    var ref=Consults.getCollection(branchReference,"categories");
    ref = Consults.getDocInCollection(ref,idCat);
    ref = Consults.getCollection(ref,"items");
    const querieItems= Consults.getCollection(Consults.getDocInCollection(ref,idItem),"types");
    querieItems.onSnapshot((querySnapshot:any) => {
        var data = querySnapshot.docs.map( (d:any) => {
            return {...d.data(),id:d.id};
        });
        items$.next(data);
    });
    return items$;
}

