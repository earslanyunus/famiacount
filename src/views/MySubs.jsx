import React, { useEffect ,useState} from 'react'
import { getSubscriptionFromUser, getSubscriptionWithId } from '../firebase'
import { useSelector } from 'react-redux'

export default function MySubs() {
    const user = useSelector((state) => state.user.user);
    const [subs, setSubs] = useState([])
    useEffect(() => {
        if (user?.uid) {
            const mySubs = []
        getSubscriptionFromUser(user.uid).then((data) => {
          console.log(data);
            data.forEach((doc) => {
             if(doc.id){
              getSubscriptionWithId(doc?.id).then((data) => {
                console.log(data);
                mySubs.push(data);
                
              })
            }
            })

            setSubs(mySubs)
            subs.forEach((item) => {
              console.log(item[1].user );
            })
        })}
    }, [user])
    
  return (
    <div>MySubs</div>
  )
}
