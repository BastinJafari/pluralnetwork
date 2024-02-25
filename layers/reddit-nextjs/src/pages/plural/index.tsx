import { useTAuth } from "../../PremiumAuthContext";
import useFeed from "../../hooks/useFeed";

export const PluralFrontPage = () => {
  const user = useTAuth();
  const { key, feed } = useFeed({
    subReddit: 'plural_network_test',
  });


  console.log('key in index', key);
  console.log('feed in index', feed);
  return (
    <>
      <h1 className={'text-2xl'}>Plural Network</h1>

    </>
  )
}

export default PluralFrontPage;