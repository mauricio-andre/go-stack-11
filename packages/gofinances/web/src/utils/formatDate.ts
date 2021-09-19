import { format } from 'date-fns';

const formatValue = (date: Date | string): string => {
  const objectDate = typeof date === 'string' ? new Date(date) : date;
  const stringDate = format(objectDate, 'dd/MM/yyyy');
  return stringDate;
};

export default formatValue;
