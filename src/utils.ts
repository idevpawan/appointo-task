export const getImage = (image: string) => {
    if (!image) {
        return;
    }
    return new URL(`./assets/images/${image}`, import.meta.url).href;
}

export const formatDate = (input: string, addWholeMonth?: boolean): string => {
    const date = new Date(input);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = "01";

    if (addWholeMonth) {
      // date.setMonth(date.getMonth() + 1);
      let lastDay = new Date(year, Number(month), 0)
      day = lastDay.getDate().toString().padStart(2, '0')
    }
  
    return `${year}-${month}-${day}`;
  }

export const selectedFormatDate = (input: string): string => {
    const date = new Date(input);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
