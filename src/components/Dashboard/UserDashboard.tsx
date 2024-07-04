import { useGetMeQuery } from "../../redux/features/user/userApi";


const UserDashboard = () => {
    const {data,}=useGetMeQuery('')
    console.log(data)
    
    return (
        <div>
            this is {data?.data?.name} dashboard
        </div>
    );
};

export default UserDashboard;