const express = require('express')
const line = require('@line/bot-sdk')

const app = express()

const config = {
    channelAccessToken: 'xuy62G++oBT6T/COCb0I250rPlMbw9hNr244bbXsqTTTXTjhXum6GIo3tBbSTQmpTUXzvFufQHvts3wwf5BFUoA86cmiRlWNIDR1siOq5Z255YUNKxpt822Gtfdwp/7ciHKQhiotQibf+a+MvATw3AdB04t89/1O/w1cDnyilFU=',
    channelSecret: '7b4c5b52bd1fe76cf876ba504074e053'
}

const client = new line.messagingApi.MessagingApiClient(config)

app.post('/webhook', express.json(), async (req, res) => {

    res.sendStatus(200)

    const events = req.body.events

    for (const event of events) {

        if (event.type === 'message' && event.message.type === 'text') {

            const text = event.message.text

            console.log(text)

            await client.replyMessage({
                replyToken: event.replyToken,
                messages: [
                    {
                        type: 'text',
                        text: `รับแล้ว: ${text}`
                    }
                ]
            })
        }
    }
})

app.get('/', (req, res) => {
    res.send('Bot is working')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})