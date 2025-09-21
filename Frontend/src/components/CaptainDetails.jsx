import React from "react";

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <h4 className="text-lg font-medium">Harsh Patel</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">Rs.298.20</h4>
          <p className="text-lg text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">50.0</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">50.0</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">50.0</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
