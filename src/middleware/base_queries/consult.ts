
export const getTypesInItemFromOrder=(ref:any,idDoc:any)=>{
    return ref.doc(idDoc).collection('types');
}

export const getAllCategories = (db:any)=>{
    return db.collection('restaurants')
    .doc('opimWyCY5tNKY7ZdQqsN')
    .collection('categories');
}

export const getCollection = (dbRef:any,name:string)=>{
    return dbRef.collection(name);
}
export const getDocInCollection=(dbRef:any,idDoc:string)=>{
    return dbRef.doc(idDoc);
}