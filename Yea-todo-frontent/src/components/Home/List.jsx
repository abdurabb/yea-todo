import React, { useState, useEffect } from 'react'
import {
    Plus,
    Check,
    X,
    Calendar,
    ListTodo,
    LogOut,
    User,
    Search,
    Filter,
} from 'lucide-react'
import TaskCard from './TaskCard'
import AddTaskModal from './AddTaskModal'
import { useGetTasks, useAddTask, useDeleteTask, useUpdateTask } from '../../api/userDataController'
import PageNation from '../pagination/Pagination'
import LogoutModal from '../Logout/Confirmation'
import { toast } from 'react-toastify'

const groups = ['All', 'Work', 'Personal', 'Shopping', 'Health']
const statuses = ['All', 'pending', 'completed']
const priorities = ['All', 'high', 'medium', 'low']

export default function TodoHome() {
    const [selectedGroup, setSelectedGroup] = useState('All')
    const [selectedStatus, setSelectedStatus] = useState('All')
    const [selectedPriority, setSelectedPriority] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [page, setPage] = useState(1)
    const [limit] = useState(5)

    const groupParam = selectedGroup === 'All' ? '' : selectedGroup;
    const statusParam = selectedStatus === 'All' ? '' : selectedStatus;
    const priorityParam = selectedPriority === 'All' ? '' : selectedPriority;
    // api
    const { data: taskData, isLoading, refetch, isError, error } = useGetTasks(page, limit, searchQuery, statusParam, groupParam, priorityParam)
    const { mutate: addTask, isPending: isAddingTask, isError: isAddError, error: addError, isSuccess: isAddSuccess } = useAddTask();
    const { mutate: updateTask, isPending: isUpdatingTask, isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess } = useUpdateTask();
    const { mutate: deleteTask, isPending: isDeletingTask, isError: isDeleteError, error: deleteError, isSuccess: isDeleteSuccess } = useDeleteTask();

    useEffect(() => {
        if (isUpdateSuccess) {
            toast.success('Task updated successfully');
        }
    }, [isUpdateSuccess]);

    useEffect(() => {
        if (isDeleteSuccess) {
            toast.success('Task deleted successfully');
        }
    }, [isDeleteSuccess]);

    useEffect(() => {
        if (isAddSuccess) {
            toast.success('Task added successfully');
        }
    }, [isAddSuccess]);




    // Extract tasks from API response (adjust based on your API response structure)
    const tasks = taskData?.tasks || [];
    const totalTasks = taskData?.total || 0

    // ---------------- HANDLERS ----------------


    const handleToggleTask = (id) => {
        // Toggle status: if completed, set to pending; if pending, set to completed
        const currentTask = tasks.find(t => (t.id || t._id) === id);
        const newStatus = currentTask?.status === 'completed' ? 'pending' : 'completed';
        updateTask({ id, data: { status: newStatus } });
    }

    const handleAddTask = (taskData) => {
        if (editingTask) {
            // Update existing task
            updateTask({ id: editingTask.id || editingTask._id, data: taskData });
        } else {
            // Add new task
            addTask(taskData);
        }
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleDeleteTask = (id) => {
        deleteTask(id)
    }

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    }

    useEffect(() => {
        if (isAddError) {
            toast.error(addError?.response?.data?.message || 'Error adding task');
        }
    }, [isAddError, addError]);
    useEffect(() => {
        if (isDeleteError) {
            toast.error(deleteError?.response?.data?.message || 'Error deleting task');
        }
    }, [isDeleteError, deleteError]);
    useEffect(() => {
        if (isUpdateError) {
            toast.error(updateError?.response?.data?.message || 'Error updating task');
        }
    }, [isUpdateError, updateError]);


    const stats = {
        total: totalTasks,
        completed: tasks.filter((t) => t.status === 'completed').length,
        pending: tasks.filter((t) => t.status === 'pending').length,
    }

    const activeFiltersCount = [selectedGroup, selectedStatus, selectedPriority].filter(
        (f) => f !== 'All'
    ).length

    // ---------------- UI ----------------
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-xl">
                            <ListTodo className="text-white" />
                        </div>
                        <h1 className="hidden md:block text-xl font-bold">TaskFlow</h1>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setEditingTask(null);
                                setIsModalOpen(true);
                            }}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2 whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            {isAddingTask ? 'Adding...' : 'Add Task'}
                        </button>
                        <button onClick={() => setShowLogoutModal(true)} className="p-2 rounded-lg hover:bg-gray-100">
                            <LogOut />
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard label="Total" value={stats.total} />
                    <StatCard label="Pending" value={stats.pending} />
                    <StatCard label="Completed" value={stats.completed} />
                </div>

                {/* Search & Filters */}
                <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
                        >
                            <Filter />
                            Filters
                            {activeFiltersCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 rounded-full">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {showFilters && (
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                            <Select label="Group" value={selectedGroup} onChange={setSelectedGroup} options={groups} />
                            <Select label="Status" value={selectedStatus} onChange={setSelectedStatus} options={statuses} />
                            <Select label="Priority" value={selectedPriority} onChange={setSelectedPriority} options={priorities} />
                        </div>
                    )}
                </div>

                {/* Tasks */}
                <div className="space-y-3">
                    {isLoading ? (
                        <p className="text-center text-gray-500 py-10">Loading tasks...</p>
                    ) : isError ? (
                        <p className="text-center text-red-500 py-10">
                            {error?.response?.data?.message || 'Error loading tasks'}
                        </p>
                    ) : taskData?.tasks?.length > 0 ? (
                        taskData?.tasks?.map((task) => (
                            <TaskCard
                                key={task.id || task._id}
                                task={task}
                                onToggle={handleToggleTask}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10">No tasks found</p>
                    )}
                </div>

                {/* pagination */}
                {
                    totalTasks > limit && (
                        <div className='flex justify-end mt-4'>
                            <PageNation
                                totalPage={taskData?.totalPages}
                                setPage={setPage}
                                currentPage={page}
                            />
                        </div>
                    )
                }

                <LogoutModal
                    isOpen={showLogoutModal}
                    onClose={() => setShowLogoutModal(false)}
                    onConfirm={() => {
                        setShowLogoutModal(false)
                        // TODO: clear auth + redirect
                        localStorage.clear()
                        window.location.href = '/login'
                    }}
                />


                {/* add tast */}
                <div>
                    <AddTaskModal
                        groups={groups}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onAdd={handleAddTask}
                        editTask={editingTask}
                    />
                </div>
            </main>
        </div>
    )
}

// ---------------- SMALL COMPONENTS ----------------
const StatCard = ({ label, value }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
)

const Select = ({ label, value, onChange, options }) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <select
            className="w-full mt-1 border rounded-lg p-2"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((o) => (
                <option key={o} value={o}>
                    {o}
                </option>
            ))}
        </select>
    </div>
)
