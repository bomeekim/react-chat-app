import React from 'react'
import style from '../css/Divider.module.css';

function Divider({ text }) {
  return (
    <div className={style.divider}>{text}</div>
  )
}

export default Divider
