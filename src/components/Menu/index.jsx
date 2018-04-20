import React from 'react';
import styles from './styles.css';
import { years } from 'components/items.js';

export default function Menu(props) {

  const yearsElems = years.map((item, idx) => 
    <p key={`menu_${item}`} className={styles.list_item}>{item}</p>
  );
  return (
    <section className={styles.Menu} style={{opacity: props.opacity, zIndex: props.zIndex}}>
      <div className={styles.list} onClick={() => alert('click')}>
        <p className={styles.list_item}>Story</p>
        {yearsElems}
      </div>
    </section>
  );
}