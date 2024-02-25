import { useTAuth } from "../../PremiumAuthContext";
import useFeed from "../../hooks/useFeed";

export const PluralFrontPage = () => {
  const user = useTAuth();
  const { key, feed } = useFeed({
    subReddit: 'plural_network_test',
  });

  
  return (
    <>
      <h1 className={'text-2xl'}>Plural Network</h1>

    </>
  )
}

export default PluralFrontPage;