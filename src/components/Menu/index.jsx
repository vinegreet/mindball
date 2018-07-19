import React from 'react';
import styles from './styles.css';
import fb from 'img/fb.svg';
import yt from 'img/yt.png';

export default function Menu({ uniqYears, onMenuClick, opacity, zIndex }) {

  const yearsElems = uniqYears.map((item, idx) => 
    <p key={`menu_${item}`} className={styles.listItem} onClick={() => onMenuClick(idx)} >{item}</p>
  );
  return (
    <section className={styles.Menu} style={{ opacity: opacity, zIndex: zIndex }}>
      <div className={styles.list}>
        <p className={styles.listItem} onClick={() => onMenuClick(-1, true)}>Story</p>
        {yearsElems}
      </div>
      <div className={styles.followUsWrapper}>
        <p className={styles.followUs}>Follow us</p>
        <div className={styles.line}></div>
        <div className={styles.sn}>
          <a href="https://www.facebook.com/Mindball.Ukraine" title="Our Facebook Page" target="_blank">
            <img src={fb} alt="Our Facebook Page" />
          </a>
          <a className={styles.yt} href="https://www.youtube.com/user/mindballukraine" title="Our YouTube Page" target="_blank">
            <img src={yt} alt="Our YouTube Page" />
          </a>
        </div>
      </div>
    </section>
  );
}