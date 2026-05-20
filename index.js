const express = require('express')
const line = require('@line/bot-sdk')
const ExcelJS = require('exceljs')
const fs = require('fs')

const app = express()

const config = {
    channelAccessToken: 'xuy62G++oBT6T/COCb0I250rPlMbw9hNr244bbXsqTTTXTjhXum6GIo3tBbSTQmpTUXzvFufQHvts3wwf5BFUoA86cmiRlWNIDR1siOq5Z255YUNKxpt822Gtfdwp/7ciHKQhiotQibf+a+MvATw3AdB04t89/1O/w1cDnyilFU=',
    channelSecret: '7b4c5b52bd1fe76cf876ba504074e053'
}

const client = new line.messagingApi.MessagingApiClient(config)

const fileName = 'money.xlsx'

// 👉 Excel function
async function saveToExcel(type, text, amount) {
    const workbook = new ExcelJS.Workbook()
    console.log('Excel saved:', fileName)
    console.log("VERSION 2 LOADED")

    let sheet

    if (fs.existsSync(fileName)) {
        await workbook.xlsx.readFile(fileName)
        sheet = workbook.getWorksheet('data')

        if (!sheet) {
            sheet = workbook.addWorksheet('data')
            sheet.addRow(['วันที่', 'ประเภท', 'รายการ', 'จำนวน'])
        }

    } else {
        sheet = workbook.addWorksheet('data')
        sheet.addRow(['วันที่', 'ประเภท', 'รายการ', 'จำนวน'])
    }

    sheet.addRow([
        new Date().toLocaleString(),
        type,
        text,
        amount
    ])

    await workbook.xlsx.writeFile(fileName)
}

// 👉 webhook
app.post('/webhook', express.json(), async (req, res) => {

    res.sendStatus(200)

    const events = req.body.events

    for (const event of events) {

        if (event.type === 'message' && event.message.type === 'text') {

            const msg = event.message.text

            console.log('user:', msg)

            const parts = msg.split(' ')
            const amount = parseInt(parts[parts.length - 1])
            const text = parts.slice(0, -1).join(' ')
            const type = 'expense'

            await saveToExcel(type, text, amount)

            await client.replyMessage({
                replyToken: event.replyToken,
                messages: [
                    {
                        type: 'text',
                        text: `บันทึกแล้ว: ${text} ${amount} บาท`
                    }
                ]
            })
        }
    }
})

// 👉 home
app.get('/', (req, res) => {
    res.send('Bot is working')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})