import { useTAuth } from "../../PremiumAuthContext";
import useFeed from "../../hooks/useFeed";
import { trpc } from "../../utils/trpc";

export const PluralFrontPage = () => {
  // const user = useTAuth();
  // const { key, feed } = useFeed({
  //   subReddit: 'plural_network_test',
  // });


  const helloQuery = trpc.greeting.useQuery({ name: 'asdf' })
  console.log('hello', helloQuery.isSuccess, helloQuery)


  return (<>
      <h1 className={'text-2xl'}>Plural Network</h1>

    </>
  )
}

export default PluralFrontPage;