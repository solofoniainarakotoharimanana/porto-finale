import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const sendEmail = (emailFrom, emailTo) => {

    // SENDING EMAIL TEST
    // let testAccount = await nodemailer.createTestAccount();
    //Create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false,//true for 465 , false for other port
    //     auth: {
    //         user: testAccount.user,
    //         pass: testAccount.pass
    //     }
    // })

    // let message = {
    //     from: '"<solofoniainarakotoharimanana@gmail.com>"',
    //     to: "solofoniainarakotoharimanana@gmail.com",
    //     subject: "Hello boy",
    //     text: "Hello world",
    //     html: "<b>Hello world</b>"
    // };

    // transporter.sendMail(message).then((info) => {
    //     return res.status(201).json({
    //         msg: "You should receive an email",
    //         info: info.messageId,
    //         preview: nodemailer.getTestMessageUrl(info)
    //     })
    // }).catch(error => {
    //     return res.status(500).json({error})
    // });

    // FOR REAL GMAIL
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);
    const MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Business.com",
            link: "https://mailgen.js"
        }
    })

    let response = {
        body: {
            name: "Request send",
            intro: "You have a new request",
            // table: {
            //     data: [
            //         {
            //             item: "Nodemailer Stack Book",
            //             description: "A Backend application",
            //             price: "$10.99"
            //         },
            //     ],
            //     outro: "Looking forward to do more business"
            // },
        }
    }
    let mail = MailGenerator.generate(response);
    let message = {
        from: emailFrom,
        // from: owner.email,
        to: emailTo,
        // to: process.env.EMAIL,
        subject: "Request for project implementation",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return function (req, res) {
            res.status(201).json({
                messageEmail: "You should receive an email",
            })
        }
            
    }).catch(error => {
        return function (req, res) {
            res.status(500).json({
                error
            })
        }
        
    })

} 