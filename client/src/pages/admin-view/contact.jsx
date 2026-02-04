import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "@/store/admin/contact-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Mail, MessageSquare, User, Calendar } from "lucide-react";

function AdminContact() {
    const dispatch = useDispatch();
    const { contactList } = useSelector((state) => state.adminContact);

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    return (
        <div className="flex flex-col gap-6">
            <div className='mb-5 w-full flex justify-between' >
                <h1 className='text-3xl font-bold'>Contact Messages</h1>
            </div>
            <div className="grid gap-4">
                {contactList && contactList.length > 0 ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Messages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='w-[200px]'>
                                            <span className='flex items-center gap-2'><User className='w-4 h-4' /> Name</span>
                                        </TableHead>
                                        <TableHead className='w-[250px]'>
                                            <span className='flex items-center gap-2'><Mail className='w-4 h-4' /> Email</span>
                                        </TableHead>
                                        <TableHead>
                                            <span className='flex items-center gap-2'><MessageSquare className='w-4 h-4' /> Message</span>
                                        </TableHead>
                                        <TableHead className="text-right w-[200px]">
                                            <span className='flex items-center gap-2 justify-end'><Calendar className='w-4 h-4' /> Date</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {contactList.map((contact) => (
                                        <TableRow key={contact._id}>
                                            <TableCell className="font-medium">{contact.name}</TableCell>
                                            <TableCell>{contact.email}</TableCell>
                                            <TableCell className="max-w-[400px] truncate" title={contact.message}>
                                                {contact.message}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {contact.createdAt ? format(new Date(contact.createdAt), "PPp") : "N/A"}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex flex-col items-center justify-center p-10 bg-muted/40 rounded-lg border border-dashed">
                        <MessageSquare className="w-10 h-10 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground text-lg">No messages found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminContact;
