import { React } from "react";
import { Link } from "react-router-dom";
import Portada from '../../assets/bg1.jpg'


export default function LandingPage() {
  return (
    <>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
            style={{
              minHeight: "75vh"
            }}>
          <div className="absolute top-0 w-full h-full bg-center bg-cover"
              >
                <img src={Portada} alt="bg1" />
            {/* <span id="blackOverlay" className="w-full h-full absolute opacity-100 bg-white"></span> */}
          </div>
          <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                </div>
                <div class="w-full  flex justify-center mt-4 mb-4">
                   <button className="rounded-full px-5 py-5 bg-white text-gray-800 hover:bg-yellow-600 hover:text-white">
                     <Link to="/home" class="font-bold">
                       DISCOVER
                      </Link>
                  </button>
                </div>
              </div>
          </div>
        </div>
    </>
  );
}

