export class Response<Type> {
    public success: boolean;
    public object: Type;
}

export class ErrorResponse{
    public message: string;
    public description: string;
}