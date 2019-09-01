import {firestore as db} from './firebase';
import { dataRestaurant,Categorie,Item, Type } from "./types";
export const newRestaurant=async ()=>{
    var newRef=db.collection('restaurants').doc();
    var snapShot= await newRef.get();
    if(!snapShot.exists){
        try {
           await newRef.set({});
        } catch (error) {
            console.log(error);
        }
    }

    var refBranch=await newBranch(newRef);
    let info:dataRestaurant = {address:'30 calle',description:'comida china',name:'FriPollo'};
    await newDataBranch(refBranch,info);
    alert('added');
}
export const newBranch=async (dbRef:any)=>{
    var newRef = dbRef.collection('branches').doc(); 
    var snapShot= await newRef.get();
    if(!snapShot.exists){
        try {
           await newRef.set({});
        } catch (error) {
            console.log(error);
        }
    }
    return newRef;
}

export const newDataBranch = async (dbRef:any,dataRest:dataRestaurant)=>{
    var newRef = dbRef.collection('data').doc(); 
    var snapShot= await newRef.get();
    if(!snapShot.exists){
        try {
           await newRef.set({...dataRest});
        } catch (error) {
            console.log(error);
        }
    }
}

export const newCategorie = async (dbRef:any,dataCategorie:Categorie)=>{
    var newRef = dbRef.collection('categories').doc(); 
    var snapShot= await newRef.get();
    if(!snapShot.exists){
        try {
            const {id,...other}=dataCategorie;
           await newRef.set({...other});
        } catch (error) {
            console.log(error);
        }
    }
}

export const newItem = async (dbRef:any,item:Item)=>{
    var newRef = dbRef.collection('items').doc(); 
    var snapShot= await newRef.get();
    if(!snapShot.exists){
        try {
           const {id,...other} = item;
           await newRef.set({...other});
        } catch (error) {
            console.log(error);
        }
    }
}

export const newType = async (dbRef:any,type:Type)=>{
    var newRef = dbRef.collection('types').doc(); 
    var snapShot= await newRef.get();
    if(!snapShot.exists){
        try {
           const {id,...other} = type; 
           await newRef.set({...other});
        } catch (error) {
            console.log(error);
        }
    }
}