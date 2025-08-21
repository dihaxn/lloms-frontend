import React from "react";

const MapComponent = () => {
  return (
    <div>
    <div className="flex border border-gray-300 my-5 mx-20 rounded-lg">
    <div className="w-full h-96">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9736926753685!2d80.159973!3d6.134237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae17768ce1bbcdf%3A0xf535b67a4863c687!2sLittle%20Lanka%20Confectioneries%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1739805345575!5m2!1sen!2slk" 
            className="w-full h-full rounded-lg border-0 "
            style={{border:"0"}} 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
    </div>
    </div>
  );
};

export default MapComponent;
