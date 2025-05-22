import React from 'react';

interface MessagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  userMessage: string;
  adminReply: string;
  subject: string;
}

const MessagePopup: React.FC<MessagePopupProps> = ({
  isOpen,
  onClose,
  userMessage,
  adminReply,
  subject
}) => {
  // Debug logs to track component rendering and props
  console.log('MessagePopup component rendering with props:', { isOpen, userMessage, adminReply, subject });
  
  if (!isOpen) {
    console.log('MessagePopup not showing because isOpen is false');
    return null;
  }
  
  console.log('MessagePopup is open and will render');

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="message-popup-modal">
        <div className="message-popup-content">
          <div className="message-popup-header">
            <h5>{subject || 'Message Details'}</h5>
            <button type="button" className="close-btn" onClick={onClose}>×</button>
          </div>
          <div className="message-popup-body">
            {userMessage && (
              <div className="user-message">
                <p className="message-label">Your message:</p>
                <p className="message-text">{userMessage}</p>
              </div>
            )}
            {adminReply && (
              <div className="admin-reply">
                <p className="message-label">Admin's Reply:</p>
                <p className="message-text">{adminReply}</p>
              </div>
            )}
          </div>
          <div className="message-popup-footer">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9998; /* Higher z-index to ensure it's on top */
        }
        .message-popup-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          border-radius: 5px;
          width: 90%;
          max-width: 500px;
          z-index: 9999; /* Higher z-index to ensure it's on top */
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          border: 2px solid #007bff; /* Add a visible border */
        }
        .message-popup-content {
          display: flex;
          flex-direction: column;
        }
        .message-popup-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #e9ecef;
        }
        .message-popup-header h5 {
          margin: 0;
          font-weight: 500;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .message-popup-body {
          padding: 15px;
          max-height: 60vh;
          overflow-y: auto;
        }
        .user-message, .admin-reply {
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 5px;
        }
        .user-message {
          background-color: #f8f9fa;
          border-left: 3px solid #6c757d;
        }
        .admin-reply {
          background-color: #f8f9fa;
          border-left: 3px solid #007bff;
        }
        .message-label {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .message-text {
          margin: 0;
        }
        .message-popup-footer {
          padding: 15px;
          border-top: 1px solid #e9ecef;
          display: flex;
          justify-content: flex-end;
        }
        .message-popup-footer button {
          padding: 8px 16px;
          background-color: #6c757d;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .message-popup-footer button:hover {
          background-color: #5a6268;
        }
      `}</style>
    </>
  );
};

export default MessagePopup;
