import { NextFunction, Request, Response } from "express";
import { BadRequestException } from "../Error/exceptions.utils";
import { S3ClientService } from "./s3-client.utis";

export class ProfileServices {
    private s3Client = new S3ClientService();

        uploadProfile = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        const { user } = req.loggedUser!;

        if (!file) {
            throw new BadRequestException("Please Upload File");
        }

        const {key,url} = await this.s3Client.uploadFileOnS3(file, `${user._id}/profile`);
        user.profilePicture=key 
        await user.save()
        return res.status(200).json({
            message: "profile picture updated successfully",
            data: {key,url}
        });
    } catch (error: any) {
        console.error("Upload error:", error);
        return res.status(500).json({ message: error.message || "something went wrong" });
    }
};

}

export default new ProfileServices();
