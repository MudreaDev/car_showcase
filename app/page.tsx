"use client"
import Image from 'next/image';
import { Hero, SearchBar, CustomFilter, CarCard } from '@/components';
import { fetchCars } from '@/utils';
import cars from "@/utils/cars.json";
import { manufacturers, fuels, yearsOfProduction } from '@/constants';
import ShowMore from '@/components/ShowMore';
import { useEffect, useState } from 'react';
import { CarProps } from '@/types';

export default function Home() {
  // am importat tipul explicit pentru a sc[pa de eroare cu result]
  const [allCars, setAllCars] = useState<CarProps[]>([]); 
  const [loading, setLoading] = useState(false);
  // Search states
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  // Filter states
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(0);
  // Pagination state
  const [limit, setLimit] = useState(10);

  const getCars = async () => {

    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 0,
        fuel_type: fuel || '',
        limit: limit,
        model: model || '',
      });
      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(fuel, year, limit, manufacturer, model);
    getCars();
  }, [manufacturer, model, fuel, year, limit]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero/>
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar
            setManufacturer={setManufacturer}
            setModel={setModel}
          />
          <div className='home__filter-container'>
            <CustomFilter 
              title="fuel" 
              options={fuels}
              setFilter={setFuel}
            />
            <CustomFilter 
              title="year" 
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {/* ✅ CORECTAT: Structură logică simplă și clară */}
        {loading ? (
          <div className='mt-16 w-full flex-center'>
            <Image
              src="/loader.svg"
              alt='loader'
              width={50}
              height={50}
              className='object-contain'
            />
          </div>
        ) : !isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car, index) => (
                <CarCard key={index} car={car}/>
              ))}
            </div>
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>Nu s-au găsit rezultate pentru filtrele selectate</p>
          </div>
        )}
      </div>
    </main>
  )
}