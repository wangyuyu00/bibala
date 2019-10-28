function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date1,flag) {
  let date = new Date(Number(date1))
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const Day = date.getDay();

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  if(flag===true){
    return `${t1} ${t2}`
  }
  if(flag===false){
    return `${t1}`
  }
  if(flag==='1'){
    return `${Day}`
  }
}

export default {
  formatNumber,
  formatTime
}
