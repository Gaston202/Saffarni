import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminStats({ users, trips }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {users.length}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Trips</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {trips.length}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admins</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {users.filter(u => u.role === "admin").length}
        </CardContent>
      </Card>
    </div>
  );
}
