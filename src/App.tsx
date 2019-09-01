import React from 'react';
import logo from './logo.svg';
import './App.css';

import { switchToBranch, getAllCategories, addItem,getItemsCategories, getTypesInItems, addType, getAllOrders, addOrder, getItemsInOrder, addItemInOrder } from "./middleware/tree";
import { Categorie, Item, Type, Order, Table } from './middleware/types';


const App: React.FC = () => {
  //1
  switchToBranch();
  getAllCategories().subscribe(
    categories=>{
      categories.map(cat=>{
        getItemsCategories(cat.id).subscribe(
          items=>{
            items.map(item=>{
              getTypesInItems(cat.id,item.id).subscribe(
                types=>{
                  console.log(types);
                }
              )
            })
          }
        );
      });
    }
  );

  getAllOrders().subscribe(orders=>{
    orders.map(
      order=>{
        getItemsInOrder(order.id).subscribe(items=>{
          console.log('items in order-----');
          console.log(items);
          console.log('items in order-----');

        });
      })
  });

  
  //--Add Order
  /*
  let table:Table = {name:"MesaX1",description:"cerca de la entrada",picture:"https://"};
  let ord:Order = {id:'',date:"",status:1,table:table};
  addOrder(ord);
  */

  //--Add Item in Order
  /*  
  let item:Item = {id:"",name:"Alitas",picture:"https://"};
  addItemInOrder(item,"HPw0rUHemCAAgT6DWZRO");
  */



  //--Add Categorie
  /*
  let cat:Categorie = {id:"",name:"Bebidas",description:"son refrescantes"};
  addCategorie(cat);
  */

  //--Add Item in Categorie
  /*
  let item:Item = {id:"",name:"Alitas",picture:"https://"};
  addItem(item,"MmTy92b7AboTN0jXFcd4");
  */

  //--Add Type in Item from Categorie
  /*
      let type:Type = {id:"",name:"grande",price:34};
      addType(type,"MmTy92b7AboTN0jXFcd4","WNJ33sZD6qleaGb83J7b");

  */
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
