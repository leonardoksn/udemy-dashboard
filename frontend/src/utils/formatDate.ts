const formatDate = (date: string): string => {
  const dateFormatted = new Date(date);

  const day = dateFormatted.getDate() + 1;
  const mounth = dateFormatted.getMonth() + 1;
  const year = dateFormatted.getFullYear();
  
  return (mounth >= 10) ?`${day}/${mounth}/${year}` : `${day}/0${mounth}/${year}`;

};

export default formatDate;
