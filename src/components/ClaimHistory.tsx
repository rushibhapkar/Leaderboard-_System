import React, { useState, useEffect } from 'react';
import { History, Clock, TrendingUp } from 'lucide-react';

interface ClaimHistoryProps {
  isVisible: boolean;
  onToggle: () => void;
}

const ClaimHistory: React.FC<ClaimHistoryProps> = ({ isVisible, onToggle }) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/users/history');
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchHistory();
    }
  }, [isVisible]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center">
          <History className="w-5 h-5 mr-2 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Claim History</h3>
        </div>
        <span className="text-gray-400">{isVisible ? '−' : '+'}</span>
      </button>
      
      {isVisible && (
        <div className="border-t border-gray-200 p-4">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="flex items-center p-3 bg-gray-100 rounded">
                    <div className="w-4 h-4 bg-gray-300 rounded mr-3"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                    </div>
                    <div className="h-6 bg-gray-300 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-6">
              <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No claim history yet</p>
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto space-y-2">
              {history.map((claim: any) => (
                <div key={claim._id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {claim.userName} claimed {claim.pointsClaimed} points
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(claim.claimedAt)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-green-600">
                    +{claim.pointsClaimed}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClaimHistory;