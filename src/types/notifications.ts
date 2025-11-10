export interface INotification {
    readonly id: number;
    message: string;
    sender: number;
    receiver: number;
    link: string;
    mark_as_read: number;
    created_at: number;
}