import React from 'react';
import styles from './styles.css';

export default function Blind({ landscape, narrow }) {
  const { heading, inner, Blind, text } = styles;
  return (
    <div className={Blind}>
      <p className={heading}>{(!landscape)
	      	? `Make the browser window ${(narrow) ? 'wider' : 'taller'}, please`
	      	: `Please, rotate your device to vertical mode. ↺`
      }</p>
      {!landscape && <p className={text}>
      	The window is too {(narrow) ? 'narrow' : 'low'} for our website to function properly. Please, make it {(narrow) ? 'wider' : 'taller'}.
	    </p>}
    </div>
  );
}
//<div className={inner}>
