import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel_type } = filters;

  const response = await fetch(
    "https://68ba11ff6aaf059a5b596501.mockapi.io/api/v1/cars/cars"
  );

  let result: CarProps[] = await response.json();
  console.log(result);
  console.log(filters);

  // aplicăm filtrările manual
  if (manufacturer) {
    result = result.filter((car) =>
      car.make.toLowerCase() === manufacturer.toLowerCase()
    );
  }
  if (model) {
    result = result.filter((car) =>
      car.model.toLowerCase() === model.toLowerCase()
    );
  }

  if (year && year !== 0) {
    result = result.filter((car) => car.year === Number(year));
  }

  if (fuel_type && fuel_type !== '') {
    result = result.filter((car) =>
      car.fuel_type.toLowerCase() === fuel_type.toLowerCase()
    );
  }

  if (limit) {
    result = result.slice(0, Number(limit));
  }

  return result;
}


export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

export const generateCarImageUrl = (car: CarProps, angle? : string) => {
    //key...
    const url = new URL("https://cdn.imagin.studio/getimage");
    const {make, year, model} = car;
    url.searchParams.append('customer', 'hrjavascript-mastery');

    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;

}

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
  
    searchParams.set(type, value);
    
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    return newPathname;
    
}