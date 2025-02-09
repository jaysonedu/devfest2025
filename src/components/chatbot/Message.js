import React from "react";
import { useAuth } from "@/hooks/useAuth";

export const Message = ({message}) => {
  const { user } = useAuth(); // the currently logged in user

	function isMessageFromUser() {
    return user?.id === message.user_id;
  }

  return (
		// Align left or right based on sender
		<div className={`${isMessageFromUser() ? "place-self-end" : "place-self-start"} space-y-2`}>
			<div className={`bg-white p-5 rounded-2xl ${isMessageFromUser() ? "rounded-tr-none" : "rounded-tl-none"}`}>
				{message.message}
			</div>
		</div>
	)
}