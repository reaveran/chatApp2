declare namespace Model {
  interface ChatList {
    id: string;
    isGroup: boolean;
    groupName?: string;
    photo?: string;
    from: string;
    lastMessage: string;
    createdAt: string;
    unreadMessageCount: number;
  }

  interface ChatMessage {
    id: string;
    userId: string;
    name: string;
    message: string;
    createdAt: string;
  }

  interface GroupDetail {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    photo?: string;
    members: UserDetail[];
  }

  interface UserDetail {
    id: string;
    name: string;
    status?: string;
    photo?: string;
    phoneNumber?: string;
  }

  interface Pagination {
    limit?: number;
    offset: number;
  }
}
