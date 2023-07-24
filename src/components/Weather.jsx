import React, { useEffect, useState } from "react";

const Weather = () => {
	const [weather, setWeather] = useState(null);
	const [forecastData, setforecast] = useState(null);
	const [searchQuery, setSearchQuery] = useState("Mumbai");

	const weatherUrl =
		"https://weatherapi-com.p.rapidapi.com/current.json?q=" + searchQuery;

	const forcasteUrl =
		"https://weatherapi-com.p.rapidapi.com/forecast.json?q=" +
		searchQuery +
		"&days=3";

	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": import.meta.env.VITE_WEATHER_API_KEY,
			"X-RapidAPI-Host": import.meta.env.VITE_WEATHER_HOST,
		},
	};

	// function for fetching weather data
	const getWeather = async () => {
		try {
			const response = await fetch(weatherUrl, options);
			const result = await response.json();
			setWeather(result);
			// console.log(result);
		} catch (error) {
			console.error(error);
		}
	};

	// function for fetching weather forcaste
	const getForcast = async () => {
		try {
			const response = await fetch(forcasteUrl, options);
			const result = await response.json();
			setforecast(result);
		} catch (error) {
			<p className='text-red-600'>Error fetching forcast data.... </p>;
		}
	};

	// Handling Search
	const handleSearch = () => {
		getWeather();
		getForcast();
		setSearchQuery("");
	};

	// useEffect hook
	useEffect(() => {
		getWeather();
		getForcast();
	}, []);

	// for DATE
	const formatDate = (datetime) => {
		const options = {
			month: "long",
			day: "numeric",
			weekday: "long",
		};
		return new Date(datetime).toLocaleString("en-US", options);
	};

	// Checking condition if weather data not fetched
	if (!weather || !forecastData) {
		return (
			<p className='text-gray-100 flex justify-center h-screen items-center'>
				Loading weather data...
			</p>
		);
	}

	return (
		<>
			<section className='text-gray-400 bg-zinc-950 body-font'>
				<div className='px-5'>
					<label className='mb-2 text-sm font-medium text-gray-900  dark:text-white'></label>
					<div className='relative'>
						<input
							type='text'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='block w-full p-4 pl-10 text-sm text-gray-100 outline-none border border-zinc-700 bg-transparent rounded-lg bg-gray-00  placeholder-gray-400 '
							placeholder='Search cities...'
							required
						/>
						<button
							type='submit'
							onClick={handleSearch}
							className='text-white absolute right-2.5 bottom-2.5 bg-red-700  focus:ring-4   font-medium rounded-lg text-sm px-4 py-2 '
						>
							Search
						</button>
					</div>
				</div>

				{/* Weather  */}
				<div className='weather px-5 py-10 mx-auto '>
					<h1 className='text-lg text-left font-medium title-font text-white mb-3'>
						Current Weather
					</h1>
					<div className='flex flex-wrap -m-4'>
						{/* Temperature Data */}
						<div className='p-4 md:w-1/2 w-full'>
							<div className='h-full bg-zinc-800 bg-opacity-40 p-8 rounded'>
								<span className='md:flex flex lg:flex-row flex-col  md:items-center '>
									<span className='flex-grow flex flex-col pl-4'>
										<h1 className='text-7xl flex font-medium text-white'>
											{weather.current?.temp_c}
											<p className='text-4xl  font-thin mx-2 '>°C</p>
											<img
												alt='weather'
												src={weather.current.condition.icon}
												className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
											/>
										</h1>
										<span className='text-gray-500 text-sm my-3'>
											{" "}
											{weather.current.condition.text}
										</span>
									</span>
									<span className='flex flex-col lg:text-sm xl:text-lg '>
										<p className='mt-5 '>
											<i className='fa-solid fa-location-dot px-2'></i>
											{weather.location.name} , {weather.location.country}
										</p>
										<p className='mt-5 '>
											<i className='fa-solid fa-calendar-days px-2'></i>
											{formatDate(weather.location.localtime)}
										</p>
									</span>
								</span>
							</div>
						</div>

						{/* Air conditions Data */}
						<div className='p-4 md:w-1/2 w-full'>
							<div className='h-full bg-zinc-800 bg-opacity-40 p-8 rounded'>
								<h1 className='leading-relaxed text-xl  font-bold mb-4 text-gray-300'>
									Air Conditions
								</h1>
								<div className=''>
									<span className='flex md:flex-row  flex-col gap-5'>
										<span className=' font-medium text-white'>
											<p className='text-gray-600'>
												Wind Speed
												<i className='fa-solid text-xl fa-wind px-2'></i>
											</p>

											<span className='text-2xl'>
												{weather.current.wind_kph} km/h
											</span>
										</span>

										<span className=' font-medium text-white'>
											<p className='text-gray-600'>
												Humidity
												<i className='fa-solid fa-droplet px-2'></i>
											</p>
											<span className='text-2xl'>
												{weather.current.humidity} %
											</span>
										</span>

										<span className=' font-medium text-white'>
											<p className='text-gray-600'>
												Real Feel
												<i className='fa-solid fa-temperature-three-quarters px-2'></i>
											</p>
											<span className='text-2xl'>
												{weather.current.feelslike_c} °C
											</span>
										</span>

										<span className=' font-medium text-white'>
											<p className='text-gray-600'>
												UV Index
												<i className='fa-solid fa-sun px-2'></i>
											</p>
											<span className='text-2xl'>{weather.current.uv}</span>
										</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 3-Day forecast */}

				<section className='text-gray-400 bg-zinc-950 body-font'>
					<div className='container px-5  mx-auto'>
						<h1 className='leading-relaxed text-xl  font-bold mb-4 text-gray-300'>
							3 -Days Weather forecast
						</h1>
						<div className='md:flex flex-wrap -m-4'>
							{/* Day 1 Forcast */}
							<div className='one p-4 md:w-1/3'>
								<div className='h-full border-2 border-zinc-800 rounded-lg overflow-hidden'>
									<div className='p-6 '>
										<h1 className='text-7xl flex font-medium text-white'>
											{forecastData.forecast.forecastday[0].day.avgtemp_c}
											<p className='text-4xl  font-thin mx-2 '>°C</p>
											<img
												alt='testimonial'
												src={
													forecastData.forecast.forecastday[0].day.condition
														.icon
												}
												className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
											/>
										</h1>
										<p className='leading-relaxed mb-3'>
											{forecastData.forecast.forecastday[0].day.condition.text}
										</p>
										<div className='flex items-center flex-wrap '>
											<a className='text-white inline-flex items-center md:mb-2 lg:mb-0'>
												{formatDate(forecastData.location.localtime)}
											</a>
										</div>
									</div>
								</div>
							</div>
							{/* Day 2 Forcast */}
							<div className='second p-4 md:w-1/3'>
								<div className='h-full border-2 border-zinc-800 rounded-lg overflow-hidden'>
									<div className='p-6 '>
										<h1 className='text-7xl flex font-medium text-white'>
											{forecastData.forecast.forecastday[1].day.avgtemp_c}
											<p className='text-4xl  font-thin mx-2 '>°C</p>
											<img
												alt='testimonial'
												src={
													forecastData.forecast.forecastday[1].day.condition
														.icon
												}
												className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
											/>
										</h1>
										<p className='leading-relaxed mb-3'>
											{forecastData.forecast.forecastday[1].day.condition.text}
										</p>
										<div className='flex items-center flex-wrap '>
											<a className='text-white inline-flex items-center md:mb-2 lg:mb-0'>
												{formatDate(forecastData.forecast.forecastday[1].date)}
											</a>
										</div>
									</div>
								</div>
							</div>
							{/* Day 3 Forcast */}
							<div className='third p-4 md:w-1/3'>
								<div className='h-full border-2 border-zinc-800 rounded-lg overflow-hidden'>
									<div className='p-6 '>
										<h1 className='text-7xl flex font-medium text-white'>
											{forecastData.forecast.forecastday[2].day.avgtemp_c}
											<p className='text-4xl  font-thin mx-2 '>°C</p>
											<img
												alt='testimonial'
												src={
													forecastData.forecast.forecastday[2].day.condition
														.icon
												}
												className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
											/>
										</h1>
										<p className='leading-relaxed mb-3'>
											{forecastData.forecast.forecastday[2].day.condition.text}
										</p>
										<div className='flex items-center flex-wrap '>
											<a className='text-white inline-flex items-center md:mb-2 lg:mb-0'>
												{formatDate(forecastData.forecast.forecastday[2].date)}
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</section>
		</>
	);
};

export default Weather;
