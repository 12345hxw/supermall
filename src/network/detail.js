import {request2} from './request'
export function getDetail(iid){
  return request2({
    url:'/detail',
    params:{
      iid
    }
  })
}

export class Goods {
  //构造函数
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// class Person{
//   constructor(name,age){
//     this.name=name;
//     this.age=age
//   }
// }

// const p=new Person('why',19)