import axios from "axios";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";

export default function TripsTable({ trips, setTrips }) {
  const { token } = useContext(AuthContext);

  const deleteTrip = async (id) => {
    if (!confirm("Delete this trip?")) return;

    await axios.delete(`${API_URL}/admin/trips/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setTrips(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Trips</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Title</th>
            <th>User</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {trips.map(trip => (
            <tr key={trip._id} className="border-t">
              <td>{trip.title}</td>
              <td>{trip.user?.email}</td>
              <td>
                <Button
                  variant="destructive"
                  onClick={() => deleteTrip(trip._id)}
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
