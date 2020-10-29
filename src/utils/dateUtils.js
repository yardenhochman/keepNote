

export const dateDisplay = dateObj => {
  const date = new Date(dateObj)
  return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()
}


export const sortByDate = (a, b) => new Date(a.date) - new Date(b.date);