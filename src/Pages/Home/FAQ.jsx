import React from "react";
import FAQLottie from "../../assets/faqLottie.json";
import Lottie from "lottie-react";

const FAQ = () => {


    
  return (
    <div className="relative overflow-hidden">
       <svg className="absolute" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="1440" height="560" preserveAspectRatio="none" viewBox="0 0 1440 560">
    <g mask="url(&quot;#SvgjsMask1006&quot;)" fill="none">
        <path d="M -704.647085971805,93 C -608.65,174.6 -416.65,474.6 -224.64708597180504,501 C -32.65,527.4 63.35,227.8 255.35291402819496,225 C 447.35,222.2 543.35,507 735.352914028195,487 C 927.35,467 1074.42,139.6 1215.3529140281948,125 C 1356.28,110.4 1395.07,356.2 1440,414" stroke="rgba(255, 0, 0, 0.13)" stroke-width="2"></path>
        <path d="M -503.47157455544317,191 C -407.47,235.6 -215.47,399.6 -23.471574555443162,414 C 168.53,428.4 264.53,245.6 456.52842544455683,263 C 648.53,280.4 744.53,501.4 936.5284254445569,501 C 1128.53,500.6 1315.83,272.6 1416.528425444557,261 C 1517.22,249.4 1435.31,406.6 1440,443" stroke="rgba(255, 0, 0, 0.13)" stroke-width="2"></path>
        <path d="M -110.07449420689062,82 C -14.07,141.2 177.93,371.2 369.9255057931094,378 C 561.93,384.8 657.93,115.8 849.9255057931093,116 C 1041.93,116.2 1137.93,372 1329.9255057931093,379 C 1521.93,386 1787.91,134.4 1809.9255057931093,151 C 1831.94,167.6 1513.99,399.8 1440,462" stroke="rgba(255, 0, 0, 0.13)" stroke-width="2"></path>
        <path d="M -786.2726313228513,245 C -690.27,254 -498.27,301.8 -306.27263132285134,290 C -114.27,278.2 -18.27,161 173.72736867714866,186 C 365.73,211 461.73,397.6 653.7273686771487,415 C 845.73,432.4 976.47,268.4 1133.7273686771487,273 C 1290.98,277.6 1378.75,405 1440,438" stroke="rgba(255, 0, 0, 0.13)" stroke-width="2"></path>
    </g>
    <defs>
        <mask id="SvgjsMask1006">
            <rect width="1440" height="560" fill="#ffffff"></rect>
        </mask>
    </defs>
</svg>
         <div className="w-11/12 mx-auto my-16 z-10">
        
        <h2 className="text-center text-3xl font-bold mb-10">
          Frequently Asked Questions
        </h2>
  
        <div className="flex flex-col md:flex-row md:justify-center md:items-start">
          <Lottie
            animationData={FAQLottie}
            loop={true}
            autoplay={true}
            className="w-1/2 -mt-10 md:-mt-20 md:-mb-10"
          />
  
          <div className="join join-vertical w-full backdrop-blur-sm z-10">
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                Who can donate blood?
              </div>
              <div className="collapse-content">
                <p>
                  To donate blood, you must meet the following criteria:
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      Be at least 18 years old (or 17 with parental consent in
                      some regions).
                    </li>
                    <li>Weigh at least 50 kg (110 lbs).</li>
                    <li>
                      Be in good health and free of any infections or chronic
                      illnesses.
                    </li>
                    <li>
                      Not have donated blood in the last 56 days (for whole blood)
                      or 28 days (for platelets).
                    </li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Is it safe to donate blood?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, donating blood is completely safe. The equipment used is
                  sterile and disposable, so there is no risk of infection. You
                  may feel a slight pinch when the needle is inserted, but the
                  process is quick and painless. Afterward, you’ll be given
                  refreshments to help you recover.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                How long does the donation process take?
              </div>
              <div className="collapse-content">
                <p>
                  The entire process usually takes about 45 minutes to 1 hour,
                  including registration, a health check, the actual donation
                  (which takes about 10-15 minutes), and post-donation rest.
                  Platelet donations may take longer, around 2-3 hours.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
              What should I do before donating blood?
              </div>
              <div className="collapse-content">
              <p>
                  To ensure a smooth donation experience:
                  <ul className="list-disc list-inside mt-2">
                    <li>Eat a healthy meal and stay hydrated before your appointment.</li>
                    <li>Avoid alcohol and caffeine for at least 24 hours prior.</li>
                    <li>Get a good night’s sleep.</li>
                    <li>Bring a valid ID and any required documents.</li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
              How often can I donate blood?
              </div>
              <div className="collapse-content">
              <p>
                  - For whole blood donations, you can donate every 56 days (about 8 weeks).<br />
                  - For platelet donations, you can donate every 7 days, up to 24 times per year.<br />
                  - For plasma donations, you can donate every 28 days.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
              What happens to my blood after I donate?
              </div>
              <div className="collapse-content">
              <p>
                  After donation, your blood is sent to a lab for testing to ensure it’s safe for transfusion. It is then separated into components (red cells, plasma, and platelets) to help multiple patients. Your donation could save up to 3 lives! Hospitals use these components for surgeries, cancer treatments, trauma care, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default FAQ;
