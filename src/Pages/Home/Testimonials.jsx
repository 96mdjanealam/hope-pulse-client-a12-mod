

const Testimonials = () => {
  return (
    <div className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          What People Are Saying
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial Card 1 */}
          <div className="card bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
            <p className="text-gray-700 leading-relaxed">
              "Donating blood was such a rewarding experience. Knowing I helped save lives is priceless."
            </p>
            <div className="flex items-center mt-6">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://img.freepik.com/premium-photo/excited-man-pointing-chest_251859-1951.jpg"
                    alt="User"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-500">Regular Donor</p>
              </div>
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="card bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
            <p className="text-gray-700 leading-relaxed">
              "I received blood during surgery, and I'm forever grateful to the donors who saved my life."
            </p>
            <div className="flex items-center mt-6">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSucZOUE43Dq9zm9MJqxub3XQy_Ukq2wl2nnA&s"
                    alt="User"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900">Jane Smith</h3>
                <p className="text-sm text-gray-500">Blood Recipient</p>
              </div>
            </div>
          </div>

          {/* Testimonial Card 3 */}
          <div className="card bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
            <p className="text-gray-700 leading-relaxed">
              "The process was quick and easy. The staff made me feel comfortable throughout."
            </p>
            <div className="flex items-center mt-6">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://as1.ftcdn.net/jpg/03/21/51/22/220_F_321512215_iLQIdpoXLd9gVYCtX4EZ9dyhJNz3BbTk.jpg"
                    alt="User"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900">Alex Brown</h3>
                <p className="text-sm text-gray-500">First-Time Donor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;