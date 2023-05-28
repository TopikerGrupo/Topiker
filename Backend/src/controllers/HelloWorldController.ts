import {Request, Response} from "express"
export class HelloWorldController {
    public async show(_request: Request, response: Response){
        response = response.status(200).json({
            message: 'Hello World',
        })
    }
}