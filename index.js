const express = require('express')
const line = require('@line/bot-sdk')

const app = express()

const config = {
    channelAccessToken: 'AUr+0gg7WV5q+qWrwqqj1yxe2QCnEnSEIMs2x9r9jUGKmf+mAae85H+pLsDDAJ4ZTUXzvFufQHvts3wwf5BFUoA86cmiRlWNIDR1siOq5Z0KHDFEEemzUNL5M5KvOffrGRFnb2Yfiat83bVU84H/DQdB04t89/1O/w1cDnyilFU='
}

const client = new line.Client(config)

app.post('/webhook', line.middleware(config), async (req, res) => {

    const events = req.body.events

    // ตอบทันที กัน timeout
    res.sendStatus(200)

    for (const event of events) {

        if (event.type === 'message' && event.message.type === 'text') {

            const userMessage = event.message.text

            console.log(userMessage)

            await client.replyMessage(event.replyToken, {
                type: 'text',
                text: `ได้รับข้อความ: ${userMessage}`
            })
        }
    }
})

app.get('/', (req, res) => {
    res.send('Money Bot Working!')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})