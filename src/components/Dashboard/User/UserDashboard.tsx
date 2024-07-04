import MyProfile from "./MyProfile";

import UserCards from "./userCards";

const UserDashboard = () => {
  return (
    <div className="mb-10 text-start ms-5">
      {/* <div>
        <p className="text-pretty text-primary font-bold text-2xl">
          Welcome,
          <span className="font-serif text-slate-700 text-lg">
            MD FARHAN ADNAN MASUM
          </span>
        </p>
      </div> */}

      <UserCards />
      <MyProfile />
    </div>
  );
};

export default UserDashboard;
