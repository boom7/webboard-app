"use client";

import React from "react";

interface DeletePostConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeletePostConfirmationModal: React.FC<
  DeletePostConfirmationModalProps
> = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white text-[#1F1F1F] p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="text-sm mb-6">
          Are you sure you want to delete this post?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-[#3E5D4B] text-white rounded hover:bg-[#2F4839]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostConfirmationModal;
