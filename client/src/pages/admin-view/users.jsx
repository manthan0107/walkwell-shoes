import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "@/store/admin/users-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "lucide-react";

function AdminUsers() {
    const dispatch = useDispatch();
    const { userList } = useSelector((state) => state.adminUsers);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    return (
        <div className="flex flex-col gap-6">
            <div className='mb-5 w-full flex justify-between' >
                <h1 className='text-3xl font-bold'>Users</h1>
            </div>
            <div className="grid gap-4">
                {userList && userList.length > 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Registered Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">
                                            <span className='flex items-center gap-2'><User className='w-4 h-4' /> Username</span>
                                        </TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userList.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell className="font-medium">{user.userName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell className="capitalize">{user.role}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
}

export default AdminUsers;
