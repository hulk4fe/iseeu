import React, { useState, useEffect } from "react"
/**
 * @module - tab component
 * @description - tab react component, 自动等宽计算, 每个tab字数不限, 溢出自动展示一个半字
 */

 export default (props) => {
  const {
    list = [], // tab数据源
    onchange, // 点击触发切换tab事件
    selectIndex = 0, // 手动更新选中tab
    memory = false, // 可开启tab位置记忆
    clickEffect = false, // 点击切换动画特效
    lineNum = 5, // 一行展示多少个，item等宽计算
    adsorbTop = false, // 超过tab自动吸顶
    onAdsorb, // 触发吸顶事件
    left = 30, // 第一个tab距离左边距离
  } = props
  
  return (
    <div>

    </div>
  )
 }