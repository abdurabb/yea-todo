import React from 'react'
import { X, LogOut } from 'lucide-react'

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Confirm Logout
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="bg-red-100 p-3 rounded-xl">
            <LogOut className="text-red-600" />
          </div>
          <p className="text-gray-600">
            Are you sure you want to log out? You will need to sign in again to
            access your tasks.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={()=>{
              onConfirm()
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
