import { CarProps, FilterProps } from '@/types';

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel_type } = filters;
  
  // Construiește URL-ul cu parametrii
  const params = new URLSearchParams();
  if (manufacturer && manufacturer !== '') params.append('manufacturer', manufacturer);
  if (year && year !== 2025) params.append('year', year.toString());
  if (model && model !== '') params.append('model', model);
  if (limit && limit > 0) params.append('limit', limit.toString());
  if (fuel_type && fuel_type !== '') params.append('fuel', fuel_type);
  
  try {
    const response = await fetch(`http://localhost:3001/api/cars?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  
  searchParams.set(type, value);
  
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  
  newSearchParams.delete(type.toLowerCase());
  
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;
  
  return newPathname;
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  const { make, model, year } = car;
  
  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle || '01'}`);
  
  return `${url}`;
};