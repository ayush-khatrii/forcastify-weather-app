import React from "react";

const Header = () => {
	return (
		<header className='text-gray-400 bg-zinc-950 body-font my-5'>
			<div className='container mx-auto flex justify-center flex-wrap p-5 flex-col md:flex-row items-center'>
				<a className='flex title-font font-medium items-center text-white mb-4 md:mb-0'>
						<img src="/weather.png" width={40} alt="" />
					<span className='ml-3 text-2xl md:text-5xl font-semibold'>
						Forecastify
					</span>
				</a>
			</div>
		</header>
	);
};

export default Header;
