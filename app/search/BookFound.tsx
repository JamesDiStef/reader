import React from "react";

interface Props {
  searchText: string;
}

const BookFound = ({ searchText }: Props) => {
  return (
    <div className="flex justify-center mt-[2%] h-[50%] lg:h-[75%]">
      <div className="bg-base-100 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] shadow-sm">
        <div className=" bg-blue-500 bg-opacity-70">
          <p>{searchText}</p>
          <div className="flex justify-center">
            <button className="">Click on this thang!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookFound;
