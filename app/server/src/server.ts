import fs from 'fs'
import multer from 'multer'
import express from 'express'
import pkgcloud from 'pkgcloud'
import fileUpload from 'express-fileupload'
import endpoint from './endpoints.config'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload())

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const port = 4000

app.route('/').get( (req,res) => {
    res.send('welcome to the home page')
})

app.route('/login').post( (req,res) => {
    const {username,password} = req.body
    console.log(username)
    console.log(password)
    res.send(`${username} ${password}`)
})

app.route('/upload').post(upload.single('image'),(req,res,next: any) => {
    const files: any = req.files
    const fileList = files['image']
    console.log(fileList)
    if(fileList != undefined && fileList.length>0){
        for(var i=0;i<fileList.length;i++){
            const bufferImage = Buffer.from(fileList[i]['data'].buffer)
            const filename = fileList[i]['name']
            fs.writeFile(filename,bufferImage,'base64',function(err){
                if(err){
                    console.log(err)
                } else {
                    uploadBlobStorage(filename,new String(endpoint.containerName).toString())
                    console.log(`file ${filename} uploaded successfully !!!`)
                }
            })            
        }
        res.send(`images uploaded successfully !!!`)       
    }
})

async function uploadBlobStorage(filename: string,containerName: string){

    var client = pkgcloud.storage.createClient({
        provider: 'azure',
        storageAccount: endpoint.storageAccountName,
        storageAccessKey: endpoint.storageAccountKey
    });
      
    var readStream = fs.createReadStream(filename);
    var writeStream = client.upload({
        container: containerName,
        remote: filename
    });
      
    writeStream.on('error', function (err) {
        console.log("failed to upload file in azure storage : ",err);
    });
      
    writeStream.on('success', function (file) {
        console.log(file," uploaded successfully");
        
    });
      
    readStream.pipe(writeStream);

};

app.listen(port)