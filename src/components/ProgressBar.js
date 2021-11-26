import React from 'react'
import style from '../css/ProgressBar.module.css';

function ProgressBar() {
  return (
    <div className={style['progress-bar']}>
      <div className={style['progress-bar__value']}>
      </div>
    </div>
  )
}

export default ProgressBar
