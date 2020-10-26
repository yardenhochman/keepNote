
export const dateDisplay = dateObj => {
  if (typeof dateObj === 'string') {
    const date = new Date(dateObj)
    return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()
  }
  return dateObj.getDate()+'/'+(dateObj.getMonth()+1)+'/'+dateObj.getFullYear()
}