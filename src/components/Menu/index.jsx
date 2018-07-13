import React from 'react';
import styles from './styles.css';

export default function Menu({ uniqYears, onMenuClick, opacity, zIndex }) {

  const yearsElems = uniqYears.map((item, idx) => 
    <p key={`menu_${item}`} className={styles.listItem} onClick={() => onMenuClick(idx)} >{item}</p>
  );
  return (
    <section className={styles.Menu} style={{opacity: opacity, zIndex: zIndex}}>
      <div className={styles.list}>
        <p className={styles.listItem} onClick={() => onMenuClick(-1, true)}>Story</p>
        {yearsElems}
      </div>
    </section>
  );
}