import BaseApi from "./BaseApi";

class ChatsApi extends BaseApi {
  constructor() {
    super('/chats')
  }
}

export default ChatsApi;