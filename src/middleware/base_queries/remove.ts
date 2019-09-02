export const deleteDocById=(dbRef:any,nameColl:string,idDoc:string)=>{
    var ref=dbRef.collection(nameColl).doc(idDoc);
    var batch = dbRef.batch();
    batch.delete(ref);
    batch.commit().then(function () {
        console.log("deleted commited");
    });
}