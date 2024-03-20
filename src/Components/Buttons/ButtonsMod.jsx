import React from 'react'
import buttonStyle from './ButtonsMod.module.css'

export default function ButtonsMod(props) {
    return (
        <button type='submit' className={buttonStyle.buttonMod}>{props.htmlContent}</button>
    )
}
