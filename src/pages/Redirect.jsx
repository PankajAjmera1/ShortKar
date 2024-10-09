// import {storeClicks} from "@/db/apiClicks";
// import {getLongUrl} from "@/db/apiUrls";
// import useFetch from "@/hooks/use-fetch";
// import {useEffect} from "react";
// import {useParams} from "react-router-dom";
// import {BarLoader} from "react-spinners";

// const Redirect = () => {
//   const {id} = useParams();

//   const {loading, data, fn} = useFetch(getLongUrl, id);

//   const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
//     id: data?.id,
//     originalUrl: data?.original_url,
//   });

//   useEffect(() => {
//     fn();
//   }, []);

//   useEffect(() => {
//     if (!loading && data) {
//       fnStats();
//        // Redirect the user to the original long URL
//        window.location.href = data.original_url;
//     }
//   }, [loading, data]);

//   if (loading || loadingStats) {
//     return (
//       <>
//         <BarLoader width={"100%"} color="#36d7b7" />
//         <br />
//         Redirecting...
//       </>
//     );
//   }

//   return null;
// };

// export default Redirect;


import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Redirect = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);

  // Fetch the long URL based on the short URL id
  const { loading, data, fn } = useFetch(getLongUrl, id);

  // Store click stats for tracking purposes
  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fn();  // Fetch long URL
      } catch (err) {
        setError(err.message);  // Set error if something goes wrong
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      // Store clicks only if data is fetched
      fnStats();

      // Redirect to original URL
      if (data.original_url) {
        window.location.href = data.original_url;
      } else {
        setError("No URL found.");
      }
    }
  }, [loading, data]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  // Display error message if no rows are found or something went wrong
  if (error) {
    return <p>Error: {error}</p>;
  }

  return null;
};

export default Redirect;