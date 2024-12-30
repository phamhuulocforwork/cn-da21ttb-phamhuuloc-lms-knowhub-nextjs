"use client";

import { User } from "@/types/user";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Download } from "lucide-react";
import { UserTable } from "./UserTable";
import { PaginationControls } from "./PaginationControls";
import { EditUserDialog } from "./EditUserDialog";
import { userService } from "@/services/userService";
import { downloadExcel } from "@/lib/excel";
import { CreateUserDialog } from "./CreateUserDialog";
import { useDebounce } from "@/components/hooks/use-debounce";
import { useTranslations } from "next-intl";
import { TableSkeleton } from "./TableSkeleton";

export default function UserManagement() {
  const t = useTranslations("admin.users");
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { users, meta } = await userService.getUsers({
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearch,
      });
      setUsers(users);
      setTotalPages(meta.totalPages);
      setTotalUsers(meta.total);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId: string) => {
    try {
      setLoading(true);
      await userService.deleteUser(userId);
      await fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setLoading(false);
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
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold">
            {t("allUsers")}{" "}
            <span className="text-muted-foreground">{totalUsers}</span>
          </h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="w-full sm:w-auto">
              <Input
                placeholder={t("search")}
                className="w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleExportUsers}
                variant="outline"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">{t("export")}</span>
              </Button>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">{t("addUser")}</span>
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : users && users.length > 0 ? (
          <UserTable
            users={users}
            onEdit={setEditingUser}
            onDelete={handleDeleteUser}
          />
        ) : (
          <div className="py-4 text-center">{t("noData")}</div>
        )}

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
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
