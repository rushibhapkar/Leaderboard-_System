import React from 'react';
import { Gift, Loader } from 'lucide-react';

interface ClaimButtonProps {
  onClaim: () => void;
  disabled: boolean;
  isLoading: boolean;
  selectedUserName?: string;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ 
  onClaim, 
  disabled, 
  isLoading, 
  selectedUserName 
}) => {
  return (
    <div className="space-y-4">
      <button
        onClick={onClaim}
        disabled={disabled || isLoading}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center text-lg font-semibold shadow-lg"
      >
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            Claiming Points...
          </>
        ) : (
          <>
            <Gift className="w-5 h-5 mr-2" />
            Claim Random Points
          </>
        )}
      </button>
      {selectedUserName && !disabled && (
        <p className="text-center text-sm text-gray-600">
          Click to claim random points (1-10) for <strong>{selectedUserName}</strong>
        </p>
      )}
    </div>
  );
};

export default ClaimButton;