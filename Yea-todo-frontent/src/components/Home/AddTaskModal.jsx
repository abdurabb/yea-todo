import React, { useState } from 'react';
import { X } from 'lucide-react';


function AddTaskModal({ isOpen, onClose, onAdd, editTask,groups }) {
    const [task, setTask] = useState(editTask || {
      title: '',
      description: '',
      deadline: '',
      group: 'Work',
      priority: 'medium'
    });
  
    React.useEffect(() => {
      if (editTask) {
        setTask(editTask);
      } else {
        setTask({ title: '', description: '', deadline: '', group: 'Work', priority: 'medium' });
      }
    }, [editTask, isOpen]);
  
    const handleSubmit = () => {
      if (task.title.trim()) {
        onAdd(task);
        setTask({ title: '', description: '', deadline: '', group: 'Work', priority: 'medium' });
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 transform transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editTask ? 'Edit Task' : 'Add New Task'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
  
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                placeholder="Enter task title"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
  
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                placeholder="Add task description..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors resize-none"
              />
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  value={task.deadline}
                  onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
  
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                <select
                  value={task.priority}
                  onChange={(e) => setTask({ ...task, priority: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Group</label>
              <select
                value={task.group}
                onChange={(e) => setTask({ ...task, group: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
              >
                {groups.filter(g => g !== 'All').map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>
  
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            >
              {editTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  export default AddTaskModal;