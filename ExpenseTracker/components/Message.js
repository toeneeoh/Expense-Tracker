import React from "react";

const Message = () => {
    return (
        <div className={`chat-bubble`}>
            <img className="chat-bubble__left" src="" alt="user avatar" />
            <div className="chat-bubble__right">
                <p className="user-name">Expense Tracker</p>
                <p className="user-message">
                    Test message.
                </p>
            </div>
        </div>
    );
};

export default Message;