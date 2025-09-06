import { useContext, useEffect, useState } from 'react'
import './AddUser.css'
import {  useNavigate, useParams } from 'react-router-dom'
import { UserContext, UserLenContext } from './userContext';
import { jpAxios } from '../../JpAxios';
import { addUserService , updateUserService} from './services/AddUserS';


const AddUserCompo = ()=>{
    
    const {userId} = useParams();
    const navigate= useNavigate()
    const {users, setUsers} = useContext(UserContext)
    const {atl, setAtl} = useContext(UserLenContext)
    
    const [data, setData] = useState({
        name:'',
        username:'',
        email:'',
        address: {
            street:'',
            city:'',
            suite: '',
            zipcode: '',
        }
    })
    
    
    
    
    
    const handelAddUser = ()=>{
        addUserService(data,atl, setAtl,setUsers,users);
        navigate('/users')
    }

    const handelChangeUser = ()=>{
        
        updateUserService(data,setData,users,setUsers,userId,navigate);
    }
    useEffect(()=>{
        if(userId){
            
            jpAxios.get(`/users/${userId}`)
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
                console.log(res)
            })
            .catch(err=>{
                const index = users.findIndex(user=> user.id == userId);
                const user = users[index]
                setData({
                    name:user.name,
                    username:user.username,
                    email:user.email,
                    address: {
                        street:user.address.street,
                        city:user.address.city,
                        suite: user.address.suite,
                        zipcode: user.address.zipcode,
                    }
                })
                console.log(user)
            })
        }
    },[])
    
    return (
        <div className="add-user-container">
        <div className="add-user-top">
        <h1>{userId ? "ویرایش کاربر" : "افزودن کاربر"}</h1>
        </div>
        
        <div className="add-user-bottom">
        <div className="add-user-grid">
        
        <div className="name item item-1">
        <label htmlFor="name">: نام و نام خانوادگی</label>
        <input
        type="text"
        name="name"
        id="name"
        value={userId ? (data.name ) : data.name }
        onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        </div>
        
        <div className="username item item-2">
        <label htmlFor="username">: نام کاربری</label>
        <input
        type="text"
        name="username"
        id="username"
        value={userId ? (data.username ) : data.username }
        onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        </div>
        
        <div className="email item item-3">
        <label htmlFor="email">: ایمیل</label>
        <input
        type="text"
        name="email"
        id="email"
        value={userId ?( data.email ) : data.email }
        onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        </div>
        
        <div className="address-label item item-4">
        <label>: آدرس</label>
        </div>
        
        <div className="address item item-5">
        <input
        type="text"
        placeholder="شهر"
        value={userId ? (data.address.city ) : data.address.city }
        onChange={(e) =>
            setData({ ...data, address: { ...data.address, city: e.target.value } })
        }
        />
        <input
        type="text"
        placeholder="پلاک"
        value={userId ? (data.address.street ) : data.address.street }
        onChange={(e) =>
            setData({ ...data, address: { ...data.address, street: e.target.value } })
        }
        />
        </div>
        
        <div className="address item item-6">
        <input type="text" placeholder="استان" />
        <input
        type="text"
        placeholder="کدپستی"
        value={userId ? (data.address.zipcode ) : data.address.zipcode }
        onChange={(e) =>
            setData({ ...data, address: { ...data.address, zipcode: e.target.value } })
        }
        />
        </div>
        
        <div className="address item item-7">
        <input
        type="text"
        placeholder="آدرس"
        value={userId ?( data.address.suite ) : data.address.suite }
        onChange={(e) =>
            setData({ ...data, address: { ...data.address, suite: e.target.value } })
        }
        />
        </div>
        
        <div className="btns item-8">
        <button
        onClick={userId ? handelChangeUser : handelAddUser}
        className="btn btn-add"
        >
        {userId ? "ویرایش" : "افزودن"}
        </button>
        <button className="btn btn-back" onClick={() => navigate(-1)}>
        بازگشت
        </button>
        </div>
        </div>
        </div>
        </div>
    );
}


export default AddUserCompo;