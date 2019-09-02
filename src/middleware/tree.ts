import { firestore } from "./firebase";
import {Subject } from 'rxjs';

import {newRestaurant} from './base_queries/create';
import {Categorie, Item, Type, Order} from './typesdb/types';

import * as Consults from './base_queries/consult';
import * as Insert from './base_queries/create';
import * as Edit from './base_queries/update';

let branchReference:any = null;
let branchReferenceWaiter:any = null;

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

export const addOrder=(order:Order)=>{
    Insert.newOrder(branchReference,order);
}

export const addItemInOrder=(item:Item,idOrder:string)=>{
    var ref=Consults.getCollection(branchReference,"orders");
    Insert.newItem(Consults.getDocInCollection(ref,idOrder),item);
}

export const addTypeItemInOrder=(type:Type,idOrd:string,idItem:string)=>{
    var ref=Consults.getCollection(branchReference,"orders");
    ref = Consults.getDocInCollection(ref,idOrd);
    ref = Consults.getCollection(ref,"items");
    ref = Consults.getDocInCollection(ref,idItem);
    Insert.newType(ref,type);
}

//Update
export const updateStatusOrder=(idOrder:string,payload:number)=>{
    var ref=Consults.getCollection(branchReference,"orders");
    Edit.updatePropertyInDocument(ref,idOrder,{status:payload});
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

export const getAllOrders=()=>{
    var orders$ = new Subject<Order[]>();
    const querieOrders= Consults.getCollection(branchReference,"orders");
    querieOrders.onSnapshot((querySnapshot:any) => {
        var data = querySnapshot.docs.map( (d:any) => {
            return {...d.data(),id:d.id};
        });
        orders$.next(data);
    });
    return orders$;
}

export const getItemsInOrder=(idOrder:string)=>{
    var items$ = new Subject<Item[]>();
    var ref=Consults.getCollection(branchReference,"orders");

    const querieItems= Consults.getCollection(Consults.getDocInCollection(ref,idOrder),"items");
    querieItems.onSnapshot((querySnapshot:any) => {
        var data = querySnapshot.docs.map( (d:any) => {
            return {...d.data(),id:d.id};
        });
        items$.next(data);
    });
    return items$;
}

export const getTypesInItemsOrder=(idOrder:string,idItem:string)=>{
    var items$ = new Subject<Type[]>();
    var ref=Consults.getCollection(branchReference,"orders");
    ref = Consults.getDocInCollection(ref,idOrder);
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

//Usar una funcion branch, 
//ya sea para unirse 
//a la referencia de un waiter o de todo el restaurante [branchReference]