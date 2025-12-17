import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AdminStats from "@/components/admin/AdminStats";
import UsersTable from "@/components/admin/UsersTable";
import TripsTable from "@/components/admin/TripsTable";
import HotelsManagement from "@/components/admin/HotelsManagement";
import DestinationsManagement from "@/components/admin/DestinationsManagement";
import ActivitiesManagement from "@/components/admin/ActivitiesManagement";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:6005/api";

export default function Admin() {
  const { token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const resUsers = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resTrips = await axios.get(`${API_URL}/admin/trips`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(resUsers.data);
      setTrips(resTrips.data);
    } catch (err) {
      console.error("Admin load failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] p-8">
      <h1 className="text-4xl font-bold text-[#1f3a63] mb-8">
        Admin Dashboard
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="users">Users & Trips</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AdminStats users={users} trips={trips} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <UsersTable users={users} setUsers={setUsers} />
            <TripsTable trips={trips} setTrips={setTrips} />
          </div>
        </TabsContent>

        <TabsContent value="hotels">
          <HotelsManagement token={token} />
        </TabsContent>

        <TabsContent value="destinations">
          <DestinationsManagement token={token} />
        </TabsContent>

        <TabsContent value="activities">
          <ActivitiesManagement token={token} />
        </TabsContent>

        <TabsContent value="users">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <UsersTable users={users} setUsers={setUsers} />
            <TripsTable trips={trips} setTrips={setTrips} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
