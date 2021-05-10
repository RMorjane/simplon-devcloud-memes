import express from 'express'
import fileUpload from 'express-fileupload'
import multer from 'multer'
import fs from 'fs'

const app = express()
app.use(fileUpload())

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const port = 4000

app.get('/',(req,res) => {
    res.send('welcome to the home page')
})

app.post('/upload',upload.single('image'),(req,res,next) => {
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
                    console.log(`file ${filename} uploaded successfully !!!`)
                }
            })            
        }
        res.send(`images received successfully !!!`)       
    }
})

app.listen(port)