import React from 'react';
import { User, ChevronDown } from 'lucide-react';

interface UserSelectorProps {
  users: any[];
  selectedUserId: string;
  onUserSelect: (userId: string) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ users, selectedUserId, onUserSelect }) => {
  const selectedUser = users.find(user => user._id === selectedUserId);

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select User
      </label>
      <div className="relative">
        <select
          value={selectedUserId}
          onChange={(e) => onUserSelect(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900 transition-all duration-200 hover:border-gray-400"
        >
          <option value="">Choose a user...</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.totalPoints} points)
            </option>
          ))}
        </select>
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
      </div>
      {selectedUser && (
        <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>{selectedUser.name}</strong> - Current Points: {selectedUser.totalPoints}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserSelector;