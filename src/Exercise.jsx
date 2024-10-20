import { useState } from "react";
import recenzo from "./assets/reconzo.svg";
import 'primeicons/primeicons.css';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const Exercise = () => {
  const [countryName, setCountryName] = useState('');
  const [show, setShow] = useState(false);

  const [info, setInfo] = useState({
    common: "",
    official: "",
    population: "",
    capital: [],
  });

  const handleSubmit = async () => {
    if (countryName === "") {
      toast.error("Please provide country name");
      return;
    }

    let new_name = countryName.toLowerCase().trim();

    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${new_name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      if (res.ok) {
        // console.log(data);
        setInfo({
          common: data[0].name.common,
          official: data[0].name.official,
          population: data[0].population,
          capital: data[0].capital
        });
        toast.success("Data fetched");
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
    }
  }

  console.log(info);

  return (
    <>
      <nav className="flex justify-between items-center sm:px-20 sm:py-4 xs:px-10 xs:py-2 border-b-[1px] border-slate-400">
        <Link to="/"><img src={recenzo} className="w-36" /></Link>

        <div className="show sm:flex gap-x-4">
          <Link to="/about"><p className="px-2 py-1.5 hover:bg-blue-950 text-center cursor-pointer hover:border-none border-b-[2px] border-orange-400 text-black hover:text-white rounded-sm">About Us</p></Link>
          <Link href="/"><p className="px-2 py-1.5 hover:bg-blue-950 text-center cursor-pointer hover:border-none border-b-[2px] border-orange-400 text-black hover:text-white rounded-sm">Blog</p></Link>

          <button className="px-2 py-1.5 bg-blue-900 hover:bg-red-700 text-center text-white shadow-lg rounded-sm">Contact Us</button>
        </div>

        <i className={`sm:hidden pi ${show ? 'pi-times' : 'pi-bars'}`} onClick={() => setShow(!show)} />

      </nav>
      {show ? <div className="xs:absolute flex flex-col mt-2 right-0 mr-[7%] px-4 py-2 gap-y-2 bg-white sm:hidden border border-slate-500 rounded-md">
        <Link to="/"><p className="active:text-emerald-400">About Us</p></Link>
        <Link to="/"><p className="active:text-emerald-400">Contact Us</p></Link>
      </div> : <></>}

      <div className="flex flex-col sm:mt-16 xs:mt-16 sm:gap-y-10 xs:gap-y-6 w-fit mx-auto">
        <div className="flex gap-x-4">
          <input type="text" placeholder="Enter Name of Country" onChange={(e) => setCountryName(e.target.value)} className="outline-none sm:px-4 xs:px-3 py-1 sm:text-[1rem] xs:text-[15px] caret-slate-400 border border-slate-400 rounded-md" />
          <button className="sm:px-4 xs:px-3 sm:text-[1rem] xs:text-[15px] bg-emerald-500 text-slate-800 border rounded-md" onClick={handleSubmit}>Submit</button>
        </div>

        <div className="flex flex-col gap-y-2 sm:text-[1rem] xs:text-[15px] font-bold">
          <p className="flex gap-x-6">Common Name <span className="font-bold text-emerald-800 underline">{info.common}</span></p>
          <p className="flex gap-x-8">Official Name <span className="font-bold text-emerald-800 underline">{info.official}</span></p>
          <p className="flex gap-x-14">Population <span className="font-bold text-emerald-800 underline">{info.population}</span></p>
          <p className="flex flex-wrap gap-x-14">Capital(s) <span className="font-bold text-emerald-800 underline">{info.capital.map(val => val)}</span></p>
        </div>
      </div>

      <footer className="flex flex-col mt-[7.3rem] w-full sm:px-10 sm:py-4 xs:px-8 xs:py-2 bg-blue-600 border-t-[4px] border-orange-500">
        <div className="flex sm:flex-row xs:flex-col justify-between text-white md:text-[16px] sm:text-[14px] xs:text-[12px]">
          <p className="xs:mx-auto sm:mx-0">COPYRIGHT © REWEAVE ECOM SOLUTIONS PRIVATE LIMITED 2024</p>
          <p className="xs:mx-auto sm:mx-0">Made with ❤️ in India </p>
        </div>
        <Link to="/" className="w-fit"><p className="underline text-white md:text-[16px] sm:text-[14px] xs:text-[12px] mt-2">Terms and Conditions</p></Link>

      </footer>
    </>
  )
}

export default Exercise
