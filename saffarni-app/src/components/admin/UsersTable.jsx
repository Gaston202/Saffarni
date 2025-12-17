import axios from "axios";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";

export default function UsersTable({ users, setUsers }) {
  const { token } = useContext(AuthContext);

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    await axios.delete(`${API_URL}/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUsers(prev => prev.filter(u => u._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-t">
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="destructive"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
