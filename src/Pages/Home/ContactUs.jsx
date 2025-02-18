const ContactUs = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Send Us a Message</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="8"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your message here"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-success"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information Card */}
          <div className="flex flex-col justify-center bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h3>
            <p className="text-gray-600 mb-2">
              <strong>Phone:</strong> +880 1222 222 2222
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Email:</strong> contact@example.com
            </p>

            {/* Social Media Links */}
            

            {/* Office Address */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Office Address:</h4>
              <p className="text-gray-600">
                Uttara 1230
                <br />
                Dhaka, Bangladesh
              </p>
            </div>

            {/* Google Map Embed */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Find Us on Map:</h4>
              <div className="overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.564763018799!2d90.3652604154316!3d23.834557791497834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1d915066277%3A0xcc8bc67523a50b7!2sUttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1632927350000!5m2!1sen!2sbd"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Working Hours:</h4>
              <p className="text-gray-600">
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex space-x-4">
              <a
                href="tel:+88012222222222"
                className="btn btn-success btn-sm"
              >
                Call Now
              </a>
              <a
                href="mailto:contact@example.com"
                className="btn btn-neutral btn-sm"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;