/* eslint-disable @typescript-eslint/no-explicit-any */
import Action from "@/components/ActionsDropDown";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import Paginate from "@/components/Pagination";
import TypeFiltering from "@/components/TypeFiltering";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { role } from "@/constant/role";
import {
  useGetAllUserQuery,
  useTakeActionMutation,
} from "@/redux/features/user/user.api";
import type { TransactionType } from "@/types/transaction.types";
import { Trash2 } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import { UserActionModal } from "../components/UserActionModal";

export default function Users() {
  const [type, setType] = useState<TransactionType | null>(null);
  const [id, setId] = useState("");
  const [takeAction, { isSuccess, isLoading: actionLoading }] =
    useTakeActionMutation();
  const [searchParams] = useSearchParams("");
  const page = searchParams.get("page");

  const { data: usersData, isLoading } = useGetAllUserQuery({
    role: type,
    page,
  });
  const users = usersData?.data ?? [];

  const handleDelete = async (value: boolean) => {
    try {
      const res = await takeAction({ userId: id, isDeleted: value }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  const handleSuspend = async (value: boolean) => {
    try {
      const res = await takeAction({ userId: id, isSuspended: value }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <Card className="p-6 shadow-md border rounded-xl">
      <h2 className="text-xl font-semibold mb-4">📊 Users</h2>

      <div className="overflow-x-auto rounded-md border">
        {isLoading && (
          <DashboardSkeleton
            labels={[
              "Name",
              "Phone",
              "Suspended",
              "Deleted",
              "Wallet",
              "Email",
            ]}
            key={1}
          />
        )}
        ,
        {!isLoading && users && (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="min-w-[140px]">Name</TableHead>
                <TableHead className="min-w-[140px]">Phone</TableHead>
                <td>
                  <TypeFiltering
                    label="Role"
                    typesObject={role}
                    onChange={
                      setType as Dispatch<SetStateAction<string | null>>
                    }
                  />
                </td>
                {/* <TableHead className="min-w-[120px]">Role</TableHead> */}
                <TableHead className="min-w-[120px]">Suspended</TableHead>
                <TableHead className="min-w-[120px]">Deleted</TableHead>
                <TableHead className="min-w-[160px]">Wallet</TableHead>
                <TableHead className="min-w-[200px]">Email</TableHead>
                <TableHead className="min-w-[200px]">
                  <Action />
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.length > 0 &&
                users.map((user) => (
                  <TableRow key={user._id} className="hover:bg-muted/40">
                    {/* Name */}
                    <TableCell className="min-w-[140px] font-medium">
                      {user.name}
                    </TableCell>

                    {/* Phone */}
                    <TableCell className="min-w-[140px]">
                      {user.phone}
                    </TableCell>

                    {/* Role */}
                    <TableCell className="min-w-[120px]">
                      <Badge
                        variant="outline"
                        className={
                          user.role === role.admin
                            ? "bg-red-100 text-red-600"
                            : user.role === role.agent
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>

                    {/* Suspended */}
                    <TableCell className="min-w-[120px]">
                      <Badge
                        variant={user.isSuspended ? "destructive" : "secondary"}
                      >
                        {user.isSuspended ? "Suspended" : "Active"}
                      </Badge>
                    </TableCell>
                    {/* Delete */}
                    <TableCell className="min-w-[120px]">
                      <Badge
                        variant={user.isDeleted ? "destructive" : "secondary"}
                      >
                        {user.isDeleted ? "Deleted" : "Available"}
                      </Badge>
                    </TableCell>

                    {/* Wallet */}
                    <TableCell className="min-w-[160px]">
                      {user.wallet}
                    </TableCell>

                    {/* Email */}
                    <TableCell
                      className="min-w-[200px] truncate"
                      title={user.email || "N/A"}
                    >
                      {user.email || "N/A"}
                    </TableCell>
                    {/* Action */}
                    <TableCell className="flex items-center gap-2">
                      <UserActionModal
                        close={isSuccess}
                        disable={actionLoading}
                        values={["Delete", "Recover"]}
                        onChange={handleDelete}
                      >
                        <Button
                          size="icon"
                          className="hover:bg-primary"
                          variant="secondary"
                          onClick={() => setId(user._id)}
                        >
                          <Trash2 />
                        </Button>
                      </UserActionModal>

                      <UserActionModal
                        close={isSuccess}
                        disable={actionLoading}
                        values={["Suspend", "Activate"]}
                        onChange={handleSuspend}
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="hover:bg-primary"
                          onClick={() => setId(user._id)}
                        >
                          Suspend
                        </Button>
                      </UserActionModal>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="hover:bg-primary"
                      >
                        <Link to={`/admin/users/transactions/${user.phone}`}>
                          Transactions
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="hover:bg-primary"
                      >
                        <Link
                          to={`/admin/audit-logs?id=${user._id}&name=${user.name}`}
                        >
                          Activities
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
        {!isLoading && !users?.length && (
          <div className="text-center py-2 text-gray-500">No Data Found.</div>
        )}
      </div>

      {/* Pagination */}
      {usersData && usersData.meta!.total > 10 && (
        <Paginate
          currentPage={Number(page) || 1}
          totalPages={usersData.meta!.totalPages}
        />
      )}
    </Card>
  );
}
