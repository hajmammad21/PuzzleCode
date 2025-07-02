const AdminDashboard = ({ user }) => (
  <div>
    <h1>داشبورد ادمین</h1>
    <p>خوش آمدید مدیر {user.username}!</p>
    {/* Admin features will go here */}
  </div>
);

export default AdminDashboard;
