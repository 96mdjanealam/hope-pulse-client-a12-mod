import React from "react";

const Volunteer = () => {
  const volunteerRoles = [
    {
      title: "Event Organizer",
      description:
        "Help plan and manage blood donation events in your community.",
      icon: "📅",
    },
    {
      title: "Outreach Coordinator",
      description:
        "Spread awareness about blood donation campaigns and recruit donors.",
      icon: "📢",
    },
    {
      title: "Social Media Manager",
      description:
        "Create engaging content to promote blood donation on social platforms.",
      icon: "📱",
    },
    {
      title: "Donation Center Assistant",
      description:
        "Support donors at blood donation centers by guiding and assisting them.",
      icon: "🏥",
    },
    {
      title: "Transport Volunteer",
      description:
        "Help transport blood units to hospitals and medical facilities.",
      icon: "🚗",
    },
  ];

  return (
    <div className="py-20 bg-red-100">
      {/* Section Title */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Volunteer Opportunities
        </h2>
        <p className="text-gray-600 mb-12">
          Join us in saving lives! Explore the various ways you can contribute
          to our cause.
        </p>

        {/* Timeline Layout */}
        <div className="relative max-w-3xl mx-auto px-2 md:px-0">
          {/* Vertical Line */}
          <div className="absolute left-1/2 w-px h-full bg-gray-300 transform -translate-x-1/2"></div>

          {volunteerRoles.map((role, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } mb-12`}
            >
              {/* Content Container */}
              <div
                className={`relative max-w-md p-6 bg-white rounded-lg shadow-md ${
                  index % 2 === 0 ? "mr-auto" : "ml-auto"
                }`}
              >
                {/* Icon */}
                <div
                  className={`absolute -top-5 ${
                    index % 2 === 0 ? "right-5" : "left-5"
                  } bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center`}
                >
                  {role.icon}
                </div>
                {/* Title */}
                <h3 className="text-xl font-bold text-red-500 mb-2">
                  {role.title}
                </h3>
                {/* Description */}
                <p className="text-gray-600">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Volunteer;