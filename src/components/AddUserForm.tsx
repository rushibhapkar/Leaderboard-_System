import React, { useState } from 'react';
import { UserPlus, Loader } from 'lucide-react';

interface AddUserFormProps {
  onAddUser: (name: string) => Promise<void>;
  isLoading: boolean;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser, isLoading }) => {
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddUser(userName.trim());
      setUserName('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
        Add New User
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter user name..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            disabled={isSubmitting || isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!userName.trim() || isSubmitting || isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Adding User...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;