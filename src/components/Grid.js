// stateful component
import React from 'react';
import Photo from './Photo';



const Grid = (props) => {
    const results = props.images;
    console.log(results);
    let img;
    if (results.length > 0) {
        img = results.map(img => <Photo key={img.id} id={img.id} server={img.server} secret={img.secret} alt={img.title} /> );
    }

    return(
    <div className="photo-container">
        <ul> 
            {img}
        </ul>
    </div>
    )
}   

export default Grid;