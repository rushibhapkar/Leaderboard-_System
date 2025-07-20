import React, { useState, useEffect } from 'react';
import { Zap, RefreshCw, Users } from 'lucide-react';
import UserSelector from './components/UserSelector';
import AddUserForm from './components/AddUserForm';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import PointsAnimation from './components/PointsAnimation';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [claimedPoints, setClaimedPoints] = useState<number | null>(null);
  const [claimedUserName, setClaimedUserName] = useState('');
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3004/api/users');
      console.log(import.meta.env.VITE_API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error connecting to server. Please make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async (name:string) => {
    try {
      const response = await fetch('http://localhost:3004/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      await fetchUsers();
      alert('User added successfully!');
    } catch (error: any) {
      alert(error.message || 'Error adding user');
    }
  };

  const claimPoints = async () => {
    if (!selectedUserId) {
      alert('Please select a user first');
      return;
    }

    setIsClaimLoading(true);
    try {
      const response = await fetch(`http://localhost:3004/api/users/${selectedUserId}/claim`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Error claiming points');
      }

      const data = await response.json();
      setClaimedPoints(data.pointsClaimed);
      setClaimedUserName(data.user.name);
      
      // Refresh users after claiming
      setTimeout(() => {
        fetchUsers();
      }, 500);
    } catch (error) {
      console.error('Error claiming points:', error);
      alert('Error claiming points');
    } finally {
      setIsClaimLoading(false);
    }
  };

  const handleAnimationComplete = () => {
    setClaimedPoints(null);
    setClaimedUserName('');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const selectedUser = users.find((user: any) => user._id === selectedUserId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Leaderboard System</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Select users, claim random points, and watch the rankings change in real-time!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                <p className="text-gray-600">Total Users</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {users.reduce((sum: number, user: any) => sum + user.totalPoints, 0)}
                </p>
                <p className="text-gray-600">Total Points</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <button
              onClick={fetchUsers}
              disabled={isLoading}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* User Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <UserSelector
                users={users}
                selectedUserId={selectedUserId}
                onUserSelect={setSelectedUserId}
              />
            </div>

            {/* Claim Button */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <ClaimButton
                onClaim={claimPoints}
                disabled={!selectedUserId}
                isLoading={isClaimLoading}
                selectedUserName={selectedUser?.name}
              />
            </div>

            {/* Add User Form */}
            <AddUserForm onAddUser={addUser} isLoading={isLoading} />
          </div>

          {/* Middle Column - Leaderboard */}
          <div className="lg:col-span-2">
            <Leaderboard users={users} isLoading={isLoading} />
          </div>
        </div>

        {/* Claim History */}
        <div className="mt-8">
          <ClaimHistory
            isVisible={showHistory}
            onToggle={() => setShowHistory(!showHistory)}
          />
        </div>

        {/* Points Animation */}
        <PointsAnimation
          points={claimedPoints}
          userName={claimedUserName}
          onComplete={handleAnimationComplete}
        />
      </div>
    </div>
  );
}

export default App;