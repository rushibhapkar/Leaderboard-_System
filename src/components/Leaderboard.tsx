import React from 'react';
import { Trophy, Medal, Award, User } from 'lucide-react';

interface LeaderboardProps {
  users: any[];
  isLoading: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, isLoading }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300';
      default:
        return 'bg-white border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🏆 Leaderboard</h2>
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                <div className="w-6 h-6 bg-gray-300 rounded mr-4"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
        Leaderboard
      </h2>
      
      {users.length === 0 ? (
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No users found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user, index) => (
            <div
              key={user._id}
              className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${getRankStyle(index + 1)}`}
            >
              <div className="flex items-center justify-center mr-4">
                {getRankIcon(index + 1)}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">Rank #{index + 1}</p>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{user.totalPoints}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;