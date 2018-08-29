import React from 'react';
import styles from './styles.css';
import fbLogo from 'img/fb.svg';
import ytLogo from 'img/yt.png';

export default function Menu({ hasContentFetched, onMenuClick, opacity, uniqYears, zIndex }) {

  const { followUs, followUsWrapper, line, list, listItem, Menu, sn, yt } = styles;

  const yearsElems = (!hasContentFetched) ? null : uniqYears.map((item, idx) =>
    <p key={`menu_${item}`} className={listItem} onClick={() => onMenuClick(idx)} >{item}</p>
  );
  
  return (
    <section className={Menu} style={{ opacity: opacity, zIndex: zIndex }}>
      <div className={list}>
        <p className={listItem} onClick={() => onMenuClick(-1, true)}>Story</p>
        {yearsElems}
      </div>
      <div className={followUsWrapper}>
        <p className={followUs}>Follow us</p>
        <div className={line}></div>
        <div className={sn}>
          <a href="https://www.facebook.com/Mindball.Ukraine" title="Our Facebook Page" target="_blank">
            <img src={fbLogo} alt="Our Facebook Page" />
          </a>
          <a className={yt} href="https://www.youtube.com/user/mindballukraine" title="Our YouTube Page" target="_blank">
            <img src={ytLogo} alt="Our YouTube Page" />
          </a>
        </div>
      </div>
    </section>
  );
}