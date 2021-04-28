import { Injectable } from "@nestjs/common";
import * as aws from 'aws-sdk'


@Injectable()
export class S3{
    constructor(){
        //crendentials
        aws.config.update({
            region: 'us-east-1',
            
        })     
    }
    async upload(stream: NodeJS.ReadStream, mimetype: string, bucket: string, destinationFilename:string): Promise<string>{
        
        const s3 = new aws.S3()
        const s3Params = {
            Bucket: bucket,
            Key: destinationFilename,
            ACL: 'public-read',
            ContentType: mimetype,
            Body: stream
        }
        const {Location} = await s3.upload(s3Params).promise()
        return Location

    }
    async deleteObject(bucket: string, destinationFilename: string): Promise<boolean>{
        const s3 = new aws.S3()
        const s3Params = {
            Bucket: bucket,
            Key: destinationFilename            
        }
        try{
            await s3.deleteObject(s3Params).promise()
            return true
        }catch(err){
            return false
        }
    }
}



















/*
@Injectable()
export class S3{
    constructor(){
        //crendentials, 
        aws.config.update({
            region: 'us-east-2',
            accessKeyId: '',
            secretAccessKey: ''
        })       
    }
    async upload(filename: string, stream: NodeJS.ReadStream, minetype: string, bucket: string, destinationFilename: string): Promise<string>{       
        const s3 = new aws.S3()
        const s3Params = {
            Bucket: bucket,
            Key: destinationFilename,
            ACL: 'public-read',
            ContentType: minetype,
            Body: stream
        }
        const {Location} = await s3.upload(s3Params).promise()
        console.log('Location:',Location)
        return Location
    }
}
*/