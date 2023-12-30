// Put the api into one file
// In the future if we have more api we can separate it into several files

import axios from "axios";
import {
  chatDetailData1,
  chatDetailData2,
  chatDetailData3,
  chatListData,
  groupDetail,
  userDetail,
} from "src/assets/dummyData";

// This is a dummy API with dummy data and dummy API
// On the real env, we need to setup the header with authorization to get user content
// Some of the params that actually needed are not used but I will leave it there

export const chatApi = {
  getChatList: async () => {
    return chatListData;
  },
  getChatDetail: async (id: string, { limit = 20, offset }: Model.Pagination) => {
    const response = await axios.get(`https://private-1eda1-reaveran.apiary-mock.com/chatlist/${id}`, {
      params: { offset: offset },
    });
    return response.data;
  },
  getUserDetail: async (userId: string) => {
    return userDetail;
  },
  getGroupDetail: async (groupId: string) => {
    return groupDetail;
  },
};
