import React, {useState, useEffect} from 'react'
import { get } from 'lodash-es'
import "./index.scss";

const realPx = (px) => {
  return (px * document.body.clientWidth) / 750;
}
/**
 * <SFont width={10} fontSize={49} transformLeft={0.5} transformMid={1} transformRight={1} price={"8888.88"} ></SFont>
 * <SFont fontSize={49} transformLeft={0.5} transformMid={1} transformRight={0.5} price={"8888.88"} ></SFont>
 * <SFont fontSize={49} transformLeft={1} transformMid={1} transformRight={1} price={"8888.88"} ></SFont>
 * <SFont fontSize={49} transformLeft={0.5} transformMid={0.5} transformRight={1} price={"8888.88"} ></SFont>
 * <SFont width={100} fontSize={49} transformLeft={0.5} transformMid={0.5} transformRight={1} price={"8"} prefix={false} trail={"折"}></SFont>
 * 1. 不支持absolute 2. 字体颜色继承 3. 字体不会抖动
 */

export default (props) => {
  const {
    fontSize = 12, // 字体大小，不需要转换750下标准大小
    transformLeft = 1, // 价格符号缩放
    transformMid = 1, // 价格整数位缩放, 价格整体缩放
    transformRight = 1, // 价格小数位缩放
    price = '', // 价格，只包含价格
    prefix = true, // 是否需要价格符号
    trail = '', // 价格尾部的文案
    transformTrail = '0.8', // 价格尾部文案缩放，默认0.8
    width = '', // 容齐的指定宽度，默认auto
    line = false, // 是否需要中划线
    style = {} // 容器额外的样式
  } = props
  const [sprice, setSprice] = useState({})
  const [ready, setReady] = useState(false)
  useEffect(()=>{
    const _price = String(price).split('.'), _cst = get(_price, [0], ''),
          _db = get(_price, [1], '')
    let obj = {}
    setReady(true)
    if(_db){
      // 价格有小数点
      if(_db == '0'){
        // 小数点等于0
        _cst.length && (obj = {
          left: '¥',
          mid: _cst,
          right: ''
        })
      }else{
        // 小数点正常
        _cst.length && (
          obj = {
            left: '¥',
            mid: _cst,
            right: _db ? `.${_db}` : _db
          }
        )
      }
    }else{
      // 价格没有小数点
      _cst.length && (
        obj = {
          left: '¥',
          mid: _cst,
          right: ''
        }
      )
    }
    setSprice(obj)
  }, [props])
  const percent = (price, percent) => {
    return Number(price) >= 1 ? `0%` : `${Math.floor( (1 - Number(price))  * 100 / percent)}%`
  }
  return ready ? (
    <div 
    style={{
      transform: `scale(${transformMid})`,
      WebkitTransform: `scale(${transformMid})`,
      fontSize: realPx(fontSize),
      width: `${width ? `${realPx(width)}px` : 'auto'}`,
      ...style
    }}
    className="subsidy-font_container">
      { prefix ? <div 
      style={{
        transform: `scale(${transformLeft}) translate(${percent(transformLeft, 2)}, ${percent(transformLeft, 2)})`,
        WebkitTransform: `scale(${transformLeft}) translate(${percent(transformLeft, 2)}, ${percent(transformLeft, 2)})`
      }}
      className="subsidy-font_left font_common">
        { line ? <s>{get(sprice, 'left', '')}</s> : <span>{get(sprice, 'left', '')}</span>}
      </div> : null}
      <div 
      className="subsidy-font_mid font_common">
        { line ? <s>{get(sprice, 'mid', '')}</s> : <span>{get(sprice, 'mid', '')}</span>}
      </div>
      <div 
      style={{
        transform: `scale(${transformRight}) translate(-${percent(transformRight, 1)}, ${percent(transformRight, 2)})`,
        WebkitTransform: `scale(${transformRight}) translate(-${percent(transformRight, 1)}, ${percent(transformRight, 2)})`
      }}
      className="subsidy-font_right font_common">
        { line ? <s>{get(sprice, 'right', '')}</s> : <span>{get(sprice, 'right', '')}</span>}
      </div>
      <div className="font_common"
        style={{
          transform: `scale(${transformTrail})`,
          WebkitTransform: `scale(${transformTrail})`
        }}
      >
      <span
        >{trail}</span>
      </div>
    </div>
  ) : null
}