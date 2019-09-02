export const updatePropertyInDocument=(ref:any,idDoc:string,payload:any)=>{
    ref.doc(idDoc).get().then(function(doc:any) {
        if (doc.exists) {
            ref.doc(idDoc).update(payload);
        } else {
            console.log("Update Error:No such document!");
        }
    }).catch(function(error:any) {
        console.log("Error updating document:", error);
    });
}