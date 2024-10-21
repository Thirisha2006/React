import React from 'react';
const ProductlistComponent=({productList})=>{
    return(
        <ul>
            {productList.map((product)=>(
                <li key={product.id}>
                    <div>{product.name}</div>
                    <img src={`/${product.imageUrl}`}alt={product.name}style={{width:100,height:'auto'}}></img>
                </li>
            ))}
        </ul>
    )
}
export default ProductlistComponent;