import React from 'react'
import style from './Divider.module.css';

function Divider({ text }) {
  return (
    <div className={style.divider}>{text}</div>
  )
}

export default Divider
