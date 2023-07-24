import React from "react";

const Footer = () => {
	return (
		<footer className=' rounded-lg shadow m-4 bg-zinc-950 mt-20'>
			<hr className='opacity-20' />
			<div className='w-full mx-auto max-w-screen-xl  justify-center p-4 md:flex items-center '>
				<ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0'>
					<li>
						<span className='mr-4  md:mr-6 '>
							Developed and Designed by{" "}
							<a
								className='text-orange-600 underline'
								target='_blank'
								href='https://ayushkhatri.netlify.app'
							>
								Ayush Khatri
							</a>{" "}
							&#10084;&#65039;
						</span>
					</li>
				</ul>
							<a href="https://www.flaticon.com/free-icons/app" className="text-gray-100 text-sm md:text-base  " title="app icons">App icons created by Freepik - Flaticon</a>
			</div>
		</footer>
	);
};

export default Footer;
