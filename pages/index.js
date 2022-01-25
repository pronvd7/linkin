import Head from "next/head";
import Main from "../components/main";
import { getPageDatawLinkAndSocialData } from "../lib/dbfuncprisma";

export async function getServerSideProps() {
  let data;
  // console.log(process.env.NODE_ENV);
  try {
    data = await getPageDatawLinkAndSocialData();
    // console.log(data);
  } catch (error) {
    console.log(error.message);
  }

  return {
    props: {
      pageData: data.pageData,
      linkData: data.linkData,
      socialData: data.socialData,
    },
  };
}

export default function Home({ pageData, linkData, socialData }) {
  return (
    <>
      <Head>
        <title> Travel Hackers | Leisure Travel Services</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="og:description"
          content="Welcome to the luxury travel hacking club! Round up some friends, choose a destination, make a plan - we&#039;ve got you covered from there. We offer guided excursions by renowned experts in destinations worldwide."
        />
        <meta name="og:site_name" content="Luxury Travel Hackers" />
        <meta
          name="og:title"
          content="Travel Hackers | Leisure Travel Services"
        />
        <meta name="og:image" content="https://luxurytravelhackers.com/wp-content/uploads/2020/04/Screen-Shot-2020-04-22-at-8.57.28-AM-1024x539.png" />
      </Head>

      <Main/>
    </>
  );
}
