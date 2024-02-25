import { useTAuth } from "../../PremiumAuthContext";
import useFeed from "../../hooks/useFeed";

export const PluralFrontPage = () => {
  const user = useTAuth();
  const { key, feed } = useFeed({
    boardId: 'plural_network_test',
  });
  console.log('feed', feed);
  console.log('key', key);
  console.log('user', user);
  return (
    <>
      <h1 className={'text-2xl'}>Plural Network</h1>

    </>
  )
}

export default PluralFrontPage;