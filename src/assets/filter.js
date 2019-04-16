// 补充订单状态
function ReplenishOrderStatus (value) {
  let status = ''
  switch (Number(value)) {
    case 1: status = '未完成'; break;
    case 2: status = '已完成'; break;
    case 3: status = '已取消'; break;
    case 4: status = '所有订单'; break;
    default: status = '其他';
  }
  return status
}


let transform = {
  ReplenishOrderStatus: ReplenishOrderStatus
}
export default transform
