import { jpAxios } from "../../../JpAxios"
import Swal from 'sweetalert2';
export const addUserService = async(data,atl,setAtl,setUsers,users)=>{
    console.log(data)
    jpAxios.post('/users', data)
    .then(res=>{
        
        const nexId = atl + 1
        setAtl(atl+1)
        setUsers([...users, {...data, id: nexId}])
        console.log(res)
        
    })
}


export const updateUserService = async (data,setData,users,setUsers,userId,navigate)=>{
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
            
            let timerInterval;
            Swal.fire({
                title: "در حال ویرایش",
                html: "درحال بسته شدن <b></b> .",
                timer: 300,
                timerProgressBar: true,
                color: '#ffffffff',
                background : "#2a2b3a",
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 20);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                    navigate('/users')
                }
            })
            
        })
        .catch(err=>{
            const updatedUsers = users.map(u=>u.id == userId? {...u,...data}: u);
            setUsers(updatedUsers)
            console.log('updated')
            let timerInterval;
            Swal.fire({
                title: "در حال ویرایش",
                html: "درحال بسته شدن <b></b> .",
                timer: 300,
                timerProgressBar: true,
                color: '#ffffffff',
                background : "#2a2b3a",
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 20);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                    navigate('/users')
                }
            })
            
        })
    }