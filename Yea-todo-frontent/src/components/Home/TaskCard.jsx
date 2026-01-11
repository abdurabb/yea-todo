import React from 'react';
import { Check, Edit2, Trash2, Calendar, Tag } from 'lucide-react';
function TaskCard({ task, onToggle, onEdit, onDelete }) {
    const priorityColors = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-green-100 text-green-700 border-green-200'
    };
  
    const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'completed';
  
    return (
      <div className={`bg-white rounded-xl border-2 ${task.status === 'completed' ? 'border-green-200 bg-green-50/30' : 'border-gray-200'} p-5 hover:shadow-lg transition-all duration-200 group`}>
        <div className="flex items-start gap-4">
          <button
            onClick={() => onToggle(task._id)}
            className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
              task.status === 'completed'
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 hover:border-indigo-500'
            }`}
          >
            {task.status === 'completed' && <Check className="w-4 h-4 text-white" />}
          </button>
  
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold mb-1 ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <p className={`text-sm mb-3 ${task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
  
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs px-3 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                {task.priority.toUpperCase()}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {task.group}
              </span>
              {task.deadline && (
                <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 ${
                  isOverdue ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}>
                  <Calendar className="w-3 h-3" />
                  {new Date(task.deadline).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
  
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  export default TaskCard;