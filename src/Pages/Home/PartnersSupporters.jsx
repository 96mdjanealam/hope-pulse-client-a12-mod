import React from 'react'

const PartnersSupporters = () => {
  return (
    <div><div className="py-20 bg-red-100">
    {/* Section Title */}
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Partners & Supporters</h2>
      <p className="text-gray-600 mb-12">
        We are grateful to our partners and supporters who help us save lives every day.
      </p>

      {/* Partner Logos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {/* Partner 1 */}
        <div className="flex flex-col justify-center items-center p-4 ">
          <img
            src="https://img.icons8.com/?size=100&id=rBh1fuOC6Bjx&format=png&color=000000"
            alt="Partner 1"
            className="w-24 h-auto object-contain"
          />
          <p className='text-red-500 text-xl font-bold'>DMC Hospital</p>
        </div>

        {/* Partner 2 */}
        <div className="flex flex-col justify-center items-center p-4 ">
          <img
            src="https://img.icons8.com/?size=100&id=121193&format=png&color=000000"
            alt="Partner 2"
            className="w-24 h-auto object-contain"
          />
          <p className='text-red-500 text-xl font-bold'>Public welfare association</p>
        </div>

        {/* Partner 3 */}
        <div className="flex flex-col justify-center items-center p-4 ">
          <img
            src="https://img.icons8.com/?size=100&id=8mUEYCITnqJU&format=png&color=000000"
            alt="Partner 3"
            className="w-24 h-auto object-contain"
          />
          <p className='text-red-500 text-xl font-bold'>Red Foundation</p>
        </div>

        {/* Partner 4 */}
        <div className="flex flex-col justify-center items-center p-4">
          <img
            src="https://img.icons8.com/?size=100&id=WELFrnfAT3Y3&format=png&color=000000"
            alt="Partner 4"
            className="w-24 h-auto object-contain"
          />
          <p className='text-red-500 text-xl font-bold'>Blood Support ORG</p>
        </div>

        {/* Partner 5 */}
        <div className="flex flex-col justify-center items-center p-4">
          <img
            src="https://img.icons8.com/?size=100&id=fRmL0OK6Sr9V&format=png&color=000000"
            alt="Partner 5"
            className="w-24 h-auto object-contain"
          />
          <p className='text-red-500 text-xl font-bold'>We care Org</p>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default PartnersSupporters