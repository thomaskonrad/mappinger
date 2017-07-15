export class Message {
    public static readonly MESSAGE_TYPE_NONE:number = 0;
    public static readonly MESSAGE_TYPE_FEATURE_SELECTED:number = 1;

    public messageType:number = Message.MESSAGE_TYPE_NONE;
    public payload:any;

    constructor(messageType:number, payload:any) {
        this.messageType = messageType;
        this.payload = payload;
    }
}
