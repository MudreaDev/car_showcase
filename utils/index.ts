import { mockCars } from '@/cars';
import { CarProps, FilterProps } from '@/types';

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredCars = mockCars.filter(car => {
    if (manufacturer && manufacturer !== '') {
      if (!car.make.toLowerCase().includes(manufacturer.toLowerCase())) {
        return false;
      }
    }
    
    if (model && model !== '') {
      if (!car.model.toLowerCase().includes(model.toLowerCase())) {
        return false;
      }
    }
    
    if (year && year !== 2025) { // 2025 este valoarea default
      if (car.year !== year) {
        return false;
      }
    }
    
    if (fuel && fuel !== '') {
      if (fuel.toLowerCase() === 'gas' && car.fuel_type !== 'gas') {
        return false;
      }
      if (fuel.toLowerCase() === 'electricity' && car.fuel_type !== 'electricity') {
        return false;
      }
    }
    
    return true;
  });
  
  if (limit && limit > 0) {
    filteredCars = filteredCars.slice(0, limit);
  }
  
  return filteredCars;
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