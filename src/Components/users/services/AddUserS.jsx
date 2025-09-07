import { jpAxios } from "../../../JpAxios"



export const addUserService = async(data,atl,setAtl,setUsers,users, Success)=>{
    console.log(data)
    jpAxios.post('/users', data)
    .then(res=>{
        
        const nexId = atl + 1
        setAtl(atl+1)
        setUsers([...users, {...data, id: nexId}])
        console.log(res)
        Success("کاربر افزوده شد" , "کاربر با موفقیت ساخته شد", '/users')
    })
}


export const updateUserService = async (data,setData,users,setUsers,userId,CountDown)=>{
        jpAxios.put(`/users/${userId}`, data)
        .then(res=>{
            setData({
                name:res.data.name,
                username:res.data.username,
                email:res.data.email,
                address: {
                    street:res.data.address.street,
                    city:res.data.address.city,
                    suite: res.data.address.suite,
                    zipcode: res.data.address.zipcode,
                }
            })
            
            const updatedUsers = users.map(u=>u.id == userId? {...u,...data}: u);
            setUsers(updatedUsers)
            console.log(res, 'updated')
            
            // alert
            CountDown('/users')
            
            
        })
        .catch(err=>{
            const updatedUsers = users.map(u=>u.id == userId? {...u,...data}: u);
            setUsers(updatedUsers)
            console.log('updated')
            CountDown('/users')
        })
    }