import React from 'react';
import styles from './styles.css';

export default function Menu(props) {

  const years = props.years.map((item, idx) => 
    <p key={`menu_${item}`} className={styles.list_item}>{item}</p>
  );
  return (
    <section className={styles.Menu} style={{opacity: props.opacity, zIndex: props.zIndex}}>
      <div className={styles.list} onClick={() => alert('click')}>
        <p className={styles.list_item}>Story</p>
        {years}
      </div>
    </section>
  );
}