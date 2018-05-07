import React from 'react';
import styles from './styles.css';
import { uniqYears } from 'components/items.js';

export default function Menu(props) {

  const yearsElems = uniqYears.map((item, idx) => 
    <p key={`menu_${item}`} className={styles.listItem} onClick={() => props.onMenuClick(idx, true)} >{item}</p>
  );
  return (
    <section className={styles.Menu} style={{opacity: props.opacity, zIndex: props.zIndex}}>
      <div className={styles.list}>
        <p className={styles.listItem} onClick={() => props.onMenuClick(-1, true)}>Story</p>
        {yearsElems}
      </div>
    </section>
  );
}