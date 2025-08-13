import React, { useEffect, useState } from 'react'
import axios from "axios";

const Toster = ({txt, show, setShow}) => {
    // const [show, setShow] = useState(true);

    useEffect(() => {
      const timer =  setTimeout(() => {
            setShow(false);
        }, 5000)

        return () => clearTimeout(timer);
    }, []);

    if (!show) return

  return (
    <div className='w-auto h-10 bg-green-200 px-5 py-1 border-2 border-green-950 text-center absolute top-10 left-1/2 text-gray-800 rounded-sm max-sm:left-1/3'>
        <p>{txt}</p>
    </div>
  )
}

export default Toster