export class HttpException extends Error{
    constructor(public message:string , public statuscode:number , public error?: unknown){
        super()
    }
}