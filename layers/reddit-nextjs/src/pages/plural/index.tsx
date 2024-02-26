import { useState } from "react";
import { trpc } from "../../utils";

export const PluralFrontPage = () => {
  // const user = useTAuth();
  // const { key, feed } = useFeed({
  //   subReddit: 'plural_network_test',
  // });

  console.log('end then plural')
  const [phoneNumber, setPhoneNumber] = useState('00015254291050')
  const [password, setPassword] = useState("1991")
  const [phoneCode, setPhoneCode] = useState(null)

  //
  // const sendCodeQuery = trpc.telegram.sendCode.useQuery({
  //   phoneNumber,
  //   password,
  //   phoneCode: phoneCode,
  // }, {
  //   enabled: false
  // })
  const hellp = trpc.hello.useQuery({ textL: "there" })
  console.log(hellp)
  return (<>
      <h1 className={'text-2xl'}>Plural Network</h1>
      <h2>Telegram</h2>
      <div>
        <h3>Phone Number</h3>

        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
      </div>
      <div>
        <h3>Password</h3>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div>
        <h3>Phone Code</h3>
        <input type="text" value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}/>
      </div>
      {/*<button onClick={() => sendCodeQuery.refetch()}>Send Code</button>*/}

    </>
  )
}

export default PluralFrontPage;