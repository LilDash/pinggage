const formatTimestampToDate = timestamp => {
  return formatTimeToDate(new Date(timestamp));
}
const formatTimeToDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  //return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('-');
}

const dateStringToTimestamp = str => {
  return new Date(str+ " 0:0:0").getTime(); // in milliseconds
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTimestampToDate: formatTimestampToDate,
  formatTimeToDate: formatTimeToDate,
  dateStringToTimestamp: dateStringToTimestamp
}
