// stateless component
import React from 'react';

const Photo = (props) => (
    <li>
        <img src={`https://live.staticflickr.com/${props.server}/${props.id}_${props.secret}_z.jpg`} alt={props.alt}></img>
    </li>
)

export default Photo;