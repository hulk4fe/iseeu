import React, { useState, useEffect } from "react"

/**
 * @module - (svg)text component
 * @description - svg text react component
 * @param - width, height, fonts:{fontSize,text,color...}, styles: {...}, y
 * @example <Text width={450} height={55} y={55} fonts={[{fontSize: 28, text: 'test', color: '#FFD292'}]}></Text>
 */

export default (props) => {
  const {
    width = 0,
    height = 0,
    fonts = [],
    styles = {},
    y = 0
  } = props
  return (
  <div className="xtext-container" style={{height, ...styles}}>
    <svg width={width} height={height}>
      <text x={0} y={y}>
        {fonts.map((el ,ind) => {
          const {fontSize = 0, lineThrough = false, fontWeight = false, text = '', color = '', style = {}} = el
          return (
          <tspan
            key={`xtext-tspan_${ind}`}
            fontSize={fontSize}
            fill={color}
            style={{
              verticalAlign: "middle",
              textDecoration: lineThrough ? "line-through" : "inherit",
              fontWeight: fontWeight ? "bolder" : "inherit",
              ...style
            }}
          >
            {text}
          </tspan>
          )
        })}
      </text>
    </svg>
  </div>
  )
}