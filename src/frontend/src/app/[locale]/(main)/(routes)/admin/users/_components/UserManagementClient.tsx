"use client";

import { User } from "@/types/user";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Download } from "lucide-react";
import { usePagination } from "@/components/hooks/use-pagination";
import { UserTable } from "./UserTable";
import { PaginationControls } from "./PaginationControls";
import { EditUserDialog } from "./EditUserDialog";
import { userService } from "@/services/userService";
import { downloadExcel } from "@/lib/excel";
import { CreateUserDialog } from "./CreateUserDialog";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const {
    paginatedItems: currentUsers,
    currentPage,
    totalPages,
    itemsPerPage,
    setPage,
    changeItemsPerPage,
  } = usePagination({
    items: users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  });

  const fetchUsers = useCallback(async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId: string) => {
    try {
      await userService.deleteUser(userId);
      await fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleExportUsers = () => {
    downloadExcel(
      users.map((user) => ({
        Name: user.name,
        Email: user.email,
        Role: user.role,
        "Created At": user.createdAt,
      })),
    );
  };

  return (
    <div className="mx-4 py-10 md:mx-11">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">User management</h1>
          <p className="text-muted-foreground">
            Manage your team members and their account permissions here.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            All users{" "}
            <span className="text-muted-foreground">{users.length}</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search"
                className="w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={handleExportUsers}
              variant="outline"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add user
            </Button>
          </div>
        </div>

        <UserTable
          users={currentUsers}
          onEdit={setEditingUser}
          onDelete={handleDeleteUser}
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
          onItemsPerPageChange={changeItemsPerPage}
        />

        {editingUser && (
          <EditUserDialog
            user={editingUser}
            open={!!editingUser}
            onClose={() => setEditingUser(null)}
            onSuccess={fetchUsers}
          />
        )}

        {showCreateDialog && (
          <CreateUserDialog
            open={showCreateDialog}
            onClose={() => setShowCreateDialog(false)}
            onSuccess={fetchUsers}
          />
        )}
      </div>
    </div>
  );
}
