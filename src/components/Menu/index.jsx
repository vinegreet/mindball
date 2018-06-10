import React from 'react';
import styles from './styles.css';

export default function Menu(props) {

  const yearsElems = props.uniqYears.map((item, idx) => 
    <p key={`menu_${item}`} className={styles.listItem} onClick={() => props.onMenuClick(idx)} >{item}</p>
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