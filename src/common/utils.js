export function debounce(func,delay){
  let timer=null
  return function(...args){
    //监听到在操作，清除Timer
    if(timer){
      timer =clearTimeout()
    }
    timer=setTimeout(() =>{
      func.apply(this,args)
    },delay)
   
  }
}