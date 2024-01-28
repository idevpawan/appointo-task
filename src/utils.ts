export const getImage = (image: string) => {
    if (!image) {
        return;
    }
    return new URL(`./assets/images/${image}`, import.meta.url).href;
}

export const formatDate = (input: string, addOneday?: boolean): string => {
    const date = new Date(input);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
  
    if (addOneday) {
      date.setDate(date.getDate() + 1);
    }
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
  