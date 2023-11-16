const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 5000;
//ModdleWare
app.use(express.static('public'));
app.use(express.json())



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/queroajudar.html')
})

app.post('/', (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
       host:'smtp.gmail.com',
      port:465,
      secure: true,
      auth:{
      user: 'pedro.klaus@projetovidaealegria.com.br',
      pass: 'lwae kcrl lanz jpjz'
        } 
   })
    
   const mailOptions = {
    from: req.body.email,
    to: 'pedro.klaus@projetovidaealegria.com.br',
    subject: `Message from: ${req.body.email} || ${req.body.subject}`,
    text: req.body.message
}

transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
        console.log(error);
        res.send('error');
    }else {
        console.log('Email sent:' + info.response);
        res.send('success')
    }
})
})

app.listen(PORT, () => {
    console.log(`Server running ${PORT}`)
})