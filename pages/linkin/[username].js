import Head from "next/head";
import { useRouter } from "next/router";
import LinkinTheBioPage from "../../components/linktree";
import { getPageDatawLinkAndSocialData } from "../../lib/dbfuncprisma";

export async function getServerSideProps({params}) {
  let data;
  try {
    data = await getPageDatawLinkAndSocialData(params.username);
  } catch (error) {
    console.log(error.message);
  }
    return {
      props: {
        pageData: data.pageData,
        linkData: data.linkData,
        socialData: data.socialData,
        username : params.username,
      },
    };
  }


export default function Home({ pageData, linkData, socialData, username }) {

  return (
    <>
    { (pageData.username !== username)  ? (
    <>
        <Head>
        <title> {`${username} Not Found`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
          <h2>User Name "{username}" is not found!</h2>
    </>
    ) : (
    <>
      <Head>
        <title> {`${pageData.handlerText}'s Link tree Page`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="og:description"
          content={`${pageData.handlerText}'s Link tree Page`}
        />
        <meta name="og:site_name" content={pageData.handlerText} />
        <meta
          name="og:title"
          content={`${pageData.handlerText}'s Link tree Page`}
        />
        <meta name="og:image" content={pageData.avatarUrl} />
      </Head>

      <LinkinTheBioPage
        {...pageData}
        linkData={linkData}
        socialData={socialData}
      />
     </> 
     )}
    </>  
  );
}