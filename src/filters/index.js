
function formatNumber(num){
  return num <= 9? '0'+num:num
}

const formatDate = (value, type = 'date')=>{
  if (value == '' || value == undefined){
    return ''
  }
  let date = new Date(value)
  let year = date.getFullYear() 
  let month = formatNumber(date.getMonth() + 1) 
  let day = formatNumber(date.getDate()) 
  let h = formatNumber(date.getHours()) 
  let m = formatNumber(date.getMinutes()) 
  let s = formatNumber(date.getSeconds()) 


  const dateMapping = {
    'datetime': `${year}-${month}-${day} ${h}:${m}:${s}`,
    'date': `${year}-${month}-${day}`,
    'time': ` ${h}:${m}:${s}`
  }

  return dateMapping[type]
}
export {
  formatDate,
} 
