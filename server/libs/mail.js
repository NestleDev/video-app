const nodemailer = require('nodemailer');
const render = require('../libs/render');

module.exports = (config, data, cb) => {
    const transporter = nodemailer.createTransport(config.smtp);
    const mailOptions = {
        from: `"MRBURGER 👻" <${config.smtp.auth.user}>`, // sender address
        to: 'nestledev@loftschool.com', // list of receivers
        subject: config.subject, // Subject line
        html: `<div style="padding: 20px; background-image: url('http://www.picshare.ru/uploads/190124/2rtOTuW2ZX.jpg'); width: 400px; margin: 0 auto; border-radius: 20px; text-align: center;">
                    <img src="http://www.picshare.ru/uploads/190124/p1A5J915s3.png" style="margin-bottom: 20px";>
                    <div style="font-size: 24px; color: #e45028; margin-bottom: 20px;">${config.subject}</div>
                    <ul style="list-style: none; margin: 0; padding: 0; color: #fff;">
                       ${render(data)}
                    </ul>
                <div>` // html body
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return cb(new Error('Cообщение не отправлено :('), null);
        }

        cb(null, "Cообщение успешно отправлено :)");
    })
}